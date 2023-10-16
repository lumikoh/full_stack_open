FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true
RUN npm run test

FROM node:16

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app /usr/src/app

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000
RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]