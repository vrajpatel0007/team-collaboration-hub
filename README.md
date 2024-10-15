# Team Collaboration Hub - Backend

## Overview

The **Team Collaboration Hub** is a backend system designed to facilitate user collaboration on tasks with role-based access control and real-time chat functionality. This system is built using **Node.js**, **Express.js**, and **MongoDB**, featuring user authentication, task management, and chat rooms for project discussions.

## Features

- **JWT Authentication**: Secure user login and registration.
- **Role-Based Access Control**: Admin and User roles with distinct permissions.
- **Task Management**: Create, update, delete, and filter tasks based on criteria like status and due dates.
- **Real-time Chat**: Integrated Socket.IO-based chat rooms for project-specific communication.
- **Security**: Implemented security best practices using `helmet` and `cors`.
- **API Documentation**: Documented using Postman.

## Requirements

- **Node.js** (v14+)
- **MongoDB** (v4+)
- **Express.js** (v4+)
- **Socket.IO** (v4+)
- **Postman** (for testing and documentation)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vrajpatel0007/team-collaboration-hub.git
    cd team-collaboration-hub
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication & User Management

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and get a JWT token
- **PATCH** `/api/auth/assign-role` - Assign a role to a user (Admin only)

### Task Management

- **POST** `/api/tasks` - Create a new task (Admin)
- **GET** `/api/tasks` - Get a list of tasks (Admin & User)
  - Query parameters: `status`, `dueDate`, `priority`
- **PATCH** `/api/tasks/:id` - Update a task (Admin)
- **DELETE** `/api/tasks/:id` - Delete a task (Admin)

### Real-time Chat

- **Socket.IO** connection: Connect to project-specific chat rooms using `Socket.IO`
  - **Events**:
    - `joinRoom`: Join a specific chat room
    - `sendMessage`: Send a message to the room
    - `receiveMessage`: Receive a new message from the room

## Database Models

### User

```js
{
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }
}
```

### Task

```js
{
  title: String,
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dueDate: Date,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

### Chat Message

```js
{
  content: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: String,
  timestamp: { type: Date, default: Date.now }
}
```

## Middleware & Security

- **JWT Authentication**: Protect routes by adding authentication middleware.
- **Helmet**: Adds security headers to API responses.
- **CORS**: Enables cross-origin resource sharing for frontend communication.

## Postman API Documentation

API is fully documented using Postman. You can import the collection using the following link:
[Postman Documentation URL]

## How to Use

1. Register and log in a user to get the JWT token.
2. Use the token to access protected routes (such as task creation and deletion).
3. Admin users can manage tasks and assign them to specific users.
4. Users can join project-specific chat rooms and communicate in real time.