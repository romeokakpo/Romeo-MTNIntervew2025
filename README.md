This documentation provides a step-by-step guide to start a **Django** backend and **React** frontend project using **Docker** and **Docker Compose**.

## **Prerequisites**

Before starting, make sure you have the following tools installed:

1. **Docker**: [Install Docker](https://www.docker.com/get-started)
2. **Docker Compose**: Docker Compose is included with Docker Desktop, but you can follow the installation instructions here: [Install Docker Compose](https://docs.docker.com/compose/install/).

## **Project Structure**

- **`backend/`**: Contains the Django project and related files.
- **`frontend/`**: Contains the React project and related files.
- **`docker-compose.yml`**: Docker Compose configuration to run both frontend and backend services together.

---

## **1. Clone the Repository (if applicable)**

If the project is in a repository, start by cloning it to your local machine:

```bash
git clone https://github.com/romeokakpo/my-project.git
cd my-project
```

---

## **4. Running the Project**

### **Step 1: Build and Start the Containers**

Once everything is set up, run the following command to build and start the services defined in `docker-compose.yml`:

```bash
docker-compose up --build
```

- **`--build`** ensures that Docker rebuilds the images if necessary.

This will start both the frontend (React) and backend (Django) services. Docker Compose will automatically handle the communication between the services.

### **Step 2: Access the Application**

- **Frontend (React)**: Open your browser and navigate to `http://localhost:3000` to access the React application running in development mode.
- **Backend (Django)**: The Django app will be accessible at `http://localhost:8000`.

The React app will make API requests to `http://backend:8000` (as defined in the `REACT_APP_API_URL` environment variable), which points to the Django backend running in Docker.

---

## **5. Stopping the Containers**

To stop the running services, use the following command:

```bash
docker-compose down
```

This will stop and remove the containers. If you want to keep the data (like database data), use `docker-compose down --volumes` to remove everything, including volumes.

---

## **6. Debugging and Logs**

You can view logs for any service with the following command:

```bash
docker-compose logs <service_name>
```

For example, to view logs for the backend service:

```bash
docker-compose logs backend
```

If you need to execute commands inside the running containers, you can use the `docker-compose exec` command. For example, to access the Django container's shell:

```bash
docker-compose exec backend bash
```

---

## **7. Conclusion**

By using Docker Compose, we can efficiently manage both the **Django backend** and **React frontend** services in a containerized environment. This setup allows you to easily build, run, and manage your application with minimal configuration.

Now, you're ready to develop your Django + React app with Docker!
