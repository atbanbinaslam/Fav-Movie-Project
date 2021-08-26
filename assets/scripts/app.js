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

const deletionModal = (movieID) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieID) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const movieList = document.getElementById('movie-list');
    // console.log(movieID, movieIndex, movies, movieList);
    movieList.children[movieIndex].remove();
    deleteModal.classList.toggle('visible');
    togglebackdrop();
    clearUI();

    // const index = movies.indexOf(movieID.toString());
    // let index = -1;
    // movies.forEach((movie, tempIndex) => {
    //     if (movie.id.toString() === movieID.toString())
    //         index = tempIndex;
    // });
    // movies.splice(index, 1);
    // const movieList = document.getElementById('movie-list');
    // console.log(movieID, index, movies, movieList);
    // movieList.children[index].remove();

};

const cancelDeleteModal = () => {
    deleteModal.classList.toggle('visible');
    togglebackdrop();
    clearUI();
};

const deletionFuction = (newMovieID) => {
    deleteModal.classList.toggle('visible');
    togglebackdrop();
    const cancel = deleteModal.lastElementChild.firstElementChild;
    let confirm = deleteModal.lastElementChild.lastElementChild;
    // console.log(cancel, confirm);
    confirm.replaceWith(confirm.cloneNode(true));
    confirm = deleteModal.lastElementChild.lastElementChild;

    cancel.removeEventListener('click',cancelDeleteModal);

    cancel.addEventListener('click', cancelDeleteModal);
    confirm.addEventListener('click', deletionModal.bind(null, newMovieID));

};

const newMovieEntryDisplay = (id, newMovieTile, newMovieImg, newMovieRaing) => {
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
    movieEntryDisplay.addEventListener('click', deletionFuction.bind(null, id));
    const unorderedlist = document.getElementById('movie-list');
    unorderedlist.append(movieEntryDisplay);
};

const addBtnEvent = () => {
    const inputTitle = inputValues[0].value;
    const inputImageURL = inputValues[1].value;
    const inputRating = inputValues[2].value;

    if (inputTitle.trim() === '' || inputImageURL.trim() === '' || inputRating.trim() === '' || +inputRating < 0 || +inputRating > 5) {
        alert('enter valid input');
        return;
    }

    let moviesObject = { id: (Math.random() * 100000).toFixed(0), movieTitle: inputTitle, movieImageURL: inputImageURL, movieRating: inputRating };
    movies.push(moviesObject);
    console.log(movies);
    toggleMovieModal();
    newMovieEntryDisplay(moviesObject.id, moviesObject.movieTitle, moviesObject.movieImageURL, moviesObject.movieRating);
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