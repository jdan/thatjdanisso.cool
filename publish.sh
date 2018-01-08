#!/bin/sh

now=`date`

npm run build
cd output
git add .
git commit -m "New build $now"
git push origin master

cd ..
