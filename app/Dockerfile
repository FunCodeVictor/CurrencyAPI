FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/* ./
CMD ["node","index.js"]
