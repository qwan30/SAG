#!/bin/sh
set -e

echo "Running migrations..."
node dist/src/db/migrate.js

echo "Starting app..."
exec node dist/src/index.js
