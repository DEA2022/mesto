class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this.setEventListeners();
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector('.popup__close')
    buttonClose.addEventListener('click', (popup) => {
      this.closePopup(popup);
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.currentTarget === this._popup) {
      this.closePopup();
    }
  }
}

export default Popup;
