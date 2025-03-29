FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 
EXPOSE 5173
CMD ["npm", "run", "dev"]
