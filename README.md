# Chatbot Application

This project is a chatbot application built using a frontend and backend service, utilizing Docker for containerization and MongoDB for data storage.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)

## Technologies Used

- **Frontend**: Vite, React
- **Backend**: NestJS
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Setup

To set up the project, make sure you have Docker and Docker Compose installed on your machine. Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

## Running the Application

To run the application, execute the following command in the root directory of the project:

```bash
docker-compose up --build
```

This command will build the services defined in the docker-compose.yml file and start them.

The app will be running on http://localhost:5173
