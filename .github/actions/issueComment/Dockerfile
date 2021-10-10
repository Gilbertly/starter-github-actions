FROM mhart/alpine-node:14

ADD package.json package-lock.json /
RUN npm install --frozen-lockfile
COPY src /src/
ENTRYPOINT ["node", "/src/index.js"]
