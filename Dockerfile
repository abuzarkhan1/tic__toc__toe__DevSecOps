FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 
EXPOSE 3000
CMD ["npm", "run", "dev"]
