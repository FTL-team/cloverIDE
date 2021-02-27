#!/usr/bin/env python3

# script for downloading plugins for advancedClover IDE
# Version: 1.0.0

import json
import os
from os import path
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
from urllib.request import urlopen
# or: requests.get(url).content


PLUGINS_DIR="plugins"

# Create plugins dir
try:
  os.mkdir(PLUGINS_DIR)
  print("Created plugins directory")
except FileExistsError:
  print("Plugins directory already exists")

# Download and unpack external plugins
plugins = json.load(open("externalPlugins.json"))

for pluginName in plugins:
  if path.isdir(path.join(PLUGINS_DIR, pluginName)):
    print(pluginName, "already downloaded")
  else:
    print(pluginName, "downloading")
    resp = urlopen(plugins[pluginName])
    zipfile = ZipFile(BytesIO(resp.read()))
    zipfile.extractall(path.join(PLUGINS_DIR, pluginName))

# Add cloverExtension

if path.isdir(path.join(PLUGINS_DIR, "cloverExtension")):
  print("cloverExtension already unpacked")
else:
  print("cloverExtension unpacking")
  zipfile = ZipFile(open("../cloverExtension.vsix", "rb"))
  zipfile.extractall(path.join(PLUGINS_DIR, "cloverExtension"))


# Pack it into zip
zip = ZipFile('../idePlugins.zip', 'w', ZIP_DEFLATED)

for root, dirs, files in os.walk(PLUGINS_DIR):
  for file in files:
    zip.write(os.path.join(root, file))

zip.close()