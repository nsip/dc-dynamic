#!/bin/bash

set -e
go get gopkg.in/cheggaaa/pb.v1
cd tools; go build release.go; cd ..

VERSION="$(./tools/release dc-dynamic version)"

echo "BUILDING for $VERSION"

CWD=`pwd`
npm install
./node_modules/.bin/quasar build

cd dist/spa-mat/
zip -qr ../../dc-dynamic-$VERSION.zip *

echo "If happy with zip, run the following release command"
echo " ./tools/release dc-dynamic dc-dynamic.zip dc-dynamic-$VERSION.zip"
