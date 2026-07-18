FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# Use npm install to generate node_modules inside container
RUN npm install

# We mount volume for dev but good to copy for baseline
COPY . .

CMD ["npm", "run", "dev"]
