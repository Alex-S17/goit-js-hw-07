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
    console.log('return');
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


