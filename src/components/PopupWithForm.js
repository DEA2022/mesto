import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);
    this._callbackSubmit = callbackSubmit;
    this._formIntoPopup = this._popup.querySelector('.form');
    this._inputList = this._formIntoPopup.querySelectorAll('.form__field');
    this.buttonSubmit = this._formIntoPopup.querySelector('.form__submit');
  }

  _getInputValues() {
    const inputList = this._formIntoPopup.querySelectorAll('.form__field');

    return Array.from(inputList).map((input) => input.value)
    // const formValues = {};
    // this._inputList.forEach(input => formValues[input.name] = input.value);
  }

  setEventListeners() {
    super.setEventListeners();

    this._formIntoPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.buttonSubmit.textContent = "Сохранение..."
      this._callbackSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._formIntoPopup.reset();
  }
}

export default PopupWithForm;
