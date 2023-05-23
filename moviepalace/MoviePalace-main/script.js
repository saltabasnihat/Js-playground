// References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let lastSearched = document.getElementById("last-searched");

// Save the user's last searched movie to localStorage
let saveLastSearchedMovie = () => {
  let movieName = movieNameRef.value;
  localStorage.setItem("lastSearchedMovie", movieName);
};

// Retrieve the user's last searched movie from localStorage and show it when the page loads
let loadLastSearchedMovie = () => {
  let lastSearchedMovie = localStorage.getItem("lastSearchedMovie");
  if (lastSearchedMovie) {
    movieNameRef.value = lastSearchedMovie;
    lastSearched.innerHTML = `<h4>Last searched movie: ${lastSearchedMovie}</h4>`;
  } else {
    lastSearched.innerHTML = '';
  }
};

// Save rented movie to localStorage
let saveRentedMovie = (movieData) => {
  let rentedMovies = JSON.parse(localStorage.getItem("rentedMovies")) || [];
  rentedMovies.push(movieData);
  localStorage.setItem("rentedMovies", JSON.stringify(rentedMovies));
};


// API function fetch
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Type your dream movie</h3>`;
  }
  // If input field is NOT empty
  else {
    saveLastSearchedMovie();
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            <h3>Awards:</h3>
            <p>${data.Awards}</p>

            <button id="rent-btn">Rent This Movie</button>
          `;
          let rentBtn = document.getElementById("rent-btn");
          rentBtn.addEventListener("click", () => {
            saveRentedMovie(data);
            alert("You have successfully rented the movie! Please wait till you receive email confirmation");
          });

        }
        // If movie does NOT exist in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      // If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error</h3>`;
      });
  }
};

// Event listeners
searchBtn.addEventListener("click", getMovie);
movieNameRef.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getMovie();
  }
});
window.addEventListener("load", () => {
  loadLastSearchedMovie();
  getMovie();
});

