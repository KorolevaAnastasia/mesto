import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const imagePopupDescription = document.querySelector('.popup__card-description');
export const imagePopup = document.querySelector('.popup-card-open');
export const cardImage = document.querySelector('.popup__card-img');

const cardsBlock = document.querySelector('.cards');
const cardPopup = document.querySelector('.popup-card');
const profilePopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-button');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const overlayPopupList = document.querySelectorAll('.popup__overlay');
const profileForm = document.querySelector('.popup__form-profile');
const cardForm = document.querySelector('.popup__form-card');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileNameText = document.querySelector('.profile__name');
const profileJobText = document.querySelector('.profile__job');
const cardNameInput = document.querySelector('.popup__input_type_card');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const profileValidator = new FormValidator(formSettings, profilePopup);
const cardValidator = new FormValidator(formSettings, cardPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();

initialCards.forEach(el => {
  const cardElement = new Card(el, '#default-card');
  const newCard = cardElement.generateCard();
  renderCard(newCard);
});

profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

cardAddButton.addEventListener('click', () => {
  openCardPopup();
});

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

overlayPopupList.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', handleSubmitProfileForm);
cardForm.addEventListener('submit', handleSubmitCardForm);


function saveProfileData(){
  profileNameText.textContent = profileNameInput.value;
  profileJobText.textContent = profileJobInput.value;
}

function fillProfileFormInputs(){
  profileNameInput.value = profileNameText.textContent;
  profileJobInput.value = profileJobText.textContent;
}

function clearFormCardInput(){
  cardForm.reset();
}

function handleSubmitProfileForm(evt){
  evt.preventDefault();
  saveProfileData();
  closePopup(profilePopup);
}

function handleSubmitCardForm(evt){
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const card = new Card(cardData, '#default-card');

  renderCard(card.generateCard());
  closePopup(cardPopup);
}

function renderCard(newCard){
  cardsBlock.prepend(newCard);
}

function openProfilePopup() {
  fillProfileFormInputs();
  resetValidation(profileForm, profileValidator);
  openPopup(profilePopup);
}

function openCardPopup() {
  clearFormCardInput();
  resetValidation(cardForm, cardValidator);
  openPopup(cardPopup);
}

function resetValidation(form, validator) {
  const formInputList = Array.from(form.querySelectorAll('input'));
  if (validator.hasErrorClass(formInputList, 'popup__input_type_error')) {
    formInputList.forEach(() => {
      validator.hideInputError();
    });
  }
  validator.toggleSubmitButton();
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscListener();
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener();
}

function addEscListener(){
  document.addEventListener('keydown', handleEscKeydown);
}
function removeEscListener(){
  document.removeEventListener('keydown', handleEscKeydown);
}

function handleEscKeydown(evt) {
  if (evt.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}









