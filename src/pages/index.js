import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupRemoveCard from '../components/PopupRemoveCard.js';
import UserInfo from '../components/UserInfo.js';
import { validationObject } from '../utils/constants.js';
import Api from '../components/Api.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');

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

// Экземпляр Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7de2994e-87c5-4c41-b3ee-528880f7cb41',
    'Content-Type': 'application/json'
  }
});

// экземпляр класса UserInfo
const instanceUserInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__photo');

// колбэк сабмита на форму изменения профиля
const submitEditProfileForm = (data) => {
    api.setUserInfo(data)
      .then(res => {
        instanceUserInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar, id: res._id });
        instancePopupEditProfile.closePopup();
      })
      .catch(errorMessage => {
        console.error(`Операция по обновлению профиля завершилась ошибкой ${errorMessage}`);
      })
      .finally(() => instancePopupEditProfile.setDefaultTextButtonSubmit())
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
const submitAddNewCardForm = (CardData) => {
  api.createNewCard(CardData)
  .then((newCard)=>{
    section.addItem(createNewCardElement(newCard));
    instancePopupAddCard.closePopup();
  })
  .catch(errorMessage => {
    console.error(`Операция не выполнена ${errorMessage}`)
  })
  .finally(() => instancePopupAddCard.setDefaultTextButtonSubmit());
}

// Экземпляр попапа PopupAddCard
const instancePopupAddCard = new PopupWithForm('.popup_type_cards', submitAddNewCardForm);
instancePopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener('click', () => {
  formAddCardValidator.clearInputErrors();
  instancePopupAddCard.openPopup();
});


// колбэк сабмита на форму обновления аватара
const submitChangeAvatar = (data) => {
  api.updateUserAvatar(data)
    .then(res => {
      instanceUserInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar, id: res._id });
      instancePopupChangeAvatar.closePopup();
    })
    .catch(errorMessage => {
      console.error(`Операция смены аватара завершилась ошибкой ${errorMessage}`)
    })
    .finally(() => {
      instancePopupChangeAvatar.setDefaultTextButtonSubmit();
    })
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
const instancePopupRemoveCard = new PopupRemoveCard('.popup_type_agreement', ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      instancePopupRemoveCard.closePopup();
    })
    .catch(errorMessage => {
      console.error(`Операция удаления карточки завершилась ошибкой ${errorMessage}`)
    })
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

// Колбек открытия попапа кликом на карточку
const onClickPhotoCard = (name, link) => {
  instancePopupViewImg.openPopup(name, link);
}

//Создание экземпляра карточки
const createNewCardElement = (item) => {
  const card = new Card(cardTemplate, item, onClickPhotoCard, instancePopupRemoveCard.openPopup, instanceUserInfo.getUserId(), handleLikeCard)

  const cardElement = card.createCardElement();

  return cardElement;
}
// Лайки
const handleLikeCard = (card, itemLike, cardId) => {
  if (itemLike.classList.contains('photo__icon_active')) {
    api.deleteLike(cardId)
      .then(res => {
        card.isLike(res.likes);

      })
      .catch(errorMessage => {
        console.error(`Карточка не лайкнута ${errorMessage}`)
      })
  }
  else {
    api.addLike(cardId)
      .then(res => {
        card.isLike(res.likes);
      })
      .catch(errorMessage => {
        console.error(`Карточка не лайкнута ${errorMessage}`)
      })
  }

};

// функция для отрисовки карточек
const rendererItems = (item) => {
  section.addItem(createNewCardElement(item));
}

// добавление массива карточек
const section = new Section(rendererItems, cardsContainer);

//Получение информации о пользователе и массива карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, initialCards])=>{
  console.log(userInfo)
  instanceUserInfo.setUserInfo({ name: userInfo.name, job: userInfo.about, avatar: userInfo.avatar, id: userInfo._id });
  section.rendererElements(initialCards.reverse());
})
.catch(errorMessage => {
  console.error(`Операция не выполнена ${errorMessage}`)
})

