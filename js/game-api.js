function getGame(id) {
  let URL = "https://video-game-ms.herokuapp.com/api/game/" + id;
  let request = new XMLHttpRequest();
  request.open("GET", URL);
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      let json = JSON.parse(request.response);

      const content = `
            <section class="game-header">
                <h3>Game of the Year ${json.releaseYear}</h3>
                <img src=${json.imageUrl} alt="${json.name} banner">
            </section>
            <section class="game-info">
                <h4>${json.name}</h4>
                <ul>
                    <li><b>Developer:</b> ${json.developer}</li>
                    <li><b>Publisher:</b> ${json.publisher}</li>
                    <li><b>Open Critic Score:</b> ${json.score}</li>
                </ul>
                <p>${json.description}</p>
            </section>
            `;

      const gameCard = document.createElement("section");
      gameCard.classList.add("game-card-big");
      gameCard.innerHTML = content;
      document.getElementById(`goty-${json.releaseYear}`).appendChild(gameCard);
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
    }
  };
}

function getRecentReleases() {
  let URL = "https://video-game-ms.herokuapp.com/api/game/recent-releases";
  let request = new XMLHttpRequest();
  let json;
  request.open("GET", URL);
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      json = JSON.parse(request.response);
      console.log(json);

      let len = json.length;

      if (len > 6) {
        len = 6;
      }

      for (var i = 0; i < len; i++) {
        var game = json[i];
        const recent_games_content = `
                    <section class="game-card">
                        <img src="${game.verticalImageUrl}" alt="${game.name} banner">
                        <section class="game-card-info">
                            <h3>${game.name}</h3>
                            <ul>
                                <li><b>Release:</b> ${game.releaseDate}</li>
                                <li><b>Developer:</b> ${game.developer}</li>
                                <li><b>Publisher:</b> ${game.publisher}</li>
                                <li><b>Open Critic Score:</b> ${game.score}</li>
                            </ul>
                        </section>
                    </section>
        `;

        const recentRelease = document.createElement("section");
        recentRelease.classList.add("recent-release");
        recentRelease.innerHTML = recent_games_content;
        document.querySelector(".recent-releases-grid").append(recentRelease);
      }
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
    }
  };
}

function getUpcomingReleases() {
  let URL = "https://video-game-ms.herokuapp.com/api/game/coming-soon";
  let request = new XMLHttpRequest();
  let json;
  request.open("GET", URL);
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      json = JSON.parse(request.response);
      console.log(json);

      let len = json.length;

      if (len > 3) {
        len = 3;
      }

      for (var i = 0; i < len; i++) {
        var game = json[i];
        const recent_games_content = `
                    <section class="game-card">
                        <img src="${game.verticalImageUrl}" alt="${game.name} banner">
                        <section class="game-card-info">
                            <h3>${game.name}</h3>
                            <ul>
                                <li><b>Release:</b> ${game.releaseDate}</li>
                                <li><b>Developer:</b> ${game.developer}</li>
                                <li><b>Publisher:</b> ${game.publisher}</li>
                            </ul>
                        </section>
                    </section>
        `;

        const recentRelease = document.createElement("section");
        recentRelease.classList.add("coming-soon");
        recentRelease.innerHTML = recent_games_content;
        document.querySelector(".coming-soon-grid").append(recentRelease);
      }
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
    }
  };
}
