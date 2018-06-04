# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
#EXPOSE 8888
ADD . /home/node/app
WORKDIR /home/node/app
CMD ["node", "newbot.js"]
