const popupElement = document.querySelector('.popup');
const popupOpenBtnElement = document.querySelector('.profile__edit');
const popupCloseBtnElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__field_el_name');
let jobInput = formElement.querySelector('.form__field_el_job');
let nameInputNewValue = document.querySelector('.profile__title');
let jobInputNewValue = document.querySelector('.profile__subtitle');

const openPopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  jobInput.value = jobInputNewValue.textContent;
  popupElement.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');

};

const closePopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target) {
    closePopup();
  }
}

popupOpenBtnElement.addEventListener('click', openPopup);
popupCloseBtnElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

const handleFormSubmit = function (evt) {
  evt.preventDefault();

  nameInputNewValue.textContent = nameInput.value;
  jobInputNewValue.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);


