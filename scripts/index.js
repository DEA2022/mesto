const popupElement = document.querySelector('.popup');
const popupOpenBtnElement = document.querySelector('.profile__edit');
const popupOpenForAddImgBtnElement = document.querySelector('.profile__button');
const popupCloseBtnElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__field_el_name');
let jobInput = formElement.querySelector('.form__field_el_job');
let nameInputNewValue = document.querySelector('.profile__title');
let jobInputNewValue = document.querySelector('.profile__subtitle');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'зеленые горы Архыза'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'река со снежными берегами'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'типовые многоэтажки'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'гора на фоне поля'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'железная дорога'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'берега Байкала'
  }
];

const cardTemplate = document.querySelector('.card').content;
const photoCard = document.querySelector('.photo__grid');

initialCards.forEach(function(item) {
  const cardElement = cardTemplate.querySelector('.photo__card').cloneNode(true);
  cardElement.querySelector('.photo__item').src = item.link;
  cardElement.querySelector('.photo__item').alt = item.alt;
  cardElement.querySelector('.photo__name').textContent = item.name;

  photoCard.append(cardElement);
});

const openPopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  jobInput.value = jobInputNewValue.textContent;
  popupElement.classList.add('popup_opened');
};

const openPopupForAddImg = function () {

  popupElement.classList.add('popup_opened');
};



const closePopup = function () {
  popupElement.classList.remove('popup_opened');

};

const closePopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target) {
    closePopup();
  }
}

popupOpenBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

popupOpenForAddImgBtnElement.addEventListener('click', openPopup);

const handleFormSubmit = function (evt) {
  evt.preventDefault();

  nameInputNewValue.textContent = nameInput.value;
  jobInputNewValue.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);


