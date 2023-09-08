const movieForm = document.getElementById('movie-form');
const movieList = document.getElementById('movie-list');
let movies = [];

movieForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('movie-title').value;
    const director = document.getElementById('movie-director').value;
    const releaseDate = document.getElementById('movie-release-date').value;
    const rating = parseInt(document.getElementById('movie-rating').value);
    const genre = document.getElementById('movie-genre').value;

    if (
        title.trim() === '' ||
        director.trim() === '' ||
        releaseDate.trim() === '' ||
        isNaN(rating) ||
        rating < 1 ||
        rating > 5 ||
        genre.trim() === ''
    ) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const movie = { title, director, releaseDate, rating, genre };
    movies.push(movie);
    addMovieToDOM(movie);

    movieForm.reset();
});

function addMovieToDOM(movie) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');
    movieItem.innerHTML = `
        <span>${movie.title}</span>
        <span>${movie.director}</span>
        <span>${movie.releaseDate}</span>
        <span>${movie.genre}</span>
        <div class="stars">
            ${getStarIcons(movie.rating)}
        </div>
        <button class="edit-button"><i class="fas fa-edit"></i></button>
        <button class="delete-button"><i class="fas fa-trash"></i></button>
    `;
    movieList.appendChild(movieItem);

    const editButton = movieItem.querySelector('.edit-button');
    const deleteButton = movieItem.querySelector('.delete-button');
    
    editButton.addEventListener('click', function () {
        editMovie(movie);
    });

    deleteButton.addEventListener('click', function () {
        deleteMovie(movie);
        movieItem.remove();
    });
}

function editMovie(movie) {
    // Solicite ao usuário as novas informações do filme
    const newTitle = prompt('Novo título:', movie.title);
    const newDirector = prompt('Novo diretor:', movie.director);
    const newReleaseDate = prompt('Nova data de lançamento:', movie.releaseDate);
    const newRating = parseInt(prompt('Nova classificação (1-5):', movie.rating));
    const newGenre = prompt('Novo gênero:', movie.genre);

    // Verifique se o usuário não cancelou a edição
    if (newTitle !== null && newDirector !== null && newReleaseDate !== null && !isNaN(newRating) && newGenre !== null) {
        // Atualize os detalhes do filme
        movie.title = newTitle;
        movie.director = newDirector;
        movie.releaseDate = newReleaseDate;
        movie.rating = newRating;
        movie.genre = newGenre;

        // Atualize os elementos DOM com os novos detalhes
        const movieItem = movieList.querySelector('.movie');
        movieItem.innerHTML = `
            <span>${movie.title}</span>
            <span>${movie.director}</span>
            <span>${movie.releaseDate}</span>
            <span>${movie.genre}</span>
            <div class="stars">
                ${getStarIcons(movie.rating)}
            </div>
            <button class="edit-button"><i class="fas fa-edit"></i></button>
            <button class="delete-button"><i class="fas fa-trash"></i></button>
        `;
    }
}

function deleteMovie(movieToDelete) {
    movies = movies.filter(movie => movie !== movieToDelete);
}

function getStarIcons(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? 'star-filled' : 'star-empty';
        stars += `<span class="star ${starClass}">&#9733;</span>`;
    }
    return stars;
}