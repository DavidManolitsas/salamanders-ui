function getGame(id) {
  let URL = "https://video-game-ms.herokuapp.com/api/game/" + id;
  let request = new XMLHttpRequest();
  request.open("GET", URL);
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status == 200) {
      var json = JSON.parse(request.response);
      console.log(json);
      console.log(json.releaseYear);

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

      const gameCard = document.createElement("game-card");
      gameCard.classList.add("game-card");
      gameCard.innerHTML = content;
      document.getElementById(`goty-${json.releaseYear}`).appendChild(gameCard);
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
    }
  };
}
