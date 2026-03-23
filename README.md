# 🎓 SmartCampus Buddy MVP

## 📖 What is this app?
**SmartCampus Buddy** is a centralized, mobile-first campus assistant app designed specifically for students to navigate their college life easily. Instead of having multiple scattered portals, SmartCampus Buddy unifies everything a student needs into a single, sleek interface. 

This repository contains the Minimum Viable Product (MVP) of the application, featuring a working frontend prototype with a simulated database.

## 🚀 Why was this built?
College campuses can be chaotic. Students often struggle to find important information like sudden schedule updates, the location of a specific lab, or a quick way to report a broken facility. 

SmartCampus Buddy solves this by acting as a digital companion that empowers students to:
- 🔥 Discover live **Crowd Insights** to avoid long lines in the cafeteria or library.
- 🧭 **Navigate Campus** easily with a searchable location directory.
- 🚨 Quickly **Report Issues** around the campus facilities (e.g., broken Wi-Fi or seating).
- 🔍 Check and manage a campus-wide **Lost & Found** network.
- 💬 Connect via **Study Groups** and an interactive **Doubts Forum**.
- 🤖 Intercept basic campus queries via a sleek AI placeholder (@buddy).

## 🛠️ Tech Stack Used
This project was designed as a lightweight, lightning-fast frontend MVP, allowing for rapid iterations and immediate deployment without requiring a complex backend database.

- **Frontend Framework:** React 18
- **Build Tool:** Vite (for fast HMR and optimized builds)
- **Routing:** React Router DOM
- **Styling Architecture:** Modern Vanilla CSS (utilizing CSS Variables, Flexbox/Grid, and responsive scaling)
- **Iconography:** Lucide-React
- **Database / State:** Browser `localStorage` Wrapper (`src/services/db.js`). All interactions accurately mirror standard CRUD endpoints to easily swap out for a real backend (Node.js/Firebase/Supabase) in the future.

## 🔐 Trying it Locally
Because the database interactions execute entirely in your local browser storage, anyone who opens the site gets their own isolated, fully-functional instance of the app! 

**Login Credentials for the MVP:**
- Single Access Code: `CAMPUS2024`

### Installation Instructions
If you have node installed, you can boot this project in seconds:
```bash
# 1. Clone the repository
git clone https://github.com/shanmukh-dotcom/smart-campus-mvp.git

# 2. Navigate to directory
cd smart-campus-mvp

# 3. Install NPM dependencies
npm install

# 4. Start the development server
npm run dev
```
