## 📺 YouTube Clone (MERN Stack)

A full-stack YouTube Clone built using **MongoDB, Express, React, and Node.js**. Users can register, log in, upload videos, comment, and view videos — just like the real YouTube experience.

---

## 🚀 Features

* 🔐 User Registration & Login (JWT Auth)
* 📤 Video Upload & Thumbnail Preview
* 🎥 Video Playback (Responsive Player)
* 💬 Comment System
* 👤 Dynamic User Profiles
* 🧠 Redux Toolkit for Global State
* ⚡️ Mobile Responsive (Like real YouTube mobile UI)

---

## 🛠️ Tech Stack

| Frontend      | Backend    | Other Tools          |
| ------------- | ---------- | -------------------- |
| React.js      | Node.js    | Axios                |
| Redux Toolkit | Express.js | Dotenv               |
| Tailwind CSS  | MongoDB    | Multer (File Upload) |
| React Router  | JWT Auth   | Vite                 |

---

## 📁 Folder Structure (Basic)

```
YoutubeClone/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # App pages (Home, Login, Profile)
│   │   ├── redux/         # Redux slices
│   │   └── App.jsx        # App entry
│   └── vite.config.js
├── server/                # Node/Express backend
│   ├── routes/            # API routes
│   ├── models/            # MongoDB models
│   ├── uploads/           # Uploaded videos
│   └── server.js          # Main server file
└── README.md
```

---

## 🧑‍💻 How to Run the Project Locally

### Prerequisites:

* Node.js and npm installed
* MongoDB Atlas account (or local MongoDB)
* Git

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rk8287/youtube-clone.git
cd youtube-clone
```

---

### 2️⃣ Setup the Backend (Server)

```bash
cd server
npm install
```

#### Create a `.env` file inside the `server/` folder:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
```

#### Then start the backend:

```bash
nodemon server.js
```

✅ Server runs at `http://localhost:5000`

---

### 3️⃣ Setup the Frontend (Client)

```bash
cd client
npm install
```

#### Create a `.env` file inside the `client/` folder (Optional):

```env
VITE_API_URL=http://localhost:5000/api
```

#### Then start the frontend:

```bash
npm run dev
```

✅ Frontend runs at `http://localhost:5173`

---

## 🌐 Accessing from Mobile (Same Wi-Fi)

To test on mobile:

1. Make sure your **mobile and PC are on same Wi-Fi**
2. Find your **local IP** (e.g., `192.168.1.4`)
3. Open frontend: `http://192.168.1.4:5173`
4. Make sure the backend also listens on the same IP

Update the VITE\_API\_URL in `client/.env` to match:

```
VITE_API_URL=http://192.168.1.4:5000/api
```

---

## 🧪 Future Improvements

* Like/Dislike Functionality
* Search and Filtering


---

## 🤝 Contribution

Feel free to fork the repo, raise issues, and submit pull requests!

---

## 📄 License

MIT License
