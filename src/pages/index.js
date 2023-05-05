import '../pages/index.css';
import { initialCards } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {validationObject} from '../utils/constants.js'

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
const submitAddNewCardForm = ([name, link]) => {
  section.addItem({name, link});
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

