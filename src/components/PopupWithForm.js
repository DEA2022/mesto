import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);
    this._callbackSubmit = callbackSubmit;
    this._formIntoPopup = this._popup.querySelector('.form');
    this._inputList = this._formIntoPopup.querySelectorAll('.form__field');
    this._buttonSubmit = this._formIntoPopup.querySelector('.form__submit');
    this._defaultTextButtonSubmit = this._buttonSubmit.textContent;

  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonSubmit.textContent = "Сохранение..."
      this._callbackSubmit(this._getInputValues());
    });
  }

  setDefaultTextButtonSubmit() {
    this._buttonSubmit.textContent = this._defaultTextButtonSubmit;
  }

  closePopup() {
    super.closePopup();
    this._formIntoPopup.reset();
  }
}

export default PopupWithForm;
