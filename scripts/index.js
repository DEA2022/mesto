const popupElements = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_cards');
const popupViewImg = document.querySelector('.popup_type_image');
const viewImgElement = popupViewImg.querySelector('.popup__img');
const captionElement = popupViewImg.querySelector('.popup__caption');

// Кнопки закрытия попапа
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close_el_profile');
const buttonClosePopupAddCard = document.querySelector('.popup__close_add_img');
const buttonClosePopupViewImg = popupViewImg.querySelector('.popup__close_el_pic');

// Кнопки открытия попапа
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
const buttonOpenPopupAddCard = document.querySelector('.profile__button');

// Формы в попапах и поля форм
const formEditProfileElement = popupEditProfile.querySelector('.form');
const formElementAddCard = popupAddCard.querySelector('.form');
const nameInput = formEditProfileElement.querySelector('.form__field_el_name');
const jobInput = formEditProfileElement.querySelector('.form__field_el_job');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.photo__grid');
const cardTemplate = document.querySelector('.card').content;
const cardElement = cardTemplate.querySelector('.photo__card');

const cardNameField = formElementAddCard.querySelector('.form__field_el_place');
const cardSrcField = formElementAddCard.querySelector('.form__field_el_webcite');

// переменные для переключения кнопок при ошибках
const buttonSubmitformEditProfileElement = formEditProfileElement.querySelector('.form__submit');
const inputsformEditProfileElement = formEditProfileElement.querySelectorAll('.form__field');

const buttonSubmitformElementAddCard = formElementAddCard.querySelector('.form__submit');
const inputsformElementAddCard = formElementAddCard.querySelectorAll('.form__field');



const createCard = function (name, link, alt) {
  const cloneCardElement = cardElement.cloneNode(true);
  const photoItemElement = cloneCardElement.querySelector('.photo__item');

  cloneCardElement.querySelector('.photo__name').textContent = name;
  photoItemElement.src = link;
  photoItemElement.alt = alt;

  // Лайк
  cloneCardElement.querySelector('.photo__icon').addEventListener('click', function makeLike(evt) {
    evt.target.classList.toggle('photo__icon_active');
  });

  // Удаление элемента
  cloneCardElement.querySelector('.photo__trash').addEventListener('click', function () {
    cloneCardElement.remove();
  });

  // Открытие попапа с картинкой
  photoItemElement.addEventListener('click', function () {
    viewImgElement.src = link;
    viewImgElement.alt = alt;
    captionElement.textContent = name;

    openPopup(popupViewImg);
  });

  return cloneCardElement;
};

// Добавление карточки в DOM
const addCard = function (name, link, alt) {
  cardsContainer.append(createCard(name, link, alt));
};

// Добавление массива карточек
initialCards.forEach(function (item) {
  addCard(item.name, item.link, item.alt);
});

// Общая функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEsc);
  // checkInputValidity();
};

// Общая функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEsc);
};

// Функция закрытия попапа по клику на оверлей
const closePopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target && popupEditProfile.classList.contains('popup_opened')) {
    closePopup(popupEditProfile);
  }
  if (event.currentTarget === event.target && popupAddCard.classList.contains('popup_opened')) {
    closePopup(popupAddCard);
  }
  if (event.currentTarget === event.target && popupViewImg.classList.contains('popup_opened')) {
    closePopup(popupViewImg);
  }
}

// Функция закрытия попапа по клику на esc
const closePopupByClickEsc = function (evt) {
  if (evt.key === 'Escape') {
    popupElements.forEach((popup) => {
      closePopup(popup);
    });
  }
}

// Сабмит на отправку формы
const submitEditProfileForm = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Сабмит на добавление новой карточки
const submitAddNewCardForm = function (evt) {
  evt.preventDefault();
  const cardElement = createCard(cardNameField.value, cardSrcField.value);
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
};

buttonOpenPopupEditProfile.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  clearInputErrors(formEditProfileElement);
  toggleButtonState(inputsformEditProfileElement, buttonSubmitformEditProfileElement, validationObject);
  openPopup(popupEditProfile);
});


buttonOpenPopupAddCard.addEventListener('click', function () {
  formElementAddCard.reset();
  clearInputErrors(formElementAddCard);
  toggleButtonState(inputsformElementAddCard, buttonSubmitformElementAddCard, validationObject);
  openPopup(popupAddCard);
});

// функция назначающая слушатели закрытия попапа нажатием на крестик
const hangEventListenersForClosePopup = (button, popup) => {
  button.addEventListener('click', function () {
    closePopup(popup);
  });
}

hangEventListenersForClosePopup(buttonClosePopupEditProfile, popupEditProfile);
hangEventListenersForClosePopup(buttonClosePopupAddCard, popupAddCard);
hangEventListenersForClosePopup(buttonClosePopupViewImg, popupViewImg);

// функция назначающая слушатели закрытия попапа нажатием на оверлей
const hangEventListenersForClosePopupByOverlay = (popup) => {
  popup.addEventListener('click', closePopupByClickOverlay);
};
hangEventListenersForClosePopupByOverlay(popupEditProfile);
hangEventListenersForClosePopupByOverlay(popupAddCard);
hangEventListenersForClosePopupByOverlay(popupViewImg);

formEditProfileElement.addEventListener('submit', submitEditProfileForm);

formElementAddCard.addEventListener('submit', submitAddNewCardForm);
