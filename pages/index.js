import { initialCards } from '../utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {popupEditProfile, popupAddCard, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, formEditProfile, formAddCard,
nameInput, jobInput , cardsContainer, cardTemplate, cardNameField, cardSrcField, validationObject} from '../utils/constants.js'


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

