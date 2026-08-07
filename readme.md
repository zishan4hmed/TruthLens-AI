# 🔍 TruthLens AI

TruthLens AI is an AI-powered fake news detection web application that analyzes news content and provides an intelligent credibility report.

The project combines a modern premium frontend with a Node.js/Express backend, MongoDB database, authentication, AI-powered analysis, history tracking, and saved reports.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 🧠 AI-powered News Analysis
- 📊 Confidence Score
- ⚠️ Risk Level Detection
- 📝 AI-generated Summary
- 💡 AI Explanation
- 🔎 Keyword Extraction
- 🌐 Language Detection
- 🤖 AI Model Information
- ⏱️ Processing Time
- 📜 Analysis History
- 💾 Saved Reports
- 📈 Dashboard Statistics
- 📊 Analysis Chart
- 👤 User Profile
- 🗑️ Delete Saved Reports
- 🧹 Clear All Saved Reports
- 📱 Responsive Premium UI
- 🔔 Premium Success/Error Notifications
- 🚪 Secure Logout

---

## 🧠 AI News Analysis

Users can paste a news article into the analyzer and submit it for analysis.

The system evaluates the content and generates:

```text
Prediction
Confidence
Risk Level
AI Explanation
Summary
Keywords
Language
AI Model
Processing Time
```

Possible predictions include:

```text
Real
Fake
Uncertain
```

---

## 📊 Confidence Analysis

TruthLens AI displays the AI model's confidence percentage using an animated visual indicator.

Example:

```text
Confidence: 90%
██████████████████░░
```

The confidence score helps users understand how strongly the AI model supports its prediction.

---

## ⚠️ Risk Level

The application categorizes the detected risk level based on the analysis.

Possible levels include:

```text
Low
Medium
High
```

---

## 🔐 Authentication

TruthLens AI includes a complete authentication system.

### Registration

Users can create an account using:

- Name
- Email
- Password

### Login

Registered users can log in using their email and password.

Authentication uses:

```text
JWT (JSON Web Token)
```

The token is stored on the client side and automatically sent with protected API requests.

---

## 👤 User Profile

After logging in, users can access their profile information.

The dashboard displays:

```text
Name
Email
Total Analyses
```

---

## 📊 Dashboard

The dashboard provides an overview of the user's analysis activity.

It displays:

```text
Total Analyses
Real News
Fake News
Average Confidence
```

It also includes a visual analysis chart for Real vs Fake news.

---

## 📜 Analysis History

TruthLens AI stores previous analyses associated with the authenticated user.

Users can view their previous analysis results from the History section.

Each analysis can display:

```text
Prediction
Confidence
Summary
```

---

## 💾 Saved Reports

Users can save important AI analysis reports for later review.

The Saved Reports section provides:

```text
Total Reports
Real News Reports
Fake News Reports
```

Users can:

- View a saved report
- Delete an individual report
- Clear all saved reports

---

## 🎨 Premium UI

The frontend is designed with a modern dark premium interface.

The UI includes:

- Gradient backgrounds
- Glassmorphism effects
- Animated elements
- Responsive layouts
- Modern cards
- Interactive buttons
- Modal reports
- Animated confidence indicators
- Premium notifications

---

## 🛠️ Technology Stack

### Frontend

```text
HTML5
CSS3
JavaScript
Bootstrap
Remix Icon
Chart.js
```

### Backend

```text
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Axios
Morgan
CORS
dotenv
```

### AI Services

```text
Google Gemini
Hugging Face
```

---

## 📁 Project Structure

```text
TruthLens AI/
│
├── backend/
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   └── huggingFaceService.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── js/
│   │
│   ├── index.html
│   ├── dashboard.html
│   ├── savedReports.html
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd TruthLens-AI
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Create `.env`

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
HF_API_KEY=your_huggingface_api_key
NODE_ENV=production
```

Do not upload your `.env` file to GitHub.

---

## ▶️ Running the Backend

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### News Analysis

```text
POST /api/analyze
GET  /api/analyze/history
```

### Health Check

```text
GET /
GET /api/status
```

---

## 🔑 Authentication Flow

The authentication process works as follows:

```text
User
  ↓
Register / Login
  ↓
Backend validates credentials
  ↓
JWT Token Generated
  ↓
Token stored in browser
  ↓
Protected API Requests
  ↓
JWT Middleware
  ↓
Authenticated User
```

---

## 🗄️ Database

TruthLens AI uses MongoDB for storing application data.

The database can store information such as:

```text
User
Email
Password Hash
Analysis Results
Prediction
Confidence
Summary
Explanation
Created Date
```

Passwords are hashed using:

```text
bcryptjs
```

---

## 🔒 Security

The project implements several security practices:

- Password hashing
- JWT authentication
- Protected API routes
- Environment variables for API keys
- CORS configuration
- Input validation
- Authentication middleware

Sensitive credentials should never be committed to GitHub.

---

## 🌐 Deployment

TruthLens AI can be deployed using services such as:

```text
Frontend → Vercel / Netlify
Backend → Render / Railway
Database → MongoDB Atlas
```

After deployment, the frontend API URL should be updated from:

```text
http://localhost:5000/api
```

to the deployed backend URL.

---

## 🧪 Testing

The backend APIs can be tested using:

```text
Postman
```

Important endpoints to test:

```text
Register
Login
Profile
Analyze News
Analysis History
```

---

## 📱 Responsive Design

The application is designed to work across:

```text
Desktop
Laptop
Tablet
Mobile
```

Responsive CSS media queries are used to adapt the interface to different screen sizes.

---

## 🎯 Project Objective

The primary goal of TruthLens AI is to provide users with an easy-to-use platform for analyzing online news and understanding potential misinformation.

Instead of providing only a simple Real/Fake result, the application provides additional information such as:

```text
Confidence
Risk Level
Summary
AI Explanation
Keywords
Language
AI Model
```

This makes the analysis more informative and easier for users to understand.

---

## 🔮 Future Improvements

Possible future improvements include:

- More advanced AI fact-checking
- Real-time web source verification
- News source credibility scoring
- URL-based automatic article extraction
- Browser extension
- Multi-language analysis
- Improved misinformation detection models
- Admin dashboard
- Advanced analytics
- Cloud deployment
- Email notifications
- Social media integration

---

## 👨‍💻 Developer

**Zishan Ahmad**

B.Tech Computer Science Engineering Student  
Galgotias University

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
