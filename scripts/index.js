import { initialCards } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const formEditProfile = popupEditProfile.querySelector('.form');
const formAddCard = popupAddCard.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__field_el_name');
const jobInput = formEditProfile.querySelector('.form__field_el_job');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.photo__grid');
const cardTemplate = document.querySelector('.card').content;

const cardNameField = formAddCard.querySelector('.form__field_el_place');
const cardSrcField = formAddCard.querySelector('.form__field_el_webcite');

const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error-line',
  errorClass: 'form__error_active'
}

// создаем экземпляр валидатора формы профиля
const formEditProfileValidator = new FormValidator(validationObject, formEditProfile);
formEditProfileValidator.enableValidation();

// создаем экземпляр валидатора формы для добавления карточки
const formAddCardValidator = new FormValidator(validationObject, formAddCard);
formAddCardValidator.enableValidation();

// Добавление массива карточек
initialCards.forEach(function (item) {
  const onClickPhotoCard = () => {
    viewImgElement.src = item.link;
    viewImgElement.alt = item.name;
    captionElement.textContent = item.name;

    openPopup(popupViewImg);
  }

  const card = new Card(cardTemplate, item, onClickPhotoCard);

  cardsContainer.append(card.createCardElement());
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

  const cardData = {
    name: cardNameField.value,
    link: cardSrcField.value
  }

  const onClickPhotoCard = () => {
    viewImgElement.src = cardSrcField.value;
    viewImgElement.alt = cardNameField.value;
    captionElement.textContent = cardNameField.value;
    openPopup(popupViewImg);
  }

  const card = new Card(cardTemplate, cardData, onClickPhotoCard);

  cardsContainer.prepend(card.createCardElement());

  closePopup(popupAddCard);
};

buttonOpenPopupEditProfile.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;

  formEditProfileValidator.clearInputErrors();

  openPopup(popupEditProfile);
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  formAddCard.reset();
  formAddCardValidator.clearInputErrors();

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

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', submitAddNewCardForm);
