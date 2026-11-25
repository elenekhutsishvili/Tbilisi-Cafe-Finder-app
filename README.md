# Tbilisi Café Finder
CS 532 Software Engineering – Fall 2026

## Project Description

The Tbilisi Café Finder is a web-based application
designed to help users discover cafés in Tbilisi
based on their preferences and location.

## Team

Salome Sanadiradze

Elene Khutsishvili

Tekla Tvildiani

Mariam Merabishvili

Nino Khardziani

## Planned Technologies
Frontend: React + JavaScript

Backend: Django + DRF

Database: PostgreSQL

Maps: Leaflet + OpenStreetMap

## Running the Frontend

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### Installing Node.js and npm

npm is installed automatically together with Node.js.

1. Visit the official Node.js website:  
   https://nodejs.org/

2. Download the **LTS** version.

3. Open the downloaded installer.

4. Follow the installation steps and keep the default options.

5. Restart VS Code after the installation finishes.

6. Check that Node.js and npm were installed correctly:

```bash
node --version
npm --version
```

### Installation

Clone the repository and open the project folder:

```bash
git clone https://github.com/elenekhutsishvili/Tbilisi-Cafe-Finder-app
cd Tbilisi-Cafe-Finder-app
```

Install the project dependencies:

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```
## Backend Setup (Django + PostgreSQL)

The Tbilisi Café Finder backend is built with Django and Django REST Framework and uses PostgreSQL for data storage.

The backend is located in the `backend/` directory. Each developer should configure their own local PostgreSQL database using the shared SQL schema and seed files.

### Prerequisites

Before starting, make sure the following are installed:

- Python 3.10 or newer
- PostgreSQL
- Git
- Python virtual environment support (`venv`)

### 1. Set Up the Python Environment

From the repository root:

```bash
cd backend

python3 -m venv .venv
source .venv/bin/activate
```

On Windows without WSL, activate the environment using:

```powershell
.venv\Scripts\Activate.ps1
```

Install the required Python dependencies:

```bash
python -m pip install -r requirements.txt
```

### 2. Create the PostgreSQL Database

Create a local PostgreSQL database named `tbilisi_cafe_finder`.

On Ubuntu/WSL:

```bash
sudo -u postgres createdb tbilisi_cafe_finder
```

From the repository root, initialize the database using the provided SQL files:

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d tbilisi_cafe_finder -f ../Database/schema.sql
sudo -u postgres psql -v ON_ERROR_STOP=1 -d tbilisi_cafe_finder -f ../Database/seed.sql
```

Run these initialization scripts against a new, empty database. Do not rerun them against a populated database without checking their effects.

The seed data includes 20 fictional cafés, five amenities, and their relationships.

### 3. Create a PostgreSQL Application User

Open PostgreSQL:

```bash
sudo -u postgres psql
```

Create the application user:

```sql
SET password_encryption = 'scram-sha-256';
CREATE ROLE tcf_app WITH LOGIN;
\password tcf_app
```

Enter a unique password when prompted and store it securely.

Grant the required database permissions:

```sql
GRANT CONNECT ON DATABASE tbilisi_cafe_finder TO tcf_app;

\c tbilisi_cafe_finder

GRANT USAGE ON SCHEMA public TO tcf_app;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public TO tcf_app;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public TO tcf_app;
```

Exit PostgreSQL using `\q`.

Each developer should use their own local credentials. Database passwords must not be committed to Git.

### 4. Configure Environment Variables

Inside `backend/`, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values:

```dotenv
DB_NAME=tbilisi_cafe_finder
DB_USER=tcf_app
DB_PASSWORD=your_local_database_password
DB_HOST=127.0.0.1
DB_PORT=5432
```

The `.env` file is excluded from Git and must not contain credentials intended for sharing.

### 5. Run the Django Backend

From `backend/`, with the virtual environment activated:

```bash
python manage.py check
python manage.py runserver
```

By default, the backend runs at:

`http://127.0.0.1:8000/`

To verify the server is running, visit:

`http://127.0.0.1:8000/api/health/`

Expected response:

```json
{
  "status": "ok",
  "message": "Tbilisi Cafe Finder API is running"
}
```

The root URL (`/`) does not currently provide a homepage. The application interface is served separately by React/Vite.

### 6. Verify PostgreSQL Integration

From `backend/`, run:

```bash
python manage.py shell
```

Then execute:

```python
from cafes.models import Cafes, Amenities, CafeAmenities

print(Cafes.objects.count())
print(Amenities.objects.count())
print(CafeAmenities.objects.count())
```

Expected results with the current seed data:

```text
20
5
57
```

Exit using `exit()`.

### 7. Frontend and Backend Development

The application uses separate development servers:

| Component | Default address |
|---|---|
| React/Vite frontend | `http://localhost:5173` |
| Django backend | `http://127.0.0.1:8000` |
| Health-check endpoint | `http://127.0.0.1:8000/api/health/` |

Django is configured to allow cross-origin development requests from the local React/Vite server.

### Database Schema and Migrations

The PostgreSQL schema is currently defined in `Database/schema.sql`.

The initial Django models for cafés and amenities map to the existing database tables using `managed = False`.

**Do not run `python manage.py migrate` as part of the current setup procedure.**

The team must first establish a consistent migration strategy for the existing schema and Django's built-in authentication and administrative tables.

Changes to shared database models or schema should be coordinated with the database team member.

### Security Notes

- Never commit `.env` files, credentials, or Python virtual environments.
- Use `.env.example` to document required environment variables.
- Each developer should generate and securely store their own local database password.
- The `tcf_app` account is intended for application-level database access, not database administration.
- Development settings must be reviewed before deployment.