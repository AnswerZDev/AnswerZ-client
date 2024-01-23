#!/bin/bash

cd ~/frontend/AnswerZ-client
git pull origin main
npm install
ng build
cp -r dist/* ~/prod

cp .github/workflows/scripts/Dockerfile ~/prod
cp .github/workflows/scripts/default.conf ~/prod

cd ~/prod


container_name="answerz-front"

if docker ps -q --filter "name=${container_name}" 2>/dev/null; then
    docker stop ${container_name}
    docker rm ${container_name}
fi

docker build --tag angular-app .
docker run --name $container_name -p 80:80 -d angular-app
