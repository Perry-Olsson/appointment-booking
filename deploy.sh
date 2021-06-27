#!/bin/bash

echo "Pushing changes to production!!"

docker-compose build

docker-compose push

~/.ssh/deploy-appointment-booking.sh
