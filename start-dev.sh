#!/usr/bin/env bash
set -e
cd /root/my-profile
exec npm run dev -- --host 0.0.0.0 --port 5173
