import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import * as data from "../utils/constants.js";

const profileValidator = new FormValidator(data.formSettings, data.profilePopup);
const cardValidator = new FormValidator(data.formSettings, data.cardPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();

data.initialCards.forEach(el => {
  const newCard = createCard(el);
  renderCard(newCard);
});

data.profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

data.cardAddButton.addEventListener('click', () => {
  openCardPopup();
});

data.buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

data.overlayPopupList.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});

data.profileForm.addEventListener('submit', handleSubmitProfileForm);
data.cardForm.addEventListener('submit', handleSubmitCardForm);

function createCard(data) {
  const cardElement = new Card(data, '#default-card', handleCardClick);
  return cardElement.generateCard();
}

function handleCardClick(name, link) {
  data.cardImage.src = link;
  data.cardImage.alt = name;
  data.imagePopupDescription.textContent = name;
  openPopup(data.imagePopup);
}

function saveProfileData(){
  data.profileNameText.textContent = data.profileNameInput.value;
  data.profileJobText.textContent = data.profileJobInput.value;
}

function fillProfileFormInputs(){
  data.profileNameInput.value = data.profileNameText.textContent;
  data.profileJobInput.value = data.profileJobText.textContent;
}

function clearFormCardInput(){
  data.cardForm.reset();
}

function handleSubmitProfileForm(evt){
  evt.preventDefault();
  saveProfileData();
  closePopup(data.profilePopup);
}

function handleSubmitCardForm(evt){
  evt.preventDefault();

  const cardData = {
    name: data.cardNameInput.value,
    link: data.cardLinkInput.value
  };

  const card = createCard(cardData);
  renderCard(card);
  closePopup(data.cardPopup);
}

function renderCard(card){
  data.cardsBlock.prepend(card);
}

function openProfilePopup() {
  fillProfileFormInputs();
  profileValidator.resetValidation();
  openPopup(data.profilePopup);
}

function openCardPopup() {
  clearFormCardInput();
  cardValidator.resetValidation();
  openPopup(data.cardPopup);
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










