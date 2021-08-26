const addMovieBtn = document.getElementById('add-movie-btn');
const addmodal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelBtn = document.querySelector('body button');
const addBtn = document.querySelector('.btn--success');
const inputValues = addmodal.querySelectorAll('input');
const noneEntrydisplay = document.getElementById('entry-text');
const deleteModal = document.getElementById('delete-modal');

const movies = [];

const inputTitle = inputValues[0].value;
const inputImageURL = inputValues[1].value;
const inputRating = inputValues[2].value;
let moviesObject;
moviesObject = { id: (Math.random() * 100000).toFixed(0), movieTitle: inputTitle, movieImageURL: inputImageURL, movieRating: inputRating };
const moviesObjectId = moviesObject.id;

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

const deletionFunction = (moviesObjectId) => {
    let movieIndex = -1;
    for (const movie of movies) {
        if (movie.id === moviesObjectId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    deleteModal.classList.toggle('visible');
    togglebackdrop();
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
};

const deletionFuction = () => {
    deleteModal.classList.toggle('visible');
    togglebackdrop();
    const cancel = deleteModal.lastElementChild.firstElementChild;
    cancel.addEventListener('click', cancelDeleteModal);
    const confirm = deleteModal.lastElementChild.lastElementChild;
    confirm.addEventListener('click', deletionFunction);
}


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
    movieEntryDisplay.addEventListener('click', deletionFuction);
    const unorderedlist = document.getElementById('movie-list');
    unorderedlist.append(movieEntryDisplay);
};

const addBtnEvent = () => {


    // if (inputTitle.trim() === '' || inputImageURL.trim() === '' || inputRating.trim() === '' || +inputRating < 0 || +inputRating > 5) {
    //     alert('enter valid input');
    //     return;
    // }

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