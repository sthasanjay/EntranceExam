FROM node:latest
LABEL Name=EntranceExamAPI  Version=0.0.1
EXPOSE 3000
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app/
