# 📖 Discography

A full-stack web application that allows users to browse albums and photos, view user profiles, and authenticate using Google.

## 🚀 Features
- User authentication with Google
- Display list of users and their albums
- View album details and associated photos
- Edit photo titles
- Responsive design for mobile, tablet, and desktop
- Secure backend with Django & PostgreSQL
- Deployed with Vercel (frontend) and Render (backend)

## 🛠️ Tech Stack
### **Frontend:**
- React (Vite)
- React Bootstrap
- Axios (API requests)
- Firebase (Authentication)
- React Router DOM
- React Toastify (Notifications)
- Vitest & Testing Library (Unit Testing)

### **Backend:**
- Django REST Framework
- PostgreSQL (Production) / SQLite (Development)
- CORS Headers
- Render (Deployment)

### **CI/CD:**
- GitHub Actions (Linting, Testing, Deployment)
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

## 🏗️ Installation & Setup
### **1️⃣ Clone the repository**
```sh
 git clone https://github.com/LionelMv/Discography.git
 cd Discography
```

### **2️⃣ Backend Setup** (Django API)
```sh
 cd backend
 python -m venv venv
 source venv/bin/activate  # On Windows use `venv\Scripts\activate`
 pip install -r requirements.txt
```

#### **Environment Variables**
Create a `.env` file inside `backend/` with:
```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
ALLOWED_HOSTS=your_allowed_hosts
CORS_ALLOWED_ORIGINS=your_frontend_url # http://127.0.0.1:5173 for local
```

#### **Run Migrations & Start Server**
```sh
 python manage.py migrate
 python manage.py runserver
```

### **3️⃣ Frontend Setup** (React + Vite)
```sh
 cd ../frontend
 npm install
```

#### **Environment Variables**
Create a `.env` file inside `frontend/` with:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_API_BASE_URL=your_backend_url # http://127.0.0.1:8000  for local Development
```

#### **Start Frontend Server**
```sh
 npm run dev
```

## 🧪 Running Tests
### **Backend Tests (Django)**
```sh
 cd backend
 source venv/bin/activate
 python manage.py test
```

### **Frontend Tests (Vitest & React Testing Library)**
```sh
 cd frontend
 npm test
```

## 🚀 Deployment
### **Frontend (Vercel)**
The frontend is deployed on Vercel. To manually deploy, run:
```sh
 vercel --prod
```

### **Backend (Render)**
The backend is deployed on Render and uses an automatic deploy hook.
To manually trigger deployment, use:
```sh
 curl -X POST $RENDER_DEPLOY_HOOK
```

## 🌐 API Endpoints
### **Base URL:** `https://discography.onrender.com/api/`
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users/` | GET | Get all users |
| `/users/<id>/` | GET | Get user details |
| `/users/<id>/albums/` | GET | Get albums for a user |
| `/albums/` | GET | Get all albums |
| `/albums/<id>/` | GET | Get album details |
| `/albums/<id>/photos/` | GET | Get photos in an album |
| `/photos/<id>/` | GET | Get photo details |
| `/photos/<id>/` | PATCH | Update photo title |

## 📜 Project Structure
```
Discography/
│-- backend/        # Django Backend
│   ├── api/        # API Endpoints
│   ├── models.py   # Database Models
│   ├── views.py    # API Views
│   ├── settings.py # Django Settings
│   └── tests.py    # Backend Unit Tests
│
│-- frontend/       # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable Components
│   │   ├── pages/       # App Pages
│   │   ├── App.jsx      # Main App Component
│   │   ├── main.jsx     # Entry Point
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tests/       # Unit Tests
│   └── .env
│
│-- .github/workflows/  # GitHub Actions CI/CD
│-- README.md           # Project Documentation
```

## ✅ Contribution Guide
1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-branch`
3. **Commit changes with conventional commit messages:**
   ```sh
   git commit -m "feat: add user profile page"
   ```
4. **Push changes & create a pull request:**
   ```sh
   git push origin feature-branch
   ```

---
### 🎯 **Future Enhancements**
- Add user profile page
- Implement dark mode
- Improve UI using Tailwind CSS

📌 **Deployed Application:** [Frontend on Vercel](https://discographyart.vercel.app/)  
📌 **API Server:** [Backend on Render](https://discography.onrender.com/)

---
**Author:** [LionelMv](https://github.com/LionelMv)  
🛠 **Developed with ❤️ for the assessment.**

