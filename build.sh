#!/bin/bash

set -e

VERSION="v0.0.0"

CWD=`pwd`

mkdir -p build
mkdir -p build/Linux64/dc-dynamic
mkdir -p build/Mac/dc-dynamic
mkdir -p build/Win64/dc-dynamic
./node_modules/.bin/quasar build
rsync -av dist/spa-mat/* build/Linux64/dc-dynamic/
rsync -av dist/spa-mat/* build/Mac/dc-dynamic/
rsync -av dist/spa-mat/* build/Win64/dc-dynamic/

echo "Building Linux64 binaries..."
GOOS=linux
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Linux64/dc-dynamic
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static tools/static.go

echo "Building Win64 binaries..."
GOOS=windows
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Win64/dc-dynamic
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static.exe tools/static.go

echo "Building Macintosh binaries..."
GOOS=darwin
GOARCH=amd64
LDFLAGS="-s -w"
OUTPUT=$CWD/build/Mac/dc-dynamic
GOOS="$GOOS" GOARCH="$GOARCH" go build -ldflags="$LDFLAGS" -o $OUTPUT/static tools/static.go

echo "ZIP Linux64"
cd $CWD/build/Linux64
zip -qr ../dc-dynamic-Linux64-$VERSION.zip *

echo "ZIP Win64"
cd $CWD/build/Win64
zip -qr ../dc-dynamic-Win64-$VERSION.zip *

echo "ZIP Mac"
cd $CWD/build/Mac
zip -qr ../dc-dynamic-Mac-$VERSION.zip *
