const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSettings.inputErrorClass);
  errorElement.classList.add(formSettings.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSettings.inputErrorClass);
  errorElement.classList.remove(formSettings.errorClass);
  errorElement.textContent = '';
};

const toggleSubmitButton = (formElement, inputList) => {
  const submitButton = formElement.querySelector(formSettings.submitButtonSelector);
  if(hasInvalidInput(inputList)) {
    submitButton.classList.add(formSettings.inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  } else {
    submitButton.classList.remove(formSettings.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButton(formElement, inputList);
    });
  });
};

const enableValidation = (formSettings) => {
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(formSettings);
