FROM node:8.15.1-alpine

# Add user to docker container
RUN addgroup -S sanjog && adduser -S -g sanjog sanjog

# Setting the work directory
WORKDIR $HOME/user-management

# Copy source code from current to home directory
COPY . .

# Use newly created user
USER sanjog

#Expose webservice port
EXPOSE 9001

CMD ["node", "server.js", "&"]