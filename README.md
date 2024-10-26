# Project Name: IdeaNest Task App

## Description

IdeaNest Task App is a Dockerized Node.js application designed to help users manage tasks efficiently. It leverages MongoDB for data storage, ensuring a scalable and robust solution. App uses JWT tokens for authentication and has functionalities like: Creating user, creating organization, inviting users to organization, updating organization info, etc.

## Features

- User authentication and authorization
- Create, read, update, and delete tasks
- Responsive design for optimal user experience
- Dockerized for easy deployment

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Install [Docker](https://www.docker.com/get-started)

## MVC Architecture

The IdeaNest Task App follows the Model-View-Controller (MVC) architectural pattern, which helps to organize the codebase into three interconnected components:

- **Model**: Represents the data and business logic of the application. In this project, models define the structure of users and organizations and handle database interactions through MongoDB.

- **View**: In a backend application, the view can be considered the API responses that are sent to clients (e.g., JSON data). The API endpoints return data to clients that may be consumed by frontend applications or other services.

- **Controller**: Acts as an intermediary between the model and the view. Controllers handle incoming requests, manipulate data through the models, and return the appropriate responses. Each controller manages specific routes for task operations (e.g., creating, reading, updating, and deleting).

This separation of concerns promotes modularity and maintainability, making it easier to manage and scale the application.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/idea-nest-task-app.git
   cd idea-nest-task-app
2. Run the command: docker-compose up --build (This is the only command needed to boot the app)

