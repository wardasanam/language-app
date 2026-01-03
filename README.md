# **🛸 Linguist Legend: Tactical Command Center**

**Linguist Legend** is a high-octane, spec-ops themed language acquisition platform. Move away from boring flashcards and enter a **Cyber-Slate Command Center** where you master new languages through precision word strikes, tactical assembly, and 10-phase combat missions.

## **⚡ Core Features**

### **1\. Tactical Word Assembler (Spelling Mode)**

The primary combat engine. Identify the English target and reconstruct the translation letter-by-letter using available tiles.

* **10-Tier Combat Ladder:** Difficulty scales automatically as you clear sectors.  
  * **LV. 1-3:** Initiate (Greetings, Numbers, Colors).  
  * **LV. 4-7:** Specialist (Objects, Family, Cities).  
  * **LV. 8-10:** Elite (Nature, Abstract Concepts, Advanced Nouns).  
* **Precision Hint System:** Spending **10 XP** allows a "System Override," instantly identifying and placing the next correct character in your buffer.

### **2\. 10-Phase Campaign (Quest Mode)**

Embark on a structured journey through 10 distinct tactical phases.

* **Auto-Advance Logic:** Correct strikes instantly move you to the next objective.  
* **Option Elimination:** Selecting a wrong translation disables that tile, depleting your shields but allowing you to try again.

### **3\. Armor Integrity System**

Common "Hearts" are offline. Your survivability is governed by **Shield Integrity**.

* **5 Shield Units:** Every tactical error (wrong letter or wrong MCQ choice) causes a breach.  
* **Mission Abort:** If integrity reaches 0%, the current deployment is terminated.

### **4\. Synced Intelligence Database**

A strictly verified dictionary across 8 core deployment zones:

* **Languages:** Spanish, Russian, French, German, Italian, Portuguese, Japanese (Romaji), and Dutch.  
* **Article-Free Protocol:** Every word is scrubbed of articles (no "the", "el", "la", etc.) for high-impact learning.  
* **Session Vault:** Words are "burned" once mastered, ensuring zero repetition during your session.

### **5\. Global XP Sync**

Your **Total System XP** is the single source of truth. Rewards and hint penalties are reflected in the HUD in real-time across all views.

## **🛠️ Tech Stack**

* **Framework:** [React](https://reactjs.org/)  
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
* **Icons:** Custom Inline SVGs (Lucide-inspired)  
* **Aesthetic:** Cyber-Slate / Glassmorphism / Neon HUD

## **🚀 Local Deployment**

### **1\. Clone & Initialize**

Ensure you have [Node.js](https://nodejs.org/) installed.

\# Create a new Vite project  
npm create vite@latest linguist-legend \-- \--template react  
cd linguist-legend  
npm install

### **2\. Install Styles**

npm install \-D tailwindcss postcss autoprefixer  
npx tailwindcss init \-p

### **3\. Configure Tailwind**

Update your tailwind.config.js with the Spec-Ops theme settings:

/\*\* @type {import('tailwindcss').Config} \*/  
export default {  
  content: \["./index.html", "./src/\*\*/\*.{js,ts,jsx,tsx}"\],  
  theme: {  
    extend: {  
      colors: {  
        slate: { 950: '\#020617', 900: '\#0f172a', 800: '\#1e293b' },  
        blue: { 400: '\#60a5fa', 500: '\#3b82f6', 600: '\#2563eb' }  
      },  
      animation: { 'bounce-slow': 'bounce-slow 4s ease-in-out infinite' },  
      backdropBlur: { '3xl': '64px' }  
    },  
  },  
  plugins: \[\],  
}

### **4\. Execute Engine**

Copy the logic from src/App.jsx and the styles from src/index.css provided in the project files, then run:

npm run dev

## **📡 Tactical Glossary**

| Level | Sector Name | Target Vocabulary |
| :---- | :---- | :---- |
| **LV. 1** | Frontier | Basic interaction (Yes, No, Hello) |
| **LV. 4** | Elemental | Core forces (Water, Fire, Sun) |
| **LV. 7** | Metropolis | Urban layout (City, Street, Door) |
| **LV. 10** | Singularity | Abstract truths (Freedom, Peace, Heart) |

**Good luck, Operative.**