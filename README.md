## 📊 NetBrahma- Score Dashboard
An interactive and responsive **credit score dashboard** built with **React** to track credit scores and provide financial insights.  
It visualizes your **NB Score**, **score history trends**, **account breakdown**, and **comparative position** against the overall population — all presented with interactive charts powered by **Recharts** and styled using **Tailwind CSS** for a modern, user-friendly experience.


---

## ✨ Features
- 🧭 **Score Gauge (Speedometer UI)** – Greets the user and shows the current **NB Score** with a needle gauge (300–900), last refreshed date, and quick actions like **Score Analysis** and **Refresh Now**.
- 📈 **Score History Line Chart** – Interactive line graph with tooltips, responsive labels, and custom markers using **Recharts**.  
- 🥧 **Accounts Pie Chart** – Visual breakdown of open/closed credit cards and loans.  
- 📊 **Where You Stand Bar** – Shows your NB score position vs population distribution.  
- 🛠️ **Responsive Design** – Optimized for both desktop and mobile with **Tailwind CSS**.  
- 📌 **Tooltip-enabled Info Icons** – Contextual help on “Your Accounts”, “NB Score History”, and “Where You Stand”.  
- 🧩 **Reusable Components** – `Card`, `ScoreGauge`, `Footer`, `Sidebar`, and `Header`.

---

## 🛠️ Tech Stack

- ⚛️ **React** – UI library  
- 🖼️ **HTML5** – Semantic structure  
- 🎨 **CSS3** – Core styling  
- 💨 **Tailwind CSS** – Utility-first styling framework  
- 📊 **Recharts** – Graphs and charts (LineChart, PieChart, Bar, etc.)  
- 📜 **JavaScript (ES6+)** – Business logic  
- 🎨 **React Icons** – Icon library  

---

## 📂 Project Structure
.
├── public/
│   └── index.html
├── src/
│   ├── assets/                  # Static images & icons
│   ├── components/
│   │   ├── layout/              # App shell: Sidebar, Header, Footer
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                  # Reusable UI widgets
│   │       ├── Card.jsx
│   │       └── ScoreGauge.jsx
│   ├── data/                    # Mock data (scores, accounts, etc.)
│   │   └── mockData.json
│   ├── pages/                   # Route-level views
│   │   └── Overview.jsx
│   ├── App.jsx                  # Root component
│   └── index.js                 # Entry point
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS pipeline for Tailwind
├── package.json                 # Dependencies & scripts
├── README.md                    # Project docs
└── .gitignore


---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/suriyasingaravel/NetBrahma-Dashboard.git
cd NetBrahma-Dashboard
npm install
npm run dev



