import Popup from "./Popup.js";

export default class PopupRemoveCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._currentPopup = document.querySelector(popupSelector);
    this._formIntoPopup = this._currentPopup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._cardElement)
      this._callbackSubmit(this._cardElement);

    });
  }

  openPopup = (cardElement) => {
    super.openPopup();
    this._cardElement = cardElement;
  }
}
