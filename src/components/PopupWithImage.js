import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupViewImg = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  openPopup(name, link) {
    super.openPopup();
    this._popupViewImg.src = link;
    this._popupViewImg.alt = name;
    this._popupCaption.textContent = name;
  }
}

export default PopupWithImage;
