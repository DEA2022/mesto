class Card {
  constructor(templateSelector) {
    this._cardElement = this._getTemplate(templateSelector);
  }

  createCardElement(data) {
    this._setEventListeners();
    const photoItemElement = this._cardElement.querySelector('.photo__item');
    this._cardElement.querySelector('.photo__name').textContent = data.name;
    photoItemElement.src = data.link;
    photoItemElement.alt = data.name;

    return this._cardElement;
  }

  addCallbackOnClickPhotoCard(callback) {
    const photoItemElement = this._cardElement.querySelector('.photo__item');
    photoItemElement.addEventListener('click', callback);
  }

  _getTemplate(templateSelector) {
    const cardElement = templateSelector.querySelector('.photo__card').cloneNode(true);

    return cardElement;
  }

  _setEventListeners(data) {
    this._cardElement.querySelector('.photo__icon').addEventListener('click', () => {
      this._toogleLike();
    });
    this._cardElement.querySelector('.photo__trash').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toogleLike() {
    this._cardElement.querySelector('.photo__icon').classList.toggle('photo__icon_active');
  }

  _deleteCard() {
    this._cardElement.remove();
  }
}

export default Card;


