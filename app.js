let search = document.querySelector("#search");

Search.addEventListener("keyup", (e) => {
    let searchText = e.target.value;
    searchMovies(searchText);
    //when key press hide form text and h1
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";

    Search.classList.add("afterKeyPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
});

//speech Recognition api
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
    window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
   let recognition = new SpeechRecognition();
   let p = document.createElement("p");
   recognition.interimResults = true;

   recognition.addEventListener("result", (e) => {
       let transcript = [...e.result]
       .map((result) => result[0])
       .map((result) => result.transcript)
       .join("");
       console.log(transcript);
   });

   recognition.start();
});


function searchMovies(searchText) {
   // console.log(searchText);
    const imdbAPi = `http://www.omdbapi.com/?s=${searchText}&apikey=8ea9e1b4`;
   
    window
       .fetch(imdbAPi)
       .then((data) => {
           data
           .json()
           .then ((movieData) => {
           let movies = movieData.Search;
           let output = [];
           for (let movie of movies) {

               let defaultImg =
               movie.Poster === "N/A"
               ? "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
               : movie.Poster;
            // console.log(movie);
               output +=`
               <div>
               <img src="${movie.Poster}" />
               <h1>${movie.Title}</h1>
               <p>${movie.Year}</p>

               <a href="http://www.imdb.com/title/${movie.imdbID}/" target= "_blank"$apikey=8ea9e1b4>Movie Detail</a>

               </div> `;

           }

           document.querySelector("#template").innerHTML = output;
       })
        .catch((err) => console.log(err));
       })
    .catch((err) => console.log(err));
}