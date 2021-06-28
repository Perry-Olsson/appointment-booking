#!/bin/bash

echo "Pushing changes to production!!"

docker-compose build

docker-compose push

ssh -i ~/.ssh/perry-ubuntu-desktop.pem ubuntu@ec2-3-21-57-64.us-east-2.compute.amazonaws.com \
"sudo docker stack deploy -c ./appointment-booking/docker-compose.yml --prune app \
&& ./appointment-booking/prune.sh"

exit;
