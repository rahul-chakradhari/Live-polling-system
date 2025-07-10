# 🗳️ Live Polling System

A real-time web application that simulates a live classroom polling environment using **React** and **Socket.IO**. Built for interactive learning and real-time student engagement, this system supports two personas: **Teacher** and **Student** — each with tailored functionality.

## 🔍 Overview

This project was created as part of an assignment that mimics a real-world polling system for classrooms, interviews, or webinars. It uses **WebSockets** for live updates and ensures efficient state handling on both client and server.

---

## 👥 Personas

### ✅ Teacher

- Create new poll questions.
 <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e7847980-939b-4e63-820f-f67d223ecc6b" />
- View <b>Live Polling Results</b> as students submit answers.
- Can only create a new question **if no active poll is running**, or **after all students have answered**.
- Optional: Configure a **custom time limit** for polls.
- Optional: **Kick out** misbehaving students.
- Optional: View **past poll results** (fetched from database, not local storage).

---

### 👤 Student

- Enter their **name once per tab** (name is retained on refresh, but not across tabs).
- Respond to questions when asked by the teacher.
- **View live poll results** after answering or once the time limit ends.
- Automatically shown results if they do not respond within **60 seconds**.

---

## 🧰 Tech Stack

| Category      | Technology               |
|---------------|---------------------------|
| Frontend      | React, HTML, CSS, JavaScript |
| State Mgmt    | (Optional) Redux         |
| Backend       | Node.js, Express.js      |
| Real-Time     | Socket.IO                |
| Hosting       | Render / Vercel / Netlify (Frontend), Cyclic / Render (Backend) |

---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone https://github.com/rahul-chakradhari/Live-polling-system.git
cd Live-polling-system

### 2. Run Backend

cd backend
npm install
node index.js

### 3. Run Frontend

cd frontend
npm install
npm start

###  Author
Rahul Chakradhari
B.Tech CSE | 2025
Email: rahulchakradhari10september@gmail.com
GitHub: @rahul-chakradhari
