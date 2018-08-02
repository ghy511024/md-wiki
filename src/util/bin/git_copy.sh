#!/bin/sh

sourcePath=$1
targetPath=$2

if [ ! -d "$targetPath" ]; then
  mkdir $targetPath
  echo notexit $targetPath
fi

cp -r $sourcePath/* $targetPath