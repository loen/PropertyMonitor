#!/bin/bash
# if case of Redis restart use:
# sudo redis-server
nohup node ./bin/www > /var/services/homes/paczur/docs/PropertyMonitor/logs.logs 2>&1 &