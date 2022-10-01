import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

function createGalleryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `;
    })
    .join(''); 
}

let modalWindow;
galleryContainer.addEventListener('click', onPictureClick);

function onPictureClick(event) {
  event.preventDefault();
  
  if (!event.target.classList.contains('gallery__image')) {
    // console.log('return');
    return;
  }
  
  modalWindow = basicLightbox.create(`
  <img src = "${event.target.dataset.source}">
  `);
  modalWindow.show();
  window.addEventListener('keydown', onEscapeClose);
}

function onEscapeClose(event) {

  if (event.key !== 'Escape') {
    // console.log('not Esc');
    return;
  }
  // console.log('This is Esc');
  modalWindow.close();
  window.removeEventListener('keydown', onEscapeClose);

  // ANOTHER SOLUTION for remove keyboard Listener after the ModalWindow was closed:
  // modalWindow.close(() => window.removeEventListener('keydown', onEscapeClose));
}



// Еще одно решение: функция onEscapeClose (закрытие модального окна по Esc и снятие слушателя клавиатуры) 
// объявлена прямо внутри функции onPictureClick. Тогда ссылку modalWindow можно не объявлять в глобальной области видимости 
// без инициализации, а объявить ее непосредствеено в функции onPictureClick в момент инициализации:


// let modalWindow; - снимаем объявление ссылки modalWindow без инициализации.

// galleryContainer.addEventListener('click', onPictureClick);

// function onPictureClick(event) {
//   event.preventDefault();
  
//   if (!event.target.classList.contains('gallery__image')) {
//     return;
//   }
  
  // Объявляем ссылку modalWindow внутри функции onPictureClick непосредствеено в момент ее инициализации:
  // const modalWindow = basicLightbox.create(`
  // <img src = "${event.target.dataset.source}">
  // `);
  // modalWindow.show();
  // window.addEventListener('keydown', onEscapeClose);

// Объявляем функцию onEscapeClose внутри функции onPictureClick:
//   function onEscapeClose(event) {

//   if (event.key !== 'Escape') {
//     return;
//   }
//   modalWindow.close();
//   window.removeEventListener('keydown', onEscapeClose); 
//   }
// }


