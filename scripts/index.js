import { initialCards } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');
const popupViewImg = document.querySelector('.popup_type_image');
const viewImgElement = popupViewImg.querySelector('.popup__img');
const captionElement = popupViewImg.querySelector('.popup__caption');

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

// экземпляры попапов
const instancePopupEditProfile = new Popup(popupEditProfile);
const instancePopupAddCard = new Popup(popupAddCard);
const instancePopupViewImg = new Popup(popupViewImg);

// создаем экземпляр валидатора формы профиля
const formEditProfileValidator = new FormValidator(validationObject, formEditProfile);
formEditProfileValidator.enableValidation();

// создаем экземпляр валидатора формы для добавления карточки
const formAddCardValidator = new FormValidator(validationObject, formAddCard);
formAddCardValidator.enableValidation();

const onClickPhotoCard = (name, link) => {
  viewImgElement.src = link;
  viewImgElement.alt = name;
  captionElement.textContent = name;

  instancePopupViewImg.openPopup();
}

// Объект для отрисовки карточек
const renderPageData = {
  items: initialCards,
  renderer: (item) => {
    const card = new Card(cardTemplate, item, onClickPhotoCard);
    const cardElement = card.createCardElement();

    return cardElement;
  }
}

// добавление массива карточек
const section = new Section(renderPageData, cardsContainer)
section.rendererElements();

// Сабмит на отправку формы
const submitEditProfileForm = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  instancePopupEditProfile.closePopup(popupEditProfile);
};

// Сабмит на добавление новой карточки
const submitAddNewCardForm = function (evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameField.value,
    link: cardSrcField.value
  }

  section.addItem(cardData);

  instancePopupAddCard.closePopup(popupAddCard);
  instancePopupAddCard.setEventListeners();
}


buttonOpenPopupEditProfile.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;

  formEditProfileValidator.clearInputErrors();

  instancePopupEditProfile.openPopup(popupEditProfile);
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  formAddCard.reset();
  formAddCardValidator.clearInputErrors();

  instancePopupAddCard.openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', submitAddNewCardForm);
