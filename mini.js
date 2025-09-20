console.log("searchAnime() triggered");

async function searchAnime() {
  const animeName = document.getElementById("animeinput").value;

  const result = await fetch(`https://anime-backend-02wn.onrender.com/search?anime=${encodeURIComponent(animeName)}`);
  const data = await result.json();
  const anime = data.results[0];

  if (!anime) {
    document.getElementById("results").innerText = "Anime not found.";
    return;
  }

  document.getElementById("results").innerHTML = `
    <div class="js-div">
      <h2 class="js-heading">${anime.title}</h2>
      <img src="${anime.images.jpg.image_url}" width="150px" class="js-img">
      <p class="js-ep">Episodes: ${anime.episodes}</p>
      <p class="js-sco">Score: ${anime.score}</p>
      <p class="js-status">Status: ${anime.status}</p>
      <p class="js-air">Aired: ${anime.aired.string}</p>
      <p class="js-type">Type: ${anime.type}</p>
      <p class="js-gen">Genre: ${anime.genres.map(genre => genre.name).join(", ")}</p>
      <p class="js-rating">Rating: ${anime.rating}</p>
      <p class="js-url">URL: <a href="${anime.url}" target="_blank">${anime.url}</a></p>
      <p class="js-ep-detail">Synopsis: ${anime.synopsis}</p>
    </div>
  `;

  // Get recommendations
  const animeId = anime.mal_id;
  const recRes = await fetch(`https://anime-backend-02wn.onrender.com/recommendations?animeId=${animeId}`);
  const recData = await recRes.json();

  let recHTML = "<ul class='r-section'>";
  recData.recommendations.forEach(rec => {
    recHTML += `
      <li class="js-list">
        <strong>${rec.entry.title}</strong><br>
        <img src="${rec.entry.images.jpg.image_url}" width="100"><br>
        <a class="r-link" href="https://myanimelist.net/anime/${rec.entry.mal_id}" target="_blank">More Info</a>
      </li>
    `;
  });
  recHTML += "</ul>";
  document.getElementById("results").innerHTML += recHTML;
}
if (typeof $ !== 'undefined' && document.getElementById('animeinput')) {
  $(document).ready(function(){
    $('#animeinput').on('keypress', function(e) {
      if (e.key === 'Enter') {
        searchAnime();
        $("#text-show").show(5);
      }
    });
    $('#searchbtn').on('click',function(){
        $("#text-show").show(5);
      })
    $('.btn').on('click',function(){
      $("html").animate({ 
        scrollTop: $("body").offset().top
      },300);
    }); 
  });
} else {
  console.error("jQuery is not loaded or #animeinput element is missing.");
}



