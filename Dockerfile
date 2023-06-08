FROM node:18-buster-slim

# Use /project folder as a directory where the source code is stored.
WORKDIR /project

## Install the project requirements ##
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install

# Add user that will be used in the container.
RUN useradd app

# Set this directory to be owned by the "app" user.
RUN chown app:app /project

# Copy the source code of the project into the container.
COPY --chown=app:app . .

EXPOSE 3000
CMD npm run dev
