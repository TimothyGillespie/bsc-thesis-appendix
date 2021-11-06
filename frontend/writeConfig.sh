#!/bin/bash

# This file was initially supposed to be an entry point for the docker container,
# however, it did not work out. Therefore, it is not in use but still preserved.
API_URL=$1
IMPRINT_TEXT=$2
IMPRINT_LINK=$3

{
  echo "{"
  echo "  apiUrl: \"$API_URL\""
  echo "  imprintLink: \"$IMPRINT_LINK\""
  echo "  imprintText: \"$IMPRINT_TEXT\""
  echo "}"
} > /usr/share/nginx/html/assets/config.json
