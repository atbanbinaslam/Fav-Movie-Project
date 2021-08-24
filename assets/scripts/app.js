const addMovieBtn = document.getElementById('add-movie-btn');
const addmodal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelBtn = document.querySelector('body button');
const addBtn = document.querySelector('.btn--success');
const inputValues = addmodal.querySelectorAll('input');
const noneEntrydisplay = document.getElementById('entry-text');
const deleteModal = document.getElementById('delete-modal');

const movies = [];

// let someval = true;

// // const toggleMovieModal = () => {
// //     let sod;
// //     if (addmodal.className = 'modal' && someval === true) {
// //        sod = addmodal.className = 'modal visible';
// //        someval = false;
// //     } else if(someval === false) {
// //        sod = addmodal.className = 'modal';
// //        console.log('it reached!');
// //        someval = true;
// //     }
// // };

const clearUI = () => {
    if (movies.length === 0) {
        noneEntrydisplay.style.display = 'block';
    } else {
        noneEntrydisplay.style.display = 'none';
    }
};

const deletionModal = (newMovieID) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.movieID === newMovieID){
        break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const unorderedlist = document.getElementById('movie-list');
    unorderedlist.children[movieIndex].remove();
};

const cancelDeleteModal = () => {
    deleteModal.classList.toggle('visible');
    togglebackdrop();
};

const deletionFuction = (newMovieID) => {
    deleteModal.classList.toggle('visible');
    togglebackdrop();
    const confirm = deleteModal.lastElementChild.firstElementChild;
    deleteModal.addEventListener('click', cancelDeleteModal);
    deleteModal.addEventListener('click', deletionModal.bind(null, newMovieID));
};

const newMovieEntryDisplay = (ID, newMovieTile, newMovieImg, newMovieRaing) => {
    const movieEntryDisplay = document.createElement('li');
    movieEntryDisplay.className = 'movie-element';
    movieEntryDisplay.innerHTML = `
    <div class="movie-element__image">
    <img src="${newMovieImg}" alt="${newMovieTile}">
    </div>
    <div class="movie-element__info">
    <h2>${newMovieTile}</h2>
    <p>${newMovieRaing}/5 stars</p>
    </div>
    `;
    const unorderedlist = document.getElementById('movie-list');
    unorderedlist.append(movieEntryDisplay);
    movieEntryDisplay.addEventListener('click', deletionFuction.bind(null, ID));
};

const addBtnEvent = () => {
    const inputTitle = inputValues[0].value;
    const inputImageURL = inputValues[1].value;
    const inputRating = inputValues[2].value;

    if (inputTitle.trim() === '' || inputImageURL.trim() === '' || inputRating.trim() === '' || +inputRating < 0 || +inputRating > 5) {
        alert('enter valid input');
        return;
    }

    let moviesObject = { movieID: Math.random(), movieTitle: inputTitle, movieImageURL: inputImageURL, movieRating: inputRating };
    movies.push(moviesObject);
    console.log(movies);
    toggleMovieModal();
    newMovieEntryDisplay(moviesObject.movieID, moviesObject.movieTitle, moviesObject.movieImageURL, moviesObject.movieRating);
    clearUI();
};

const clearMovieInputs = () => {
    for (const inputs of inputValues) {
        inputs.value = '';
    }
};

const cancelBtnEvent = () => {
    addmodal.classList.toggle('visible');
    togglebackdrop();
};

const togglebackdrop = () => {
    backdrop.classList.toggle('visible');
    clearMovieInputs();
};

const toggleMovieModal = () => {
    addmodal.classList.toggle('visible');
    togglebackdrop();
};

addMovieBtn.addEventListener('click', toggleMovieModal);
cancelBtn.addEventListener('click', cancelBtnEvent);
addBtn.addEventListener('click', addBtnEvent);
backdrop.addEventListener('click', cancelBtnEvent);