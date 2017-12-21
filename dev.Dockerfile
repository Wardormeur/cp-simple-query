FROM node:8-alpine
MAINTAINER butlerx <butlerx@notthe.cloud>
WORKDIR /usr/src/app
ENV NODE_ENV development
RUN apk add --update git python build-base postgresql-client
COPY docker-entrypoint.sh /usr/src
VOLUME /usr/src/app 
EXPOSE 10301
CMD ["/usr/src/docker-entrypoint.sh"]
