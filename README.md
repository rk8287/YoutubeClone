## 📺 YouTube Clone (MERN Stack)

A full-stack YouTube Clone built using **MongoDB, Express, React, and Node.js**. Users can register, log in, create channels, and manage their own content — just like a real YouTube experience.

---

## 🚀 Features

* 🔐 User Registration & Login (JWT Auth)
* 📺 Channel Creation (Only after login)
* 👤 Dynamic Channel Profile Page
* 📤 Video Upload (from within your channel)
* 🖼️ Thumbnail Upload & Preview
* 🎥 Video Playback (Responsive Player)
* 💬 Comment System
* 🔎 Search & Category Filters
* 🧠 Redux Toolkit for Global State
* ⚡️ Fully Mobile Responsive

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
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Pages like Home, Watch, ChannelProfile
│   │   ├── redux/         # Redux slices for state
│   │   └── App.jsx        # App entry point
│   └── vite.config.js     # Vite config
├── server/                # Node/Express backend
│   ├── routes/            # API routes
│   ├── controllers/       # Controller logic
│   ├── models/            # Mongoose models (User, Channel, Video)
│   ├── uploads/           # Uploaded files
│   └── server.js          # Main entry point
└── README.md              # Project documentation

````

---

## 🧑‍💻 How to Run the Project Locally

### Prerequisites:

- Node.js and npm
- MongoDB Atlas or local MongoDB
- Git

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rk8287/youtube-clone.git
cd youtube-clone
````

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

Start the server:

```bash
nodemon server.js
```

✅ Backend runs at: `http://localhost:5000`

---

### 3️⃣ Setup the Frontend (Client)

```bash
cd client
npm install
```

#### Optional: Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

✅ Frontend runs at: `http://localhost:5173`

---

## 🧭 App Flow

1. **Login / Register**
2. **Create Your Channel**
3. **Upload Videos via Channel**
4. **Browse or Search Videos**
5. **Filter Videos by Category**
6. **Watch, Like, and Comment**

---

## 🌐 Accessing from Mobile (Same Wi-Fi)

1. Connect both devices to the same Wi-Fi
2. Find your PC's local IP (e.g. `192.168.1.4`)
3. Access on mobile: `http://192.168.1.4:5173`
4. Set the API URL in `.env`:

```
VITE_API_URL=http://192.168.1.4:5000/api
```

---

## 🔮 Future Improvements

* Like/Dislike Buttons
* Subscriptions
* Login User can access createChannel Page


---

## 🤝 Contribution

Feel free to fork the repo, raise issues, and submit pull requests!

---

## 📄 License

MIT License