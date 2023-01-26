import './index.css';

import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import * as data from "../utils/constants.js";

//valid
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    console.log(formElement);
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(data.formSettings);

//init_classes
const profileForm = new PopupWithForm('.popup-profile', handleSubmitProfileForm);
const imagePopup = new PopupWithImage('.popup-card-open');
const imageForm = new PopupWithForm('.popup-card', handleSubmitCardForm);

const profileData = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
});

const initialCards = (items) => {
  const newCard = new Section({
      items: items,
      renderer: (cardData) => {
        const cardElement = createCard(cardData);
        newCard.addItem(cardElement);
      }
    },
    '.cards'
  );

  newCard.render();
}

initialCards(data.initialCards);

//listeners
profileForm.setEventListeners();
imageForm.setEventListeners();
imagePopup.setEventListeners();

data.cardAddButton.addEventListener('click', () => {
  openCardPopup();
});

data.profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

//func
function createCard(item) {
  const newCard = new Card(item, '#default-card', handleCardClick);
  return newCard.generateCard();
}

function openCardPopup() {
  formValidators['card'].resetValidation();
  imageForm.open();
}

function openProfilePopup() {
  const currentProfileData = profileData.getUserInfo();
  profileForm.setInputValues(currentProfileData);
  formValidators['profile'].resetValidation();
  profileForm.open();
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleSubmitCardForm(cardData)  {
  initialCards([cardData]);
  imageForm.close();
}

function handleSubmitProfileForm(data)  {
  profileData.setUserInfo(data);
}













