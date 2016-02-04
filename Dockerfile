FROM mhart/alpine-node:4

# Native tools for node-gyp
RUN apk add --update make gcc g++ python
RUN apk --update add python

# Expose port
EXPOSE 8011

# Run app artifact
COPY build /app
COPY package.json /app/package.json

# Add entrypoint.sh to Docker
ADD entrypoint.sh /app/entrypoint.sh
WORKDIR /app
RUN chmod +x ./entrypoint.sh

# Entry point
ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
