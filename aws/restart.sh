#!/usr/bin/sh
cd;
sh .bashrc;
pm2 startOrRestart server/pm2.js
echo server restarted at `date` >> .server_restart_log
