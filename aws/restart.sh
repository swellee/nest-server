#!/usr/bin/sh
cd;
echo `ll` > /home/ubuntu/ddd;
echo `who` >> /home/ubuntu/ddd;
echo `which bash` >> /home/ubuntu/ddd;
echo `which sh` >> /home/ubuntu/ddd;
export PATH=/opt/nodejs/bin:$PATH;
echo `which pm2` >> /home/ubuntu/ddd;

# pm2 startOrRestart server/pm2.js
