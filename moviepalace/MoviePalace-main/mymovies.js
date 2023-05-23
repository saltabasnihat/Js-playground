let rentedMoviesDiv = document.getElementById("rented-movies");

let loadRentedMovies = () => {
  let rentedMovies = JSON.parse(localStorage.getItem("rentedMovies")) || [];
  if (rentedMovies.length === 0) {
    rentedMoviesDiv.innerHTML = `<h3>No rented movies found.</h3> `;
  } else {
    rentedMoviesDiv.innerHTML = rentedMovies.map(movie => `
      <div class="movie">
        <h3>${movie.Title}</h3>
        <img src=${movie.Poster} class="poster">
      </div>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", loadRentedMovies);
