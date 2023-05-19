import '../pages/index.css';
import { initialCards } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupRemoveCard from '../components/PopupRemoveCard.js';
import UserInfo from '../components/UserInfo.js';
import { validationObject } from '../utils/constants.js'
import getInitialCards from '../components/Api.js'

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');
const popupRemoveCard = document.querySelector('.popup_type_agreement');

// Кнопки открытия попапа
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
const buttonOpenPopupAddCard = document.querySelector('.profile__button');
const buttonOpenPopupChangeAvatar = document.querySelector('.profile__button-avatar');

// Формы в попапах и поля форм
const formEditProfile = popupEditProfile.querySelector('.form');
const formAddCard = popupAddCard.querySelector('.form');
const formChangeAvatar = popupChangeAvatar.querySelector('.form')
const nameInput = formEditProfile.querySelector('.form__field_el_name');
const jobInput = formEditProfile.querySelector('.form__field_el_job');

const cardsContainer = document.querySelector('.photo__grid');
const cardTemplate = document.querySelector('.card').content;
const photoFromAvatar = document.querySelector('.profile__photo');

// экземпляр класса UserInfo
const instanceUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

// колбэк сабмита на форму изменения профиля
const submitEditProfileForm = ([name, job]) => {
  instanceUserInfo.setUserInfo({ name, job });
  instancePopupEditProfile.closePopup();
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
  section.addItem(createNewCardElement({ name, link }));
  instancePopupAddCard.closePopup();
}

// Экземпляр попапа PopupAddCard
const instancePopupAddCard = new PopupWithForm('.popup_type_cards', submitAddNewCardForm);
instancePopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener('click', () => {
  formAddCardValidator.clearInputErrors();
  instancePopupAddCard.openPopup();
});


// колбэк сабмита на форму обновления аватара
const submitChangeAvatar = ([src]) => {
  photoFromAvatar.src = src;
  instancePopupChangeAvatar.closePopup();
}

// Экземпляр попапа PopupChangeAvatar
const instancePopupChangeAvatar = new PopupWithForm('.popup_type_avatar', submitChangeAvatar);
instancePopupChangeAvatar.setEventListeners();

buttonOpenPopupChangeAvatar.addEventListener('click', () => {
  formChangeAvatarValidator.clearInputErrors();
  instancePopupChangeAvatar.openPopup();
});


// Экземпляр попапа PopupViewImg
const instancePopupViewImg = new PopupWithImage('.popup_type_image');
instancePopupViewImg.setEventListeners();

//экземпляр попапа PopupRemoveCard
const instancePopupRemoveCard = new PopupRemoveCard('.popup_type_agreement', (item) => {
  item.deleteCard();
  instancePopupRemoveCard.closePopup();
});
instancePopupRemoveCard.setEventListeners();

// создаем экземпляр валидатора формы профиля
const formEditProfileValidator = new FormValidator(validationObject, formEditProfile);
formEditProfileValidator.enableValidation();

// создаем экземпляр валидатора формы для добавления карточки
const formAddCardValidator = new FormValidator(validationObject, formAddCard);
formAddCardValidator.enableValidation();

// создаем экземпляр валидатора формы для смены аватара
const formChangeAvatarValidator = new FormValidator(validationObject, formChangeAvatar);
formChangeAvatarValidator.enableValidation();

const onClickPhotoCard = (name, link) => {
  instancePopupViewImg.openPopup(name, link);
}

const createNewCardElement = (item) => {
  const card = new Card(cardTemplate, item, onClickPhotoCard, instancePopupRemoveCard.openPopup);
  const cardElement = card.createCardElement();

  return cardElement;
}

getInitialCards().then(res => {
  console.log('res ====>', res);
  const initialCards = res;
  initialCards.forEach(item => {
    // item.createCardElement(cardTemplate, [res.name, res.link], onClickPhotoCard, instancePopupRemoveCard.openPopup);
  })


})

// Объект для отрисовки карточек
const renderPageData = {
  items: initialCards,
  renderer: (item) => {
    section.addItem(createNewCardElement(item));
  }
}

// добавление массива карточек
const section = new Section(renderPageData, cardsContainer)
section.rendererElements();



