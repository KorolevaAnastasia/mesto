let closeButton = document.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-text_type_name');
let jobInput = document.querySelector('.popup__form-text_type_job');
let nameText = document.querySelector('.profile__name');
let jobText = document.querySelector('.profile__job');

closeButton.addEventListener('click', popupClosed);
profileEditButton.addEventListener('click', popupOpened);
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();
  inputProfileText();
  popupClosed();
}

function popupOpened () {
  popup.classList.add('popup_opened');
  inputPopupText();
}

function popupClosed () {
  popup.classList.remove('popup_opened');
}

function inputProfileText(){
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
}

function inputPopupText(){
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}



