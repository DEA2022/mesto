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
      toggleButtonState(inputList, formButton, rest);
  });
});
}


// Функция, которая проверяет валидность поля
const checkInputValidity = (input, rest) => {
  const inputErrorElements = document.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    showInputError(input, inputErrorElements, rest);
  } else {
    hideInputError(input, inputErrorElements, rest);
  }
};

// функция, показывающая ошибку при невалидном инпуте
const showInputError = (input, inputErrorElements, {inputErrorClass, errorClass, ...rest}) => {
  input.classList.add(inputErrorClass);
  inputErrorElements.classList.add(errorClass);
  inputErrorElements.textContent = input.validationMessage;
}

// функция, скрывающая ошибку при валидном инпуте
const hideInputError = (input, inputErrorElements, {inputErrorClass, errorClass, ...rest}) => {
  input.classList.remove(inputErrorClass);
  inputErrorElements.classList.remove(errorClass);
  inputErrorElements.textContent = '';
}

// функция, активирующая кнопку при валидных значениях и деактивирующая при невалидных
const toggleButtonState = (inputList, formButton, {inactiveButtonClass}) => {
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
  return Array.from(inputList).some((input) => !input.validity.valid);
});

// функция, очищающая поля от ошибок
const clearInputErrors = (form) => {
  form.querySelectorAll(`.${validationObject.errorClass}`).forEach(element => {
    element.classList.remove(validationObject.errorClass);
  });
  form.querySelectorAll(`.${validationObject.inputErrorClass}`).forEach(element => {
    element.classList.remove(validationObject.inputErrorClass);
  });
}


enableValidation(validationObject);


