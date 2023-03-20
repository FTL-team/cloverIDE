#!/bin/bash
source /etc/profile
source ~/.bashrc
cd "$(dirname "$0")"
THEIA_WEBVIEW_EXTERNAL_ENDPOINT="{{hostname}}" ./node ./src-gen/backend/main.js --plugins=local-dir:plugins -h 0.0.0.0 -p 7778