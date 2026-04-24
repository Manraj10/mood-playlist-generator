const energyInput = document.getElementById("energy");
const energyLabel = document.getElementById("energy-label");
const playlistForm = document.getElementById("playlist-form");
const playlistName = document.getElementById("playlist-name");
const playlistDescription = document.getElementById("playlist-description");
const playlistTraits = document.getElementById("playlist-traits");
const historyList = document.getElementById("history-list");

const energyLabels = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

const recommendations = {
  focused: {
    low: {
      name: "Deep Work Drift",
      description: "Low-distraction instrumentals for studying, coding, and quiet focus.",
      traits: ["instrumental beats", "steady tempo", "minimal vocals"],
    },
    high: {
      name: "Locked In",
      description: "Sharper, driving tracks for active problem solving and momentum.",
      traits: ["upbeat electronic", "clean rhythm", "motivating energy"],
    },
  },
  happy: {
    low: {
      name: "Sunny Slowdown",
      description: "Warm, uplifting songs for a relaxed but positive mood.",
      traits: ["acoustic pop", "light grooves", "feel-good melodies"],
    },
    high: {
      name: "Main Character Energy",
      description: "Confident, bright tracks for walking in with momentum.",
      traits: ["dance pop", "high tempo", "bold hooks"],
    },
  },
  calm: {
    low: {
      name: "Quiet Reset",
      description: "Soft tracks for unwinding, journaling, or a slow evening.",
      traits: ["ambient textures", "soft piano", "gentle vocals"],
    },
    high: {
      name: "Peace With Motion",
      description: "Balanced songs for staying centered while still moving forward.",
      traits: ["indie pop", "smooth percussion", "clear melodies"],
    },
  },
  sad: {
    low: {
      name: "Reflect and Recharge",
      description: "Gentle songs for processing emotions without feeling heavy.",
      traits: ["emotional lyricism", "softer production", "comforting pace"],
    },
    high: {
      name: "Turn the Corner",
      description: "Tracks that start reflective and lean toward hopeful energy.",
      traits: ["cinematic build", "hopeful tone", "rising momentum"],
    },
  },
  confident: {
    low: {
      name: "Cool Control",
      description: "Smooth songs that feel composed, polished, and self-assured.",
      traits: ["alt R&B", "steady bass", "clean delivery"],
    },
    high: {
      name: "Victory Lap",
      description: "Bold, high-energy tracks for competing, presenting, or showing up strong.",
      traits: ["anthem feel", "high confidence", "strong rhythm"],
    },
  },
};

function updateEnergyLabel() {
  energyLabel.textContent = `Energy: ${energyLabels[energyInput.value]}`;
}

function renderRecommendation(mood, energyValue) {
  const band = Number(energyValue) >= 4 ? "high" : "low";
  const recommendation = recommendations[mood][band];

  playlistName.textContent = recommendation.name;
  playlistDescription.textContent = recommendation.description;
  playlistTraits.innerHTML = recommendation.traits
    .map((trait) => `<li>${trait}</li>`)
    .join("");

  saveHistory({
    mood,
    energy: energyLabels[energyValue],
    playlist: recommendation.name,
  });
  renderHistory();
}

function getHistory() {
  return JSON.parse(localStorage.getItem("playlist-history") || "[]");
}

function saveHistory(entry) {
  const nextHistory = [entry, ...getHistory()].slice(0, 5);
  localStorage.setItem("playlist-history", JSON.stringify(nextHistory));
}

function renderHistory() {
  const items = getHistory();
  historyList.innerHTML = items
    .map(
      (item) =>
        `<li><strong>${item.playlist}</strong> for a ${item.energy.toLowerCase()}-energy ${item.mood} mood</li>`
    )
    .join("");
}

energyInput.addEventListener("input", updateEnergyLabel);

playlistForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const mood = new FormData(playlistForm).get("mood");
  renderRecommendation(mood, energyInput.value);
});

updateEnergyLabel();
renderHistory();
