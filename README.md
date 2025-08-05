# Todo-App

This is a to-do list application, created as a **Solo Project** for the Chingu program. It's a CRUD (Create, Read, Update, Delete) application.

### Key Features

  * **Create Tasks:** Add new tasks to the list.
  * **Read/View Tasks:** Display all tasks in a list.
  * **Update/Edit Tasks:** Modify existing tasks.
  * **Delete Tasks:** Remove tasks.
  * **Toggle Completion Status:** Mark tasks as done.

## Technologies Used

  * **Frontend:**
      * React JS
      * Tailwind CSS
      * React Router
      * Typescript
  
  * **Backend:**
      * Node JS
      * Express
      * Typescript
      * JWT
      * PostgreSQL

## ⚙️ Installation and Usage

To get this application running on your local machine, you'll need to set up both the backend API and the frontend client.

### Prerequisites

  * **Node.js** (v20 or higher)
  * **npm**
  * **Git**

### Environment Variables

You need to create two separate environment files for the project to run correctly.

**1. Backend `.env` File**

In the `backend` directory, create a file named `.env` and add the following variables:

```
PORT=4000
DB_URI=your_database_connection_string_here
SECRET=your_jwt_secret_key_here
```

  * `PORT`: The port on which the backend server will run.
  * `DB_URI`: The connection string for your database.
  * `SECRET`: A secret key for JWT authentication.

**2. Frontend `.env.development` File**

In the `frontend` directory, create a file named `.env.development` and add the following variable:

```
VITE_API_URL=http://localhost:4000
```

  * `VITE_API_URL`: The URL of your backend API. Make sure the port matches the `PORT` variable in your backend's `.env` file.

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/carlos0424990/todo-app.git
    cd todo-app
    ```

2.  **Set up the Backend:**
    Navigate to the `backend` directory, install the dependencies, and start the server.

    ```bash
    cd backend
    npm install
    npm run dev
    ```

    The API server will run on `http://localhost:4000`.

3.  **Set up the Frontend:**
    In a new terminal window, navigate to the `frontend` directory, install its dependencies, and start the React application.

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

    The React application will run on `http://localhost:5173`.

Once both the backend and frontend are running, you can open your browser to the frontend URL to start using the application.
