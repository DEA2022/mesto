export const initialCards = [
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1679231926690-cb1e8abfcefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1991&q=80',
  },
  {
    name: 'Венеция',
    link: 'https://images.unsplash.com/photo-1677362376803-93af835b3a47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Египет',
    link: 'https://images.unsplash.com/photo-1671483330965-357fcbb85999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Индия',
    link: 'https://images.unsplash.com/photo-1671219823638-9cd8bf0a80b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1012&q=80',
  },
  {
    name: 'Лиссабон',
    link: 'https://images.unsplash.com/photo-1665066358267-16768e4d46f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80',
  },
  {
    name: 'Тайланд',
    link: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  }
];

export const popupEditProfile = document.querySelector('.popup_type_profile');
export const popupAddCard = document.querySelector('.popup_type_cards');

// Кнопки открытия попапа
export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
export const buttonOpenPopupAddCard = document.querySelector('.profile__button');

// Формы в попапах и поля форм
export const formEditProfile = popupEditProfile.querySelector('.form');
export const formAddCard = popupAddCard.querySelector('.form');
export const nameInput = formEditProfile.querySelector('.form__field_el_name');
export const jobInput = formEditProfile.querySelector('.form__field_el_job');

export const cardsContainer = document.querySelector('.photo__grid');
export const cardTemplate = document.querySelector('.card').content;

export const cardNameField = formAddCard.querySelector('.form__field_el_place');
export const cardSrcField = formAddCard.querySelector('.form__field_el_webcite');

export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error-line',
  errorClass: 'form__error_active'
}
