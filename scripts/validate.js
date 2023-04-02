const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_type_error-line',
  errorClass: 'form__error_active'
}

// функция валидации
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, rest);
  });
  }

// навешивание слушателей на инпуты
const setEventListeners = (form, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      toggleButtonState(input, inputList, formButton, rest);
  });
});
}


// Функция, которая проверяет валидность поля
const checkInputValidity = (input, rest) => {
  const inputErrorBox = document.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, inputErrorBox, rest);
  } else {
    hideInputError(input, inputErrorBox, rest);
  }
};

// функция, показывающая ошибку при невалидном инпуте
const showInputError = (input, inputErrorBox, {inputErrorClass, errorClass, ...rest}) => {
  input.classList.add(inputErrorClass);
  inputErrorBox.classList.add(errorClass);
  inputErrorBox.textContent = input.validationMessage;
}

// функция, скрывающая ошибку при валидном инпуте
const hideInputError = (input, inputErrorBox, {inputErrorClass, errorClass, ...rest}) => {
  input.classList.remove(inputErrorClass);
  inputErrorBox.classList.remove(errorClass);
  inputErrorBox.textContent = '';
}

// функция, активирующая кнопку при валидных значениях и деактивирующая при невалидных
const toggleButtonState = (input, inputList, formButton, {inactiveButtonClass}) => {
  if(hasInvalidInput(inputList)) {
    formButton.classList.add(inactiveButtonClass);
    formButton.setAttribute('disabled', true);
  }
  else {
    formButton.classList.remove(inactiveButtonClass);
    formButton.removeAttribute('disabled');
  }
};

// Булевая проверка на наличие невалидного инпута
const hasInvalidInput = ((inputList) => {
  return inputList.some((input) => !input.validity.valid);
});

  enableValidation(validationObject);
