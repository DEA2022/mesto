class Card {
  constructor(templateSelector, cardData, onClickPhotoCard, onClickDeleteCard, userId, handleLikeCard) {
    this._cardElement = this._getTemplate(templateSelector);
    this._cardData = cardData;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._iconLikeCard = this._cardElement.querySelector('.photo__icon');
    this._likeCounter = this._cardElement.querySelector('.photo__counter');
    this._trashIcon = this._cardElement.querySelector('.photo__trash');
    this._onClickPhotoCard = onClickPhotoCard;
    this._onClickDeleteCard = onClickDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  createCardElement() {
    this._setEventListeners();
    const photoItemElement = this._cardElement.querySelector('.photo__item');
    this._cardElement.querySelector('.photo__name').textContent = this._cardData.name;
    photoItemElement.src = this._cardData.link;
    photoItemElement.alt = this._cardData.name;
    this._checkLikes();
    this._removeVisibilityTrash();

    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isLike(likes) {
    this._iconLikeCard.classList.toggle('photo__icon_active');
    this._likeCounter.textContent = likes.length;
  }

  _removeVisibilityTrash() {
    if (this._userId !== this._ownerId) {
      this._trashIcon.remove();
    }
  }

  _getTemplate(templateSelector) {
    const cardElement = templateSelector.querySelector('.photo__card').cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._iconLikeCard.addEventListener('click', () => {
      this._toogleLike();
    });
    this._trashIcon.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
    this._cardElement.querySelector('.photo__item').addEventListener('click', () => {
      this._onClickPhotoCard(this._cardData.name, this._cardData.link);
    });
  }

  _toogleLike() {
    this._handleLikeCard(this, this._iconLikeCard, this._cardId)
  }

  _checkLikes() {
    this._likes.forEach(element => {
      if (element._id === this._userId) {
        this._iconLikeCard.classList.add('photo__icon_active');
        return
      }
    });
    this._likeCounter.textContent = this._likes.length;
  }

  _handleDeleteCard() {
    this._onClickDeleteCard({ card: this, cardId: this._cardId });
  }
}

export default Card;


