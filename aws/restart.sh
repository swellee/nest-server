#!/usr/bin/sh
cd;
sh .bashrc; #load node/pm2 to path
sh .profile;
echo `which pm2` > ddd;
pm2 startOrRestart server/pm2.js;
if [ $? = 0]; then
    echo server restarted at `date` >> .server_restart_log;
    exit 0;
else
    echo server restart fail >> .server_restart_log;
    exit 1;
fi;
