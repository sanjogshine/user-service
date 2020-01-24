# Node.js, Express and MongoDB User Management Project Structure 
RESTful web APIs (for Android, IOS, or JavaScript framworks) using Express framework and MongoDB with a good structure practices based on clean MVC Architecture.

# Features
- Fundamental of Express: routing, middleware, sending response and more
- Fundamental of Mongoose: Data models and middleware
- RESTful API including pagination and sorting
- Create, login and session verification operations with MongoDB
- Security: encyption, sanitization and more
- Authentication with JWT : login
- Error handling
- Enviroment Varaibles
- Catching Uncaught Exception

# Project Structure
- server.js : Responsible for connecting the MongoDB and starting the server.
- app.js : Configure everything that has to do with Express application. 
- config.env: for Enviroment Varaiables
- routes -> userRoutes.js: The goal of the route is to guide the request to the correct handler function which will be in one of the controllers
- controllers -> userController.js, sessionController.js, authenticationController.js: Handle the application request, interact with models and send back the response to the client 
- models -> userModel.js: (Business logic) related to business rules, how the business works and business needs ( Creating new user in the database, checking if the user password is correct). userSessionModel.js : Handles all user sessions upsert.


# Create Docker Image Structure
- cd PROJECT_PATH(path location where docker file is present)
- Execute command : docker build -t user-service . -f Dockerfile
- Execute command : docker run --net=host -p 3000:9001 -d user-service
- User Service will be listening on 3000 port. 