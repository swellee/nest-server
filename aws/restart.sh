#!/usr/bin/sh
cd;
echo `ls -l server` > /home/ubuntu/ddd;
echo `who` >> /home/ubuntu/ddd;
echo `which pm2` >> /home/ubuntu/ddd;
# pm2 startOrRestart server/pm2.js
