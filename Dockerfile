# Pull from a base image
FROM node:14-alpine

# Decreased verbosity of logs during docker build
ENV NPM_CONFIG_LOGLEVEL warn

# Create and use /app as the working directory
RUN mkdir -p /app/node_modules
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Install dependencies (npm ci is similar to npm i, but for automated builds, the yarn version of it is being used here)
# https://stackoverflow.com/questions/58482655/what-is-the-closest-to-npm-ci-in-yarn
# RUN npm ci --only-production
RUN yarn install --frozen-lockfile

COPY . .

# Build a prod bundle and serve it using aa server when NODE_ENV is set to production
CMD if [ ${NODE_ENV} = production ]; \
	then \
	yarn global add http-server && \
	yarn build && \
	cd build && \
	hs -p 3000; \
	else \
	yarn docker:start; \
	fi

# Listen on the specified port
EXPOSE 3000
