# 🧊 AI Fridge Manager – Food Waste Reduction App

AI Fridge Manager is a full-stack application that helps users track food items, detect ingredients using AI, monitor expiry dates, and reduce food waste.
The app also includes recipe suggestions and a community recipe sharing system with likes and comments.

This project is built with **FastAPI, Next.js, PostgreSQL (Neon), Clerk Auth, and Gemini AI**.

---

## 🚀 Features

### ✅ Authentication

* Clerk based authentication
* Backend user sync with database
* Each user has separate fridge data

### 📸 AI Fridge Scan

* Upload fridge image
* Gemini AI detects ingredients
* User can edit detected items
* Save items to fridge

### 🧊 Fridge Manager

* Add / edit / delete items
* Expiry date tracking
* Status tracking (active / expired / used)
* Background cron job updates expired items

### ⏳ Expiry Timeline

* Items sorted by expiry
* Expired items automatically updated
* Used for stats and alerts

### 🍳 Recipe Suggestion (AI)

* Uses fridge items
* Sends to Gemini
* Returns recipe ideas

### 🌍 Community Recipes

* Post recipe
* Like recipe
* Comment on recipe
* Like count & comment count stored in DB

### 📊 Stats System

* Track food saved
* Track expired items
* Track added items

### ⚙ Background Scheduler

* APScheduler used
* Runs cron job for expiry check

---

## 🏗 Tech Stack

### Frontend
* Next.js
* Tailwind CSS
* Clerk Auth

### Backend
* FastAPI
* PostgreSQL (Neon DB)
* Gemini AI API

---

## ⚙ Installation

### 1. Clone repo

```
git clone https://github.com/Ashutoshkr-12/Ai-food-waste-reducer
cd ai-fridge-manager
```

### 2. Create venv

```
python -m venv venv
venv/scripts/activate
```

### 3. Install deps

```
pip install -r requirements.txt
```

### 4. Add .env

```
DATABASE_URL=
CLERK_SECRET_KEY=
GEMINI_API_KEY=
```

### 5. Run server

```
uvicorn app.main:app --reload
```

## ⏱ Background Job

Expiry job runs automatically using APScheduler.
```
every 10 minutes → check expiry_date → update status
```





## 📜 License

MIT License
