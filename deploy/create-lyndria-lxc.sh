#!/usr/bin/env bash
# =============================================================================
#  create-lyndria-lxc.sh
#  Creates a Debian LXC on Proxmox VE, builds the Lyndria app (Vite/React) and
#  serves it with nginx on port 80 - ready for the reverse proxy on
#  192.168.178.57.
#
#  Run on the PROXMOX HOST as root:
#     bash create-lyndria-lxc.sh
#  Override any variable, e.g.:
#     CTID=150 IP=192.168.178.60/24 GATEWAY=192.168.178.1 bash create-lyndria-lxc.sh
# =============================================================================
set -euo pipefail

# ------------------------------- Configuration -------------------------------
CTID="${CTID:-$(pvesh get /cluster/nextid)}"
CT_HOSTNAME="${CT_HOSTNAME:-lyndria}"
CORES="${CORES:-2}"
MEMORY="${MEMORY:-2048}"          # MB - the Vite build needs approx. 1-1.5 GB
SWAP="${SWAP:-512}"
DISK_GB="${DISK_GB:-8}"
STORAGE="${STORAGE:-local-lvm}"       # rootfs storage
TEMPLATE_STORAGE="${TEMPLATE_STORAGE:-local}"
BRIDGE="${BRIDGE:-vmbr0}"
IP="${IP:-dhcp}"                  # "dhcp" or e.g. "192.168.178.60/24"
GATEWAY="${GATEWAY:-192.168.178.1}"   # only used with a static IP
DNS="${DNS:-192.168.178.1}"
VLAN="${VLAN:-}"                  # optional VLAN tag
ROOT_PASSWORD="${ROOT_PASSWORD:-}"    # empty = random password (printed at the end)
SSH_PUBKEY_FILE="${SSH_PUBKEY_FILE:-}" # optional, e.g. /root/.ssh/id_ed25519.pub

GIT_REPO="${GIT_REPO:-https://github.com/paulbuchwald/lyndria-s-morning-glow.git}"
GIT_BRANCH="${GIT_BRANCH:-main}"
GIT_TOKEN="${GIT_TOKEN:-}"        # only for a private repo (GitHub PAT, read-only)
NODE_MAJOR="${NODE_MAJOR:-22}"

PROXY_IP="${PROXY_IP:-192.168.178.57}"
ONLY_ALLOW_PROXY="${ONLY_ALLOW_PROXY:-no}"  # "yes" = nginx only answers the proxy
# -----------------------------------------------------------------------------

msg()  { echo -e "\e[1;36m[+]\e[0m $*"; }
warn() { echo -e "\e[1;33m[!]\e[0m $*"; }
die()  { echo -e "\e[1;31m[x]\e[0m $*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || die "Please run as root on the Proxmox host."
command -v pct >/dev/null || die "pct not found - is this a Proxmox VE host?"
pct status "$CTID" &>/dev/null && die "CTID $CTID already exists."

# ------------------------------ Template -------------------------------------
msg "Updating template list ..."
pveam update >/dev/null
TEMPLATE="$(pveam available --section system | awk '{print $2}' | grep -E '^debian-13-standard' | sort -V | tail -1 || true)"
[[ -n "$TEMPLATE" ]] || TEMPLATE="$(pveam available --section system | awk '{print $2}' | grep -E "^debian-12-standard" | sort -V | tail -1 || true)"
[[ -n "$TEMPLATE" ]] || die "No Debian template found."

if ! pveam list "$TEMPLATE_STORAGE" | grep -q "$TEMPLATE"; then
  msg "Downloading template $TEMPLATE ..."
  pveam download "$TEMPLATE_STORAGE" "$TEMPLATE"
fi

# ------------------------------ Network --------------------------------------
NET0="name=eth0,bridge=${BRIDGE},firewall=1"
[[ -n "$VLAN" ]] && NET0+=",tag=${VLAN}"
if [[ "$IP" == "dhcp" ]]; then
  NET0+=",ip=dhcp"
else
  NET0+=",ip=${IP},gw=${GATEWAY}"
fi

[[ -n "$ROOT_PASSWORD" ]] || ROOT_PASSWORD="$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 20)"

# ------------------------------ Create CT ------------------------------------
msg "Creating LXC $CTID ($CT_HOSTNAME) ..."
CREATE_ARGS=(
  "$CTID" "${TEMPLATE_STORAGE}:vztmpl/${TEMPLATE}"
  --hostname "$CT_HOSTNAME"
  --cores "$CORES" --memory "$MEMORY" --swap "$SWAP"
  --rootfs "${STORAGE}:${DISK_GB}"
  --net0 "$NET0"
  --nameserver "$DNS"
  --unprivileged 1
  --features nesting=1
  --onboot 1
  --ostype debian
  --tags "web;lyndria"
  --description "Lyndria - Die Chronik des Ersten Morgens (nginx :80, proxied via ${PROXY_IP})"
  --password "$ROOT_PASSWORD"
)
[[ -n "$SSH_PUBKEY_FILE" ]] && CREATE_ARGS+=(--ssh-public-keys "$SSH_PUBKEY_FILE")
pct create "${CREATE_ARGS[@]}"

msg "Starting container ..."
pct start "$CTID"

msg "Waiting for network ..."
for _ in $(seq 1 30); do
  pct exec "$CTID" -- bash -c "getent hosts deb.debian.org >/dev/null 2>&1" && break
  sleep 2
done
pct exec "$CTID" -- bash -c "getent hosts deb.debian.org >/dev/null" || die "Container has no network/DNS."

# ------------------------------ Provisioning ---------------------------------
REPO_URL="$GIT_REPO"
if [[ -n "$GIT_TOKEN" ]]; then
  REPO_URL="${GIT_REPO/https:\/\//https://x-access-token:${GIT_TOKEN}@}"
fi

ALLOW_BLOCK=""
if [[ "$ONLY_ALLOW_PROXY" == "yes" ]]; then
  ALLOW_BLOCK="    allow ${PROXY_IP};
    allow 127.0.0.1;
    deny all;"
fi

msg "Installing packages, Node.js ${NODE_MAJOR}, nginx ..."
pct exec "$CTID" -- env DEBIAN_FRONTEND=noninteractive NODE_MAJOR="$NODE_MAJOR" bash -euo pipefail -c '
  apt-get update -qq
  apt-get -y -qq dist-upgrade
  apt-get install -y -qq curl ca-certificates gnupg git nginx rsync locales
  sed -i "s/^# *de_DE.UTF-8/de_DE.UTF-8/" /etc/locale.gen && locale-gen >/dev/null
  timedatectl set-timezone Europe/Berlin 2>/dev/null || ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime

  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list
  apt-get update -qq
  apt-get install -y -qq nodejs
  echo "node $(node -v) / npm $(npm -v)"
'

msg "Writing deploy script /usr/local/bin/lyndria-deploy ..."
pct exec "$CTID" -- bash -c "cat > /usr/local/bin/lyndria-deploy" <<EOF
#!/usr/bin/env bash
# Pulls the latest version from Git, builds it and publishes it atomically.
set -euo pipefail
APP_DIR=/opt/lyndria
WEB_ROOT=/var/www/lyndria
REPO_URL="${REPO_URL}"
BRANCH="${GIT_BRANCH}"

if [[ ! -d "\$APP_DIR/.git" ]]; then
  git clone --branch "\$BRANCH" --depth 1 "\$REPO_URL" "\$APP_DIR"
else
  git -C "\$APP_DIR" fetch --depth 1 origin "\$BRANCH"
  git -C "\$APP_DIR" reset --hard "origin/\$BRANCH"
fi

cd "\$APP_DIR"
rm -f bun.lockb
npm ci --no-audit --no-fund
npm run build

mkdir -p "\$WEB_ROOT"
rsync -a --delete dist/ "\$WEB_ROOT/"
chown -R www-data:www-data "\$WEB_ROOT"
echo "Deployed \$(git rev-parse --short HEAD) at \$(date '+%F %T')"
EOF
pct exec "$CTID" -- chmod 700 /usr/local/bin/lyndria-deploy

msg "Configuring nginx ..."
pct exec "$CTID" -- bash -c "cat > /etc/nginx/sites-available/lyndria" <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/lyndria;
    index index.html;

${ALLOW_BLOCK}
    # Real client IP from the reverse proxy
    set_real_ip_from ${PROXY_IP};
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;

    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    # Hashed build assets - cache long
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    # Never cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    # SPA fallback for React Router
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
pct exec "$CTID" -- bash -euo pipefail -c '
  rm -f /etc/nginx/sites-enabled/default
  ln -sf /etc/nginx/sites-available/lyndria /etc/nginx/sites-enabled/lyndria
  nginx -t
  systemctl enable --now nginx >/dev/null
'

msg "Cloning and building the app (takes 1-3 min) ..."
pct exec "$CTID" -- /usr/local/bin/lyndria-deploy
pct exec "$CTID" -- systemctl reload nginx

# ------------------------------ Summary --------------------------------------
CT_IP="$(pct exec "$CTID" -- hostname -I | awk '{print $1}')"
HTTP_CODE="$(pct exec "$CTID" -- curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1/)"

cat <<EOF

=====================================================================
  Lyndria LXC ready
---------------------------------------------------------------------
  CTID           : ${CTID}
  Hostname       : ${CT_HOSTNAME}
  IP             : ${CT_IP}
  root password  : ${ROOT_PASSWORD}
  Local test     : HTTP ${HTTP_CODE}  ->  http://${CT_IP}/

  Reverse proxy on ${PROXY_IP}:
    Scheme       : http
    Forward host : ${CT_IP}
    Forward port : 80

  Update the app later:
    pct exec ${CTID} -- lyndria-deploy
=====================================================================
EOF
[[ "$IP" == "dhcp" ]] && warn "DHCP is in use - set a DHCP reservation for ${CT_IP} in your router, otherwise the proxy target can change." || true
