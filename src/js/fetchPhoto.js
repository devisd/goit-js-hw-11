const URL = 'https://pixabay.com/api/';
const KEY = '27011698-625c436f56f84acec03c07eda';

function fetchImages(searchName) {
    return fetch(`${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch='true'&page=1&per_page=40`)
        .then(response => response.json())
        // .then(res => res.hint)
}

export default { fetchImages };

// Exsample: https://pixabay.com/api/?key=27011698-625c436f56f84acec03c07eda&q=yellow+flowers&image_type=photo
// ==========================================================================================================

// Список параметров строки запроса которые тебе обязательно необходимо указать:
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

// ==========================================================================================================

// Пагинация
// Pixabay API поддерживает пагинацию и предоставляет параметры page и per_page. Сделай так, чтобы в каждом ответе приходило 40 объектов (по умолчанию 20).

// Изначально значение параметра page должно быть 1.
// При каждом последующем запросе, его необходимо увеличить на 1.
// При поиске по новому ключевому слову значение page надо вернуть в исходное, так как будет пагинация по новой коллекции изображений.

// ==========================================================================================================

     // Optionally the request above could also be done as
// axios.get(`${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`, {
//     params: {
//       key: 'KEY'
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });