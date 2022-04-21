#!/usr/bin/sh
cd;
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
pm2 startOrRestart server/pm2.js;
if [ $? = 0]; then
    echo server restart succeed at `date` >> .server_restart_log;
    exit 0;
else
    echo server restart failed at `date` >> .server_restart_log;
    exit 1;
fi;
