#!/bin/bash

echo "Pushing changes to production!!"

docker-compose build

docker-compose push