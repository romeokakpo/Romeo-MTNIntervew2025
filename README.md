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
git clone https://github.com/romeokakpo/Romeo-MTNIntervew2025
cd Romeo-MTNIntervew2025
```

---

## **2. Running the Project**

### **Step 1: Build and Start the Containers**

```bash
docker-compose up --build
```

- **`--build`** ensures that Docker rebuilds the images if necessary.

This will start both the frontend (React) and backend (Django) services. Docker Compose will automatically handle the communication between the services.

### **Step 2: Access the Application**

- **Frontend (React)**: Open your browser and navigate to `http://localhost:5173` to access the React application running in development mode.
- **Backend (Django)**: The Django app will be accessible at `http://localhost:8000`.

The React app will make API requests to `http://backend:8000`, which points to the Django backend running in Docker.

---

## **3. Stopping the Containers**

To stop the running services, use the following command:

```bash
docker-compose down
```

This will stop and remove the containers. If you want to keep the data (like database data), use `docker-compose down --volumes` to remove everything, including volumes.
