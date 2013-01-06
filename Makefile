PLOVR=/home/exhuma/work/__libs__/plovr/build/plovr.jar

all:
	java -jar ${PLOVR} build plovr-config.js

run:
	java -jar ${PLOVR} serve plovr-config.js

