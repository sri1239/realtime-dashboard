## 🐳 Local Dockerized Setup

You can run the entire stack (frontend + backend + database) with one command:

### 1. Clone the repo

```bash
git clone https://github.com/sri1239/realtime-dashboard.git
cd realtime-dashboard
docker-compose up --build

## Run app locally - Run backend in one terminal and frontend in one terminal parallely

Backend
 cd iot-backend
 node start.js

Frontend 
 cd iot-frontend
 npm start
