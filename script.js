document.addEventListener('DOMContentLoaded', () => {
    const moviesGrid = document.getElementById('movies-grid');
    const featuredMovie = document.getElementById('featured-movie');
    const searchInput = document.getElementById('search');

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:3000/movies');
            const movies = await response.json();
            renderFeaturedMovie(movies[0]);
            renderMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const renderFeaturedMovie = (movie) => {
        featuredMovie.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="details">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                <button>Buy Tickets</button>
            </div>
        `;
    };

    const renderMovies = (movies) => {
        moviesGrid.innerHTML = movies.map(movie => `
            <div class="movie-item">
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button data-id="${movie.id}">Buy Tickets</button>
            </div>
        `).join('');
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const movieItems = document.querySelectorAll('.movie-item');

        movieItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = title.includes(searchTerm) ? '' : 'none';
        });
    });

    fetchMovies();
});
