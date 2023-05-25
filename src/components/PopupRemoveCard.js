import Popup from "./Popup.js";

export default class PopupRemoveCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._formIntoPopup = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit({card: this._cardElement, cardId: this._cardId});

    });
  }

  openPopup = ({card , cardId}) => {
    super.openPopup();
    this._cardElement = card;
    this._cardId = cardId;
  }
}
