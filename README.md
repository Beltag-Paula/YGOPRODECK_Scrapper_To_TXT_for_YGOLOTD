# 🃏 YGOPRODECK_Scrapper_To_YCS_for_YGOLOTD

A lightweight web-based Node.js tool that **scrapes Yu-Gi-Oh! decklists from YGOPRODeck** and exports them into a **`.txt` format compatible with YGO Legacy of the Duelist: Link Evolution (YGOLOTD)** modding tools such as **YDC Converter**.

This project includes a front-end interface and a Node.js backend that parses deck data directly from any valid YGOPRODeck deck URL.

---

## ✨ Features

- ✔️ Scrapes **Main**, **Extra**, and **Side** Decks from YGOPRODeck  
- ✔️ Outputs YGOLOTD-compatible `.txt` files:
  ```
  [main]
  ...
  [extra]
  ...
  [side]
  ...
  [unknown]
  ```
- ✔️ Built-in URL validation (only accepts `ygoprodeck.com`)
- ✔️ Browser prompts user with **Save File dialog**
- ✔️ Simple front-end UI (HTML/CSS/JS)
- ✔️ Backend uses **Express** + **JSDOM**

---

## 📁 Project Structure

```
YGOPRODECK_Scrapper_To_YCS_for_YGOLOTD/
│
├── public/
│   ├── index.html        # Front-end UI
│   ├── index.css         # Styling
│   ├── main.js           # Handles input + saving deck
│   └── background.png    # Background image
│
├── server.js             # Backend logic & HTML scraping
├── package.json
└── README.md
```

---

## ⚙️ How It Works

### 1️⃣ User enters a YGOPRODeck URL  
Example: `https://ygoprodeck.com/deck/example-123456`

### 2️⃣ Front-end validates hostname  
Only accepts:
```
ygoprodeck.com
```

### 3️⃣ Backend scrapes the page  
Using:
- `fetch()` to get HTML  
- **JSDOM** to parse the DOM  
- Extracts card names from:
  ```
  #main_deck
  #extra_deck
  #side_deck
  ```

### 4️⃣ Deck is formatted  
Example:
```
[main]
Dark Magician
Magician's Rod
...
[extra]
...
[side]
...
[unknown]
```

### 5️⃣ Browser asks the user where to save the `.txt`  
Thanks to:
```
showSaveFilePicker()
```

---

## 🖥️ Running the Project

### 🔧 Install dependencies
```bash
npm install
```

### ▶️ Start the server
```bash
node server.js
```

You should see:
```
Server listening on PORT 3000
```

### 🌐 Open the app  
Visit:
```
http://localhost:3000
```

Paste a YGOPRODeck URL → Click **Submit** → Save `.txt`.

---

## 📜 main.js Overview (Front-End)

- Validates URL  
- Sends POST request to `/extract`  
- Receives formatted deck text  
- Opens Save File picker  
- Contains extra buttons linking to:
  - 📘 Link Evolution Editing Guide  
  - 🛠️ YDC Converter Releases  
  - 📦 VirtualBox

---

## 🔌 server.js Overview (Back-End)

- Serves static files from `/public`
- Handles `/extract` POST requests
- Scrapes HTML and extracts:
  - Main Deck
  - Extra Deck
  - Side Deck
- Uses JSDOM:
  ```js
  img.master-duel-card[data-cardname]
  ```
- Returns final deck text back to the browser

---

## 📄 Example Output (myDeck.txt)

```
[main]
Blue-Eyes White Dragon
Sage with Eyes of Blue
...
[extra]
Azure-Eyes Silver Dragon
...
[side]
...
[unknown]
```

---

## 📌 Requirements

- Node.js 16+
- Chromium-based browser (for Save File API)

---

## 📝 Notes

- Deck file is **downloaded by the browser** — not written by the server.
- Only URLs from `ygoprodeck.com` are accepted.
- If YGOPRODeck updates their HTML layout, selectors may need changes.

---

## 📜 License

This project is provided as-is. Feel free to modify and use it in your deck conversion workflows.

---
