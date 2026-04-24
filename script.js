const energyInput = document.getElementById("energy");
const energyLabel = document.getElementById("energy-label");
const playlistForm = document.getElementById("playlist-form");
const playlistName = document.getElementById("playlist-name");
const playlistDescription = document.getElementById("playlist-description");
const playlistTraits = document.getElementById("playlist-traits");
const tracksEl = document.getElementById("tracks");
const statusEl = document.getElementById("status");

const energyLabels = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

const moodProfiles = {
  focused: {
    low: {
      name: "Deep Work Drift",
      description: "Instrumental, low-distraction songs for studying, coding, or long focus sessions.",
      traits: ["instrumental", "steady tempo", "minimal vocal distraction"],
      query: "instrumental focus beats",
    },
    high: {
      name: "Locked In",
      description: "Sharper, driving songs for active problem solving and high-momentum work blocks.",
      traits: ["driving rhythm", "clean energy", "upbeat focus"],
      query: "electronic productivity music",
    },
  },
  happy: {
    low: {
      name: "Sunny Slowdown",
      description: "Warm, uplifting tracks with a lighter pace.",
      traits: ["feel-good melodies", "easy listening", "warm tone"],
      query: "feel good acoustic pop",
    },
    high: {
      name: "Main Character Energy",
      description: "Big, bright songs that feel bold and confident.",
      traits: ["anthem energy", "danceable", "bright hooks"],
      query: "dance pop confidence songs",
    },
  },
  calm: {
    low: {
      name: "Quiet Reset",
      description: "Soft songs for journaling, unwinding, or resetting your head.",
      traits: ["ambient", "soft vocals", "gentle pace"],
      query: "ambient calm songs",
    },
    high: {
      name: "Peace With Motion",
      description: "Balanced songs that stay grounded without feeling flat.",
      traits: ["steady movement", "smooth production", "clean melodies"],
      query: "indie pop chill upbeat",
    },
  },
  sad: {
    low: {
      name: "Reflect and Recharge",
      description: "Thoughtful tracks for reflective moods without going fully heavy.",
      traits: ["emotional lyricism", "comforting pace", "soft texture"],
      query: "reflective indie songs",
    },
    high: {
      name: "Turn the Corner",
      description: "Songs that start reflective and lean toward hopeful energy.",
      traits: ["cinematic build", "hopeful tone", "rising momentum"],
      query: "hopeful alternative songs",
    },
  },
  confident: {
    low: {
      name: "Cool Control",
      description: "Composed, polished songs with steady confidence.",
      traits: ["smooth bass", "cool delivery", "low-key confidence"],
      query: "alt rnb confidence songs",
    },
    high: {
      name: "Victory Lap",
      description: "Big songs for competing, presenting, or showing up strong.",
      traits: ["anthem feel", "high confidence", "strong rhythm"],
      query: "hype songs confidence",
    },
  },
};

function updateEnergyLabel() {
  energyLabel.textContent = `Energy: ${energyLabels[energyInput.value]}`;
}

async function fetchTracks(query) {
  const url = new URL("https://itunes.apple.com/search");
  url.searchParams.set("term", query);
  url.searchParams.set("media", "music");
  url.searchParams.set("entity", "song");
  url.searchParams.set("limit", "8");
  url.searchParams.set("country", "us");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not reach the music catalog.");
  }
  const data = await response.json();
  return data.results || [];
}

function renderTracks(tracks) {
  if (!tracks.length) {
    tracksEl.innerHTML = "<p>No tracks found for that mood profile.</p>";
    return;
  }

  tracksEl.innerHTML = tracks
    .map(
      (track) => `
        <article class="track-card">
          <img src="${track.artworkUrl100 || ""}" alt="${track.trackName}" />
          <div class="track-copy">
            <h3>${track.trackName}</h3>
            <p>${track.artistName}<br />${track.collectionName || ""}</p>
            <a href="${track.trackViewUrl}" target="_blank" rel="noreferrer">View in iTunes</a>
          </div>
        </article>
      `
    )
    .join("");
}

async function renderRecommendation(mood, energyValue, customQuery) {
  const band = Number(energyValue) >= 4 ? "high" : "low";
  const recommendation = moodProfiles[mood][band];
  const query = customQuery ? `${recommendation.query} ${customQuery}` : recommendation.query;

  playlistName.textContent = recommendation.name;
  playlistDescription.textContent = `${recommendation.description} Live query: "${query}".`;
  playlistTraits.innerHTML = recommendation.traits.map((trait) => `<li>${trait}</li>`).join("");
  statusEl.textContent = "Loading live results from iTunes Search API...";
  tracksEl.innerHTML = "";

  try {
    const tracks = await fetchTracks(query);
    renderTracks(tracks);
    statusEl.textContent = `Loaded ${tracks.length} songs from the live catalog.`;
  } catch (error) {
    statusEl.textContent = error.message;
  }
}

energyInput.addEventListener("input", updateEnergyLabel);

playlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(playlistForm);
  await renderRecommendation(
    formData.get("mood"),
    energyInput.value,
    formData.get("customQuery").trim()
  );
});

updateEnergyLabel();
