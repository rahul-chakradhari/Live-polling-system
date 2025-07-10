# 🗳️ Live Polling System

A real-time web application that simulates a live classroom polling environment using React and Socket.IO. Built for interactive learning and real-time student engagement, this system supports two personas: **Teacher** and Student — each with tailored functionality.

## 🔍 Overview

This project was created as part of an assignment that mimics a real-world polling system for classrooms, interviews, or webinars. It uses **WebSockets** for live updates and ensures efficient state handling on both client and server.

---

## 👥 Personas

### ✅ Teacher

- Create new poll questions.
 <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e7847980-939b-4e63-820f-f67d223ecc6b" />
  <br>
  <br>
- View Live Polling Results as students submit answers.
  <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/61bbd400-2acf-40c7-bb78-f3aaaf8c2ac0" />
- Can only create a new question **if no active poll is running**, or **after all students have answered**.

  <br>
- Optional: Configure a custom time limit for polls.
 <br>
 <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/5731fde4-c29a-4bc5-8e37-129b5b041a6d" />
 <br>
- Optional: Kick out misbehaving students.
 <br>
 <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/16ec4602-4156-4a61-a5c3-312a6ada1a4f" />
  <br>
- Optional: View past poll results (fetched from database, not local storage).
  <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/52217f93-b9fe-48ba-bb97-d938007c5527" />

---

### 👤 Student

- Enter their **name once per tab** (name is retained on refresh, but not across tabs).

  <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/37d4e902-06c3-45bb-a516-adea988abc98" />
  <br>
- Respond to questions when asked by the teacher.
  <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/c4a6b8a9-8a16-4b71-b7eb-94667e41a398" />
  <br>
- View live poll results after answering or once the time limit ends.

  <br>
  <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/d848e400-5f7b-4954-94b7-58573aa135a7" />
- Automatically shown results if they do not respond within **60 seconds**.
<br>
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/567af2bc-08ff-4bb2-a6b6-92c96832b72e" />
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
