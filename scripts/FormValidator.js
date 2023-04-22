class FormValidator {
  constructor(validationObject, form) {
    this._formSelector = validationObject.formSelector;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    const inputErrorElements = this._form.querySelector(`.${input.id}-error`);

    if (!input.validity.valid) {
      this._showInputError(input, inputErrorElements);
    } else {
      this._hideInputError(input, inputErrorElements);
    }
  }

  _showInputError(input, inputErrorElements) {
    input.classList.add(this._inputErrorClass);
    inputErrorElements.classList.add(this._errorClass);
    inputErrorElements.textContent = input.validationMessage;
  }

  _hideInputError(input, inputErrorElements) {
    input.classList.remove(this._inputErrorClass);
    inputErrorElements.classList.remove(this._errorClass);
    inputErrorElements.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    }
    else {
      this._enableButton();
    }
  };

  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
  }

  _disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  };

  clearInputErrors = () => {
    this._form.querySelectorAll(`.${this._errorClass}`).forEach(element => {
      element.classList.remove(this._errorClass);
    });
    this._form.querySelectorAll(`.${this._inputErrorClass}`).forEach(element => {
      element.classList.remove(this._inputErrorClass);
    });

    this._toggleButtonState()
  }
}

export default FormValidator;


