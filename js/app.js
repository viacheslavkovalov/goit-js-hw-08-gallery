const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
// ____________________________________________________________________
const galleryList = document.querySelector('.js-gallery');

const imagesMarkup = createImagesMarkup(galleryItems);

function createImagesMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
            return `
    <li class="gallery__item">
        <a class="gallery__link"
            href="${original}">
        <img class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"/>
        </a>
    </li>
        `
    }).join('');
}
// console.log(createImagesMarkup(galleryItems));
galleryList.innerHTML = imagesMarkup;

// ______________________________________________________
galleryList.addEventListener('click', onGalleryItemCLick)

function onGalleryItemCLick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    };
    originalSizeImageMarkup(event)
    onModalOpen();
    onImageSrcAttributeChange(event);

    

};
    
function originalSizeImageMarkup(event) {
    return event.target.dataset.source;
}

// _________________________________________

const modalRef = document.querySelector('.js-lightbox');

function onModalOpen() {
    window.addEventListener('keydown', onEcsapeKeypress) 
    modalRef.classList.add('is-open');
}
// _______________________________________________________
// const modalContent = document.querySelector('.lightbox__content');
const lightboxImage = document.querySelector('.lightbox__image');

function onImageSrcAttributeChange(event) {
    lightboxImage.src = event.target.dataset.source;
    lightboxImage.alt = event.target.alt
}
// _____________________________________________________________________
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
closeBtnRef.addEventListener('click', onModalClose);

function onModalClose() {
    window.removeEventListener('keydown', onEcsapeKeypress) 
    modalRef.classList.remove('is-open');
    lightboxImage.src = '';
};
// _____________________________________________________________________________

const overlayRef = document.querySelector('.lightbox__overlay');
overlayRef.addEventListener('click', onOverlayClick)

function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
        onModalClose() 
    }
};

// __________________________________________________________________________

function onEcsapeKeypress(event) {
    if (event.code === 'Escape') {
        onModalClose() 
    }
}
// ______________________________________________________

const originalImagesSrcSet = [];

galleryItems.forEach(item => {
    originalImagesSrcSet.push(item.original)
});

document.addEventListener('keydown', event => {
    const currentIndex = originalImagesSrcSet.indexOf(lightboxImage.src);
    if (event.key === 'ArrowLeft') {
        leftClick(currentIndex);
    } else if (event.key === 'ArrowRight') {
        rightClick(currentIndex)
    }
});

function leftClick(currentIndex) {
    let nextIndex = currentIndex - 1;
    if (nextIndex === -1) {
        nextIndex = originalImagesSrcSet.length -1;
    }
    lightboxImage.src = originalImagesSrcSet[nextIndex];
};


function rightClick(currentIndex) {
    let nextIndex = currentIndex + 1;
    if (nextIndex === originalImagesSrcSet.length) {
        nextIndex = 0;
    }
    lightboxImage.src = originalImagesSrcSet[nextIndex];
};


