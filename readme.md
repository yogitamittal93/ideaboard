# 🚀 IdeaFlow: Capture Collective Genius, Anonymously.

## ✨ Project Summary

**IdeaFlow** is a modern, full-stack application designed to capture, organize, and prioritize anonymous user submissions in a real-time environment. It is built to demonstrate a scalable, microservices-oriented architecture suitable for production deployment.

The application is split into two parts:

1. A professional **Marketing Landing Page** (The front door).

2. A highly interactive **Idea Board** mini-app (The core product).

### 🛠️ Key Technologies

| Category | Technology | Rationale | 
| :--- | :--- | :--- | 
| **Frontend** | Next.js (React), **Tailwind CSS** | Best-in-class framework for rapid development and polished UX. | 
| **Backend** | Node.js / Express | Simple, high-performance microservices architecture. | 
| **Database** | PostgreSQL | Robust, reliable relational persistence for structured data (Ideas, Votes). | 
| **Containers** | **Docker** & **Docker Compose** | Zero-setup, environment parity between local and production. | 

## 📐 Architectural Rationale: Microservices First

The system uses a **Microservices** pattern from the outset. This deliberate choice separates concerns by domain, preventing technical debt and setting the foundation for future scaling, authentication, and specialized services.

### Monorepo Structure & Intent

| Service | Status (MVP) | Core Function | Scalability Path | 
| :--- | :--- | :--- | :--- | 
| **`frontend`** | **Active** | Serves all React/Next.js client code. | Easily scaled with a CDN (e.g., Vercel or CloudFront). | 
| **`api-gateway`** | **Active** | Single entry point. Handles routing, security, and future rate-limiting. | Scales horizontally; acts as the edge defense layer. | 
| **`ideas-service`** | **Active** | Manages all Idea creation, reading, and persistence. | Domain-specific scaling based on core load (most likely bottleneck). | 
| **`users-service`** | Placeholder | Future authentication and user profile management. | Separated to handle complex authentication flows later. | 
| **`votes-service`** | Placeholder | High-volume, low-latency vote processing (using Redis/separate DB). | Planned for decoupling upvote actions from the core database. | 

### Pragmatic Implementation Note

To achieve a fast MVP, upvote logic is temporarily handled within the `ideas-service`. This is a clean technical debt, marked for easy extraction into the dedicated `votes-service` when required by scale.

---

## ⚙️ Quick Start: Running the Full Stack

You have two robust options for running the project:

### Option 1: Docker Compose (Recommended - Single Command)

This is the preferred senior-level approach for consistent, zero-setup environments.

1.  **Prerequisites:** Docker and Docker Compose must be installed.
2.  **Build and Launch All Services:**
    ```bash
    docker-compose up --build
    ```
    *Wait for all services (frontend, gateway, and Postgres) to initialize.*

### Option 2: Local Development (Manual Multi-Service Start)

    Use this method for debugging or local development with hot-reloading.
    Start the Database: First, launch the PostgreSQL container using Docker Compose:
    ```bash
    docker-compose up -d postgres
    ```
    (The postgres service is now running in the background).

1.  **Start Services (must be run in four separate terminal tabs):**
    ```bash
    # Tab 1: Start the backend (backend)
    cd backend
    npm install
    npm run dev

    # Tab 2: Start the Core Ideas Service (backend/ideas-service)
    cd backend/ideas-service
    npm install
    npm run dev
    
    # Tab 3: Start the API Gateway (backend/api-gateway)
    cd backend/api-gateway
    npm install
    npm run dev
    
    # Tab 4: Start the Frontend App (frontend)
    cd frontend
    npm install
    npm run dev
    ```

### Access the Application

Once running (via either method):
* **Landing Page:** `http://localhost:3000/`
* **Idea Board App:** The CTA button will direct you to `/app`

---

## 💻 API Endpoints

The `api-gateway` exposes the following endpoints, which are served by the `ideas-service`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/ideas` | Retrieves all ideas, **sorted descending by upvote count.** |
| `POST` | `/api/ideas` | Submits a new idea. **Body:** `{ "text": "A great idea here (max 280 chars)" }` |
| `POST` | `/api/ideas/:id/upvote` | Increments the upvote counter for a specific idea ID. |

---

## ⏭️ Cloud-Native Readiness & Next Steps

While not required for the MVP, I've prioritized cloud-native readiness.

1.  **Observability (Monitoring):** The next logical step would be to introduce **Prometheus** and **Grafana** via Docker Compose. This allows us to gather and visualize critical metrics like API latency, error rates, and upvote frequency to ensure system health and optimize performance under load. We've budgeted for this work to be done after the MVP is launched.
2.  **Infrastructure:** Skeleton Kubernetes manifests are included in **`infra/k8s`** to transition seamlessly to a container orchestration environment (EKS, GKE, etc.).
3.  **Real-Time:** For instant updates (beyond the current efficient polling mechanism), we would introduce WebSockets (e.g., via Socket.IO) through the API Gateway to push new ideas and votes instantly to all connected clients.
