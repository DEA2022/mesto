class Card {
  constructor(templateSelector, cardData, onClickPhotoCard) {
    this._cardElement = this._getTemplate(templateSelector);
    this._cardData = cardData;
    this._onClickPhotoCard = onClickPhotoCard;
  }

  createCardElement() {
    this._setEventListeners();
    const photoItemElement = this._cardElement.querySelector('.photo__item');
    this._cardElement.querySelector('.photo__name').textContent = this._cardData.name;
    photoItemElement.src = this._cardData.link;
    photoItemElement.alt = this._cardData.name;

    return this._cardElement;
  }

  _getTemplate(templateSelector) {
    const cardElement = templateSelector.querySelector('.photo__card').cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.photo__icon').addEventListener('click', () => {
      this._toogleLike();
    });
    this._cardElement.querySelector('.photo__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardElement.querySelector('.photo__item').addEventListener('click', () => {
      this._onClickPhotoCard(this._cardData.name, this._cardData.link);
    });
  }

  _toogleLike() {
    this._cardElement.querySelector('.photo__icon').classList.toggle('photo__icon_active');
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}

export default Card;


