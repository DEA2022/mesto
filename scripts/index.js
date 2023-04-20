import {initialCards} from './constants.js';
import Card from './Card.js';

const popupElements = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');
const popupViewImg = document.querySelector('.popup_type_image');
const viewImgElement = popupViewImg.querySelector('.popup__img');
const captionElement = popupViewImg.querySelector('.popup__caption');

// Кнопки закрытия попапа
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close_el_profile');
const buttonClosePopupAddCard = document.querySelector('.popup__close_add_img');
const buttonClosePopupViewImg = popupViewImg.querySelector('.popup__close_el_pic');

// Кнопки открытия попапа
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
const buttonOpenPopupAddCard = document.querySelector('.profile__button');

// Формы в попапах и поля форм
const formEditProfileElement = popupEditProfile.querySelector('.form');
const formElementAddCard = popupAddCard.querySelector('.form');
const nameInput = formEditProfileElement.querySelector('.form__field_el_name');
const jobInput = formEditProfileElement.querySelector('.form__field_el_job');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.photo__grid');
const cardTemplate = document.querySelector('.card').content;

const cardNameField = formElementAddCard.querySelector('.form__field_el_place');
const cardSrcField = formElementAddCard.querySelector('.form__field_el_webcite');

// переменные для переключения кнопок при ошибках
const buttonSubmitFormEditProfileElement = formEditProfileElement.querySelector('.form__submit');
const inputsFormEditProfileElement = formEditProfileElement.querySelectorAll('.form__field');

const buttonSubmitFormElementAddCard = formElementAddCard.querySelector('.form__submit');
const inputsFormElementAddCard = formElementAddCard.querySelectorAll('.form__field');

const createCard = () => {
  const card = new Card(cardTemplate);
  const cardElement = card.createCardElement();
  return cardElement;
}

// Добавление карточки в DOM
const addCard = function (cardElement) {
  cardsContainer.append(createCard(cardElement));
};

// Добавление массива карточек
initialCards.forEach(function (item) {
  const card = new Card(cardTemplate);

  card.addCallbackOnClickPhotoCard(function() {
    viewImgElement.src = item.link;
    viewImgElement.alt = item.name;
    captionElement.textContent = item.name;

    openPopup(popupViewImg);
  });

  cardsContainer.append(card.createCardElement(item));
});

// Общая функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEsc);
};

// Общая функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEsc);
};

// Функция закрытия попапа по клику на оверлей
const closePopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target) {
    closePopup(event.currentTarget);
  }
}

// Функция закрытия попапа по клику на esc
const closePopupByClickEsc = function (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Сабмит на отправку формы
const submitEditProfileForm = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Сабмит на добавление новой карточки
const submitAddNewCardForm = function (evt) {
  evt.preventDefault();
  const card = new Card(cardTemplate);
  card.addCallbackOnClickPhotoCard(function() {
    viewImgElement.src = cardSrcField.value;
    viewImgElement.alt = cardNameField.value;
    captionElement.textContent = cardNameField.value;

    openPopup(popupViewImg);
  });
  cardsContainer.prepend(card.createCardElement({name: cardNameField.value, link: cardSrcField.value}));
  closePopup(popupAddCard);
};

buttonOpenPopupEditProfile.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  clearInputErrors(formEditProfileElement, validationObject);
  toggleButtonState(inputsFormEditProfileElement, buttonSubmitFormEditProfileElement, validationObject);
  openPopup(popupEditProfile);
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  formElementAddCard.reset();
  clearInputErrors(formElementAddCard, validationObject);
  toggleButtonState(inputsFormElementAddCard, buttonSubmitFormElementAddCard, validationObject);
  openPopup(popupAddCard);
});

// функция назначающая слушатели закрытия попапа нажатием на крестик
const hangEventListenersForClosePopup = (button, popup) => {
  button.addEventListener('click', function () {
    closePopup(popup);
  });
}

hangEventListenersForClosePopup(buttonClosePopupEditProfile, popupEditProfile);
hangEventListenersForClosePopup(buttonClosePopupAddCard, popupAddCard);
hangEventListenersForClosePopup(buttonClosePopupViewImg, popupViewImg);

// функция назначающая слушатели закрытия попапа нажатием на оверлей
const hangEventListenersForClosePopupByOverlay = (popup) => {
  popup.addEventListener('click', closePopupByClickOverlay);
};

hangEventListenersForClosePopupByOverlay(popupEditProfile);
hangEventListenersForClosePopupByOverlay(popupAddCard);
hangEventListenersForClosePopupByOverlay(popupViewImg);

formEditProfileElement.addEventListener('submit', submitEditProfileForm);

formElementAddCard.addEventListener('submit', submitAddNewCardForm);
