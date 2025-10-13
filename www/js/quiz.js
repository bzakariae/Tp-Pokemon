let score = 0;
let questionCount = 0;
let currentPokemon = null;
let startTime = Date.now();

// Tirer un Pokémon aléatoire
function getRandomPokemon() {
    const id = Math.floor(Math.random() * 1010) + 1; // IDs valides
    fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon non trouvé");
            return response.json();
        })
        .then(data => {
            currentPokemon = data;
            const img = document.getElementById("pokemonImage");
            img.src = data.sprites.regular;
            img.alt = data.name.fr;
            img.style.filter = "grayscale(100%)";
        })
        .catch(err => {
            console.warn(err);
            getRandomPokemon();
        });
}



// Vérifier la réponse
function checkAnswer() {
    const input = document.getElementById("pokemonName").value.trim().toLowerCase();
    const message = document.getElementById("message");

    if (!currentPokemon) return;

    if (input === currentPokemon.name.fr.toLowerCase()) {
        message.textContent = "✅ Correct !";
        score++;
       AdvancedVibration.vibratePattern([200]);

    } else {
        message.textContent = `❌ Incorrect ! C'était ${currentPokemon.name.fr}`;
        AdvancedVibration.vibratePattern([200, 100, 200]);

    }

    questionCount++;

    if (questionCount >= 10) {

        setTimeout(() => {
            showResult();
        }, 1000);
    } else {

        setTimeout(() => {
            message.textContent = "";
            document.getElementById("pokemonName").value = "";
            getRandomPokemon();
        }, 1000);
    }
}

// Afficher le formulaire de résultat
function showResult() {
    const container = document.querySelector(".quizContainer");
    container.innerHTML = `
        <h1>Quiz terminé !</h1>
        <p>Score: ${score}/10</p>
        <label><p>Votre nom:</p> <input type="text" id="playerName"></label>
        <button id="saveBtn">Sauvegarder</button>
    `;

    document.getElementById("saveBtn").addEventListener("click", saveResult);
    AdvancedVibration.vibratePattern([200, 100, 200, 100, 200]);

}
// sauvegarder les résultats
function saveResult() {
  if (!window.cordova || !cordova.file || !window.resolveLocalFileSystemURL) {
    alert("Sauvegarde indisponible (Cordova non prêt).");
    return;
  }

  const nameInput = document.getElementById("playerName");
  const playerName = (nameInput?.value || "").trim() || "Anonyme";

  // Calcul du temps écoulé depuis startTime
  const durationMs = Math.max(0, Date.now() - (startTime || Date.now()));
  const payload = {
    name: playerName,
    score: Number(score) || 0,
    total: 10,
    durationMs,
    duration: msToMinSec(durationMs),
    at: new Date().toISOString()
  };

  const fileName = "scores.jsonl";
  const dir = cordova.file.dataDirectory;

  resolveLocalFileSystemURL(
    dir,
    (dirEntry) => {
      dirEntry.getFile(
        fileName,
        { create: true, exclusive: false },
        (fileEntry) => {
          fileEntry.createWriter(
            (writer) => {

              const line = JSON.stringify(payload) + "\n";
              const blob = new Blob([line], { type: "text/plain" });


              fileEntry.file(
                (file) => {
                  try {
                    writer.onwriteend = () => {
                      alert("✅ Score sauvegardé ! Retour à l'accueil …");
                      window.location.href = "index.html";
                    };
                    writer.onerror = (e) => onFsError(e, "Écriture échouée");

                    writer.seek(file.size);
                    writer.write(blob);
                  } catch (e) {
                    onFsError(e, "Erreur pendant l'écriture");
                  }
                },
                (e) => onFsError(e, "Lecture du fichier échouée")
              );
            },
            (e) => onFsError(e, "Création du writer échouée")
          );
        },
        (e) => onFsError(e, "Ouverture/Création du fichier échouée")
      );
    },
    (e) => onFsError(e, "Accès au répertoire dataDirectory échoué")
  );

  function onFsError(err, msg) {
    console.warn(msg, err);
    alert("❌ " + msg);
  }

  function msToMinSec(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
}


// Init commun (web + Cordova)
function onReady() {
  getRandomPokemon();
  document.getElementById("submitBtn").addEventListener("click", checkAnswer);
}


document.addEventListener("deviceready", onReady, false);
document.addEventListener("DOMContentLoaded", () => {
  if (!window.cordova) onReady(); // permet de tester dans le navigateur
});

