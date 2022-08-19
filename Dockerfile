FROM node

#Create a directory to mount the volume
WORKDIR /app

#Copy the app to the container
COPY package*.json ./

#Install Libraries
RUN npm install

#Copy the ehole app to the container
COPY . .

# Run the app on port 8080
EXPOSE 8080

# Start the app
CMD ["npm","start"]

