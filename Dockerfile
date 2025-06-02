FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# RUN npm run build

# image de production
# FROM node:22

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --only=production

# COPY --from=build /app/dist ./dist
# COPY ormconfig.js ./

CMD ["npm", "run", "dev"]
# CMD ["node", "dist/index.js"]
