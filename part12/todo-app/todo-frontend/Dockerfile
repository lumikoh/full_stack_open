FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

ENV CI=true
RUN npm ci
RUN npm run test

FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY --from=test-stage /usr/src/app/ /usr/src/app/

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

CMD ["npm", "start"]