import '../css/styles.css';
import API from './fetchPhoto';

// SimpleLightbox
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// AXIOS
// import axios from "axios";

const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');

form.addEventListener('submit', onInput);

function onInput(e) {
    e.preventDefault();
    if (form.elements.searchQuery.value.length === 1 || form.elements.searchQuery.value.length === 2) {
        return Notify.info("Too many matches found. Please enter a more specific name.");
    }
    onSearch(form.elements.searchQuery.value);
}


function onSearch(e) {
    API.fetchImages(e)
        .then(e.hits)
        .then(markupPhotoList)
        .then(renderGallery)
        .catch(console.log)
}

function markupPhotoList(object) {
    console.log('object ->', object);
    return object.hits.map(({ previewURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
            <img src="${previewURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>`
    ).join('');
}

function renderGallery(markup) {
    galleryList.innerHTML = markup;
}

// const lightbox = new SimpleLightbox('.gallery a', { animationSpeed: 250, loop: true, enableKeyboard: true, preloading: true, docClose: true, captionsData: 'alt'});
// ==========================================================================================================

// В ответе будет массив изображений удовлетворивших критериям параметров запроса. Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

// ==========================================================================================================

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>

// ==========================================================================================================

// После первого запроса при каждом новом поиске выводить уведомление в котором будет написано сколько всего нашли изображений (свойство totalHits).
// Notify.success(`Hooray! We found ${totalHits} images.`);


// Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
// Notify.failure('Sorry, there are no images matching your search query. Please try again.');


// В ответе бэкенд возвращает свойство totalHits - общее количество изображений которые подошли под критерий поиска (для бесплатного аккаунта). Если пользователь дошел до конца коллекции, пряч кнопку и выводи уведомление
// Notify.info('We're sorry, but you've reached the end of search results.');

// ==========================================================================================================

// Прокрутка страницы
// Сделать плавную прокрутку страницы после запроса и отрисовки каждой следующей группы изображений. Вот тебе код подсказка, а разберись в нём самостоятельно.

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

// ==========================================================================================================

// Бесконечный скролл
// Вместо кнопки «Load more» можно сделать бесконечную загрузку изображений при прокрутке страницы. Мы предоставлям тебе полную свободу действий в реализации, можешь использовать любые библиотеки.