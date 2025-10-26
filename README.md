# 🚀 Laravel + React.js (Vite)

This repository provides a **full-stack web application** setup using:  

- **Laravel** → Backend (API, database, authentication, etc.)  
- **React.js + Vite** → Frontend (UI & interactions)  

---

## 📂 Project Structure

---

## ⚙️ Backend Setup (Laravel)

### Installation
```bash
cd backend_project
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
