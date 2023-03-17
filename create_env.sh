#!/bin/bash

while read line
do
  KEY=$(echo $line | cut -d '=' -f 1)
  VALUE=$(echo "${!KEY}")
  echo "$KEY=$VALUE" >> .env
done < .env.example