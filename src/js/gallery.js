// Створи додаток для пошуку зображень по ключовому слову.
// При завантаженні сторінки має відбуватись запит за популярними зображеннями (ключове слово - popular),
// а при введенні якогось слова в форму - пошук відбувається по цьому ключовому слову і сторінка перемальовується.

// Використовуй UnsplashAPI (https://unsplash.com/documentation) для запитів. Створи клас UnsplashAPI для інкапсуляції
// логіки запитів в одному місті в окремому файлі.
// Створи окремо файл createGalleryCard.js, в якому буде функція, що відповідатиме за створення розмітки.
// В головному файлі gallery.js має бути вся логіка роботи застосунку.

// Підключи пагінацію, використовуючи бібліотеку tui-pagination, щоб можна було робити запит за різними сторінками.
// Додай слухача на форму, щоб робити новий запит по ключовому слову (додавши відповідний метод класу UnsplashAPI).
// Додай лоадер під час завантаження даних з бекенда.
// Не забудь про відповідні перевірки і сповіщення при роботі з запитами і з формою.
import Pagination from 'tui-pagination';
import "tui-pagination/dist/tui-pagination.min.css";
import { createGalleryCard } from './createGalleryCard';
import { UnsplashAPI } from './UnsplashAPI';
import iziToast from 'izitoast';

const form = document.querySelector(".js-search-form");
const gallery = document.querySelector(".gallery");

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
    totalItems: 0,
    itemsPerPage: 12,
    visiblePages: 5,
    page: 1,
});

const page = pagination.getCurrentPage();

form.addEventListener("submit", getPhotos);

async function getPhotos(event) {
    event.preventDefault();
    const searchText = event.target.elements.query.value.trim();
    if (searchText === "") {
        iziToast.error({
            message: "Search field must not be empty!",
            position: "topRight",
        })
        return
    }
    api.query = searchText;
    pagination.off('afterMove', renderPhotos);
    pagination.off('afterMove', renderPhotosByQuery);
    try {
        const images = await api.fetchImages(page);
        if (images.results.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your query!",
                position: "topRight",
            });
            return
        }
        gallery.innerHTML = createGalleryCard(images.results);
        pagination.reset(images.total);
        pagination.on('afterMove', renderPhotosByQuery);
    } catch (error) {
        console.log(error);
    }
}

pagination.on('afterMove', renderPhotos);

function renderPhotos(event) {
    const currentPage = event.page;
    api.fetchPopularImages(currentPage).then(data => {
        gallery.innerHTML = createGalleryCard(data.results);
    })
}

function renderPhotosByQuery(event) {
    const currentPage = event.page;
    api.fetchImages(currentPage).then(data => {
        gallery.innerHTML = createGalleryCard(data.results);
    })
}

const api = new UnsplashAPI();
api.fetchPopularImages(page).then(data => {
    gallery.innerHTML = createGalleryCard(data.results);
    pagination.reset(data.total);
 });


