# 🎮 Pokémon Quiz – Cordova App

## 📱 Description
Une application mobile développée avec **Apache Cordova**, permettant de jouer à un **quiz Pokémon** connecté à l’API [Tyradex](https://tyradex.vercel.app/).  
Le joueur devine le nom du Pokémon à partir de son image.  
À la fin du jeu, les résultats sont enregistrés localement et un classement affiche les **5 meilleurs scores**.

---

## 🚀 Fonctionnalités principales
- 🎲 **Quiz Pokémon** : 10 questions aléatoires tirées depuis l’API.  
- 💾 **Sauvegarde locale** : score, nom et durée enregistrés dans un fichier `scores.jsonl` via le plugin `cordova-plugin-file`.  
- 🏆 **Classement** : affiche les 5 meilleurs joueurs dans `leaderboard.html`.  
- 💥 **Vibration avancée** : plugin personnalisé `cordova-plugin-advanced-vibration` :
  - ✅ Bonne réponse → 1 vibration  
  - ❌ Mauvaise réponse → 2 vibrations  
  - 🏁 Fin du jeu → 3 vibrations  

---

## 🧩 Structure du projet
```
pokemonApp/
│
├── www/
│   ├── index.html
│   ├── quiz.html
│   ├── leaderboard.html
│   ├── js/
│   │   ├── quiz.js
│   │   ├── leaderboard.js
│   │   └── leader.js
│   └── css/index.css
│
├── cordova-plugin-advanced-vibration/
│   ├── plugin.xml
│   ├── package.json
│   ├── www/
│   │   └── AdvancedVibration.js
│   └── src/
│       └── android/
│           └── AdvancedVibration.java
│
└── config.xml
```

---

## ⚙️ Installation

1️⃣ **Cloner le projet**
```bash
git clone https://github.com/bzakariae/Tp-Pokemon.git
cd pokemonApp
```

2️⃣ **Installer les dépendances Cordova**
```bash
npm install -g cordova
cordova platform add android
```

3️⃣ **Installer les plugins**
```bash
cordova plugin add cordova-plugin-file
cordova plugin add ./cordova-plugin-advanced-vibration
```

4️⃣ **Build et lancement**
```bash
cordova build android
cordova run android
```

---

## 🧠 Technologies utilisées
- **Cordova** – Framework mobile hybride  
- **JavaScript (Vanilla)**  
- **HTML / CSS /**  
- **API REST Tyradex**  
- **Plugin Cordova File**  
- **Plugin personnalisé AdvancedVibration (Java + JS)**

---


