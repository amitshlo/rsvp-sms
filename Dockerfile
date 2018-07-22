FROM node:alpine
COPY . /root
WORKDIR /root
CMD node build/index
