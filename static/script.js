// static/js/script.js

// Function to fetch and render games
async function fetchAndRenderGames() {
  const gamesContainer = document.getElementById("games-container");

  try {
    // Fetch the schedule data from the API
    const response = await fetch("https://********.execute-api.us-east-1.amazonaws.com/Dev/sports");
  // Add you API Gateway URL above in the fetch function
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if games exist in the API response
    if (!data.games || data.games.length === 0) {
      gamesContainer.innerHTML = "<p>No games available at the moment.</p>";
      return;
    }

    // Render the games
    data.games.forEach((game) => {
      // Create a game card
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");

      // Add images and details
      gameCard.innerHTML = `
        <div class="game-details">
          <div class="team">
            <img src="static/images/${game.away_team}.png" alt="${game.away_team}" class="team-logo" />
            <p>${game.away_team}</p>
          </div>
          <div class="vs">VS</div>
          <div class="team">
            <img src="static/images/${game.home_team}.png" alt="${game.home_team}" class="team-logo" />
            <p>${game.home_team}</p>
          </div>
        </div>
        <div class="venue">
          <img src="static/images/${game.venue.replace(/\s+/g, '')}.jpg" alt="${game.venue}" class="venue-image" />
          <p>${game.venue}</p>
          <p>${game.date} at ${game.time}</p>
        </div>
      `;

      gamesContainer.appendChild(gameCard);
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    gamesContainer.innerHTML = `<p>Failed to load schedule. Please try again later.</p>`;
  }
}

// Call the fetchAndRenderGames function on page load
document.addEventListener("DOMContentLoaded", fetchAndRenderGames);