#!/usr/bin/env bash
# Slaat de TeamNL-portretten lokaal op in public/img/skaters/ en zet de app om naar lokale paden.
# Gebruik: bash scripts/download-photos.sh   (vereist curl + netwerktoegang tot teamnl.org)
set -e
cd "$(dirname "$0")/.."
mkdir -p public/img/skaters
grep -o "photo: 'https://www.teamnl.org[^']*'" src/data/skaters.ts | sed "s/photo: '//;s/'$//" | while read -r url; do
  slug=$(grep -B20 "photo: '$url'" src/data/skaters.ts | grep -o "id: '[^']*'" | tail -1 | sed "s/id: '//;s/'//")
  [ -z "$slug" ] && continue
  curl -sL "$url" -o "public/img/skaters/$slug.jpg" && echo "ok $slug"
done
echo "Vervang daarna in src/data/skaters.ts: photo: 'https://www.teamnl.org/...' → photo: asset('img/skaters/<slug>.jpg')"
