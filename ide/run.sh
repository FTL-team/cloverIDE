#!/bin/bash

./ideHttpsProxy & 
THEIA_WEBVIEW_EXTERNAL_ENDPOINT="{{hostname}}" ./main --plugins=local-dir:plugins