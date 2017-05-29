#!/bin/bash

# foreverのプロセス起動する
count=`ps aux | grep node | grep -v grep | wc -l`

if [ $count = 0 ]; then
    npm run start-prod
else
    npm run restart-prod
fi
