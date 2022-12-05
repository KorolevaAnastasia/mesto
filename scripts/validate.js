const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const toggleSubmitButton = (formElement, inputList, submitButton, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

const hasErrorClass = (inputList, inputErrorClass) => {
  return inputList.some(input => input.classList.contains(inputErrorClass))
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig.inputErrorClass, validationConfig.errorClass);
  } else {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleSubmitButton(formElement, inputList, submitButton, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleSubmitButton(formElement, inputList, submitButton, validationConfig.inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
