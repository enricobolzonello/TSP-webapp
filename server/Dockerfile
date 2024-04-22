FROM --platform=linux/amd64 ubuntu:latest

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y build-essential

# Install CPLEX 
COPY /cplex/cplex_studio2211.linux_x86_64.bin /cplex/cplex_studio2211.linux_x86_64.bin
COPY /cplex/response.properties /cplex/response.properties

RUN chmod u+x /cplex/cplex_studio2211.linux_x86_64.bin
RUN /cplex/cplex_studio2211.linux_x86_64.bin -f /cplex/response.properties
RUN rm -rf /cplex

ENV NODE_VERSION 20.12.2

# Install Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
SHELL ["/bin/bash", "-c"]
RUN source ~/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION

# nvm and node environment variables
ENV NVM_DIR /root/.nvm
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# install python 
RUN apt-get install -y python3

# Install nodemon globally
RUN npm install -g nodemon

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application files
COPY . .

CMD ["node-gyp", "configure", "build"]
RUN npm install

# Expose port
EXPOSE 8080

# Run the application
CMD ["npm", "run", "start"]
