const popupElement = document.querySelector('.popup');
const popupElementForAddImg = document.querySelector('.popup-img');
const popupOpenBtnElement = document.querySelector('.profile__edit');
const popupOpenForAddImgBtnElement = document.querySelector('.profile__button');
const popupCloseBtnElement = popupElement.querySelector('.popup__close');
const popupCloseForAddImgBtnElement = document.querySelector('.popup__close_add_img');
const formElement = popupElement.querySelector('.form');
const formElementForAddCard = popupElementForAddImg.querySelector('.form');
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

const createNewCard = function (name, link, alt) {
  const cardElement = cardTemplate.querySelector('.photo__card').cloneNode(true);
  cardElement.querySelector('.photo__name').textContent = name;
  cardElement.querySelector('.photo__item').src = link;
  if (alt) {
    cardElement.querySelector('.photo__item').alt = alt;
  }
  //лайк
  cardElement.querySelector('.photo__icon').addEventListener('click', function makeLike(evt) {
    evt.target.classList.toggle('photo__icon_active');
  });
  // удаление элемента

  cardElement.querySelector('.photo__trash').addEventListener('click', function () {
    cardElement.remove();
  });

  photoCard.append(cardElement);

  return cardElement;
};

initialCards.forEach(function (item) {
  const cardElement = createNewCard(item.name, item.link, item.alt);
});

let nameOfCard = photoCard.querySelector('.photo__name');
let srcOfCard = photoCard.querySelector('.photo__item').src;
let nameOfCardField = formElementForAddCard.querySelector('.form__field_el_place');
let srcOfCardField = formElementForAddCard.querySelector('.form__field_el_webcite');

const openPopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  jobInput.value = jobInputNewValue.textContent;
  popupElement.classList.add('popup_opened');
};

const openPopupForAddImg = function () {
  popupElementForAddImg.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

const closePopupForAddImg = function () {
  popupElementForAddImg.classList.remove('popup_opened');
};

const closePopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target) {
    closePopup();
    closePopupForAddImg();
  }
};
//для попапа профиля
popupOpenBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);
//для попапа добавления картинки
popupOpenForAddImgBtnElement.addEventListener('click', openPopupForAddImg);
popupCloseForAddImgBtnElement.addEventListener('click', closePopupForAddImg);
popupElementForAddImg.addEventListener('click', closePopupByClickOverlay);
// сабмит на отправку формы
const handleFormSubmit = function (evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  jobInputNewValue.textContent = jobInput.value;
  closePopup();
};

formElement.addEventListener('submit', handleFormSubmit);

//сабмит на добавление новой карточки
const addNewCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardElement = createNewCard(nameOfCardField.value, srcOfCardField.value);
  photoCard.prepend(cardElement);
  evt.target.reset();
  closePopupForAddImg();
};

formElementForAddCard.addEventListener('submit', addNewCardFormSubmit);
