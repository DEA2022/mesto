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
};

// Общая функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

// Сабмит на отправку формы
const handleFormSubmit = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Сабмит на добавление новой карточки
const addNewCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardElement = createCard(cardNameField.value, cardSrcField.value);
  cardsContainer.prepend(cardElement);
  formElementAddCard.reset();
  closePopup(popupAddCard);
};

buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

buttonClosePopupEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

buttonClosePopupViewImg.addEventListener('click', function () {
  closePopup(popupViewImg);
});

formEditProfileElement.addEventListener('submit', handleFormSubmit);

formElementAddCard.addEventListener('submit', addNewCardFormSubmit);
