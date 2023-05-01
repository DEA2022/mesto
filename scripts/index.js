import { initialCards } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');

// Кнопки открытия попапа
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
const buttonOpenPopupAddCard = document.querySelector('.profile__button');

// Формы в попапах и поля форм
const formEditProfile = popupEditProfile.querySelector('.form');
const formAddCard = popupAddCard.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__field_el_name');
const jobInput = formEditProfile.querySelector('.form__field_el_job');

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
// экземпляр класса UserInfo
const instanceUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

// колбэк сабмита на форму изменения профиля
const submitEditProfileForm = ([name, job]) => {
  instanceUserInfo.setUserInfo({ name, job });
  instancePopupEditProfile.closePopup(popupEditProfile);
};

// Экземпляр попапа PopupEditProfile
const instancePopupEditProfile = new PopupWithForm('.popup_type_profile', submitEditProfileForm);
instancePopupEditProfile.setEventListeners();
buttonOpenPopupEditProfile.addEventListener('click', () => {
  const { name, job } = instanceUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formEditProfileValidator.clearInputErrors();
  instancePopupEditProfile.openPopup();
});

// колбэк сабмита на форму добавления новой карточки
const submitAddNewCardForm = () => {
  const cardData = {
    name: cardNameField.value,
    link: cardSrcField.value
  }

  section.addItem(cardData);
  instancePopupAddCard.closePopup(popupAddCard);
}

// Экземпляр попапа PopupAddCard
const instancePopupAddCard = new PopupWithForm('.popup_type_cards', submitAddNewCardForm);
instancePopupAddCard.setEventListeners();
buttonOpenPopupAddCard.addEventListener('click', () => {

  formAddCardValidator.clearInputErrors();

  instancePopupAddCard.openPopup(popupAddCard);
});

// Экземпляр попапа PopupViewImg
const instancePopupViewImg = new PopupWithImage('.popup_type_image');
instancePopupViewImg.setEventListeners();

// создаем экземпляр валидатора формы профиля
const formEditProfileValidator = new FormValidator(validationObject, formEditProfile);
formEditProfileValidator.enableValidation();

// создаем экземпляр валидатора формы для добавления карточки
const formAddCardValidator = new FormValidator(validationObject, formAddCard);
formAddCardValidator.enableValidation();

const onClickPhotoCard = (name, link) => {
  instancePopupViewImg.openPopup(name, link);
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

