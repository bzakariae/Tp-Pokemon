// leaderboard.js — lit scores.jsonl, trie et affiche le Top 5
document.addEventListener("deviceready", loadAndRenderLeaderboard, false);
document.addEventListener("DOMContentLoaded", () => { if (!window.cordova) loadAndRenderLeaderboard(); });

function loadAndRenderLeaderboard() {
  const list = document.getElementById("list");
  const info = document.getElementById("info");
  const FILE_NAME = "scores.jsonl";

  const baseDir = (window.cordova && cordova.file && cordova.file.dataDirectory) ? cordova.file.dataDirectory : null;
  if (!baseDir) {
    info && (info.textContent = "Mode navigateur : aucun stockage local.");
    return renderNone(list, "Aucun score disponible (test navigateur).");
  }

  const path = baseDir + FILE_NAME;
  resolveLocalFileSystemURL(path, onEntry, () => renderNone(list, "Fichier de scores introuvable."));

  function onEntry(entry) {
    entry.file(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const items = parseJsonLines(String(reader.result || ""));
        const top5 = sortScores(items).slice(0, 5);
        if (!top5.length) return renderNone(list, "Aucun score pour l’instant.");
        list.innerHTML = top5.map(renderRow).join("");
        info && (info.textContent = path); // utile en debug
      };
      reader.onerror = () => renderNone(list, "Impossible de lire le fichier.");
      reader.readAsText(file);
    }, () => renderNone(list, "Lecture du fichier échouée."));
  }
}

function parseJsonLines(text) {
  const out = [];
  for (const ln of text.split("\n")) {
    if (!ln.trim()) continue;
    try { out.push(JSON.parse(ln)); } catch (_) {}
  }
  return out;
}

// Tri: score desc, durée asc, date desc
function sortScores(arr) {
  return arr.sort((a, b) => {
    const s = (b.score || 0) - (a.score || 0);
    if (s) return s;
    const d = (a.durationMs ?? Infinity) - (b.durationMs ?? Infinity);
    if (d) return d;
    return new Date(b.at || 0) - new Date(a.at || 0);
  });
}

function renderRow(it, idx) {
  const rank = (idx ?? 0) + 1; // idx ignoré ici car on map après slice
  const name = it.name || "Anonyme";
  const score = `${it.score || 0}/10`;
  const dur = it.duration || msToMinSec(it.durationMs || 0);
  const when = it.at ? new Date(it.at).toLocaleString() : "";
  return `
    <div class="card">
      <div><strong>#${rank}</strong> — ${name}</div>
      <div>Score : <strong>${score}</strong> • Temps : ${dur}</div>
      <div class="muted">${when}</div>
    </div>`;
}

function msToMinSec(ms) {
  const s = Math.floor(ms / 1000), m = Math.floor(s / 60), sec = s % 60;
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function renderNone(container, msg) {
  container.innerHTML = `<div class="card">${msg}</div>`;
}
