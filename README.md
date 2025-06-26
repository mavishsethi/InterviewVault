# 🧠 InterviewVault

InterviewVault is a full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users log and explore real interview experiences shared by peers. It includes features like filtering, likes, comments, and user authentication.

---

## 🚀 Features

- 🔐 User authentication (JWT + Google OAuth)
- 📄 Add, view, and explore interview experiences
- 🏷️ Filter experiences by company, role, and tags (DSA, HR, System Design, etc.)
- ❤️ Like and 💬 comment on experiences
- 📊 Interview rounds and questions breakdown

---

## 🖥️ Tech Stack

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT, Google OAuth

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/InterviewVault.git
cd interviewvault
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Setup `.env` File

Create a `.env` file in the root 

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

### 4. Start Backend Server

```bash
node server/index.js
```
---

### 5. Start Frontend

```bash
cd client
npm install
npm run dev
```
