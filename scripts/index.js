// открытие и закрытие попапа
const popupElement = document.querySelector('.popup');
const popupOpenBtnElement = document.querySelector('.profile__edit');
const popupCloseBtnElement = popupElement.querySelector('.form__close');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

const closePopupByClickOverlay = function (event) {
  console.log(event.currentTarget, event.target);
  if (event.currentTarget === event.target) {
    closePopup();
  }
}

popupOpenBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

// редактирование формы
const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__username');
let jobInput = formElement.querySelector('.form__job-title');

const handleFormSubmit = function (evt) {
  evt.preventDefault();

  let nameInputNewValue = document.querySelector('.profile__title');
  let jobInputNewValue = document.querySelector('.profile__subtitle');
  nameInputNewValue.textContent = nameInput.value;
  jobInputNewValue.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
