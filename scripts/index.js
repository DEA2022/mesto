const popupElement = document.querySelector('.popup');
const popupOpenBtnElement = document.querySelector('.profile__edit');
const popupCloseBtnElement = popupElement.querySelector('.form__close');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

popupOpenBtnElement.addEventListener('click', openPopup);

popupCloseBtnElement.addEventListener('click', closePopup);
