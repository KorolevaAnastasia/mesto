import './index.css';

import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import * as data from "../utils/constants.js";

//validators
const profileValidator = new FormValidator(data.formSettings, data.profilePopup);
profileValidator.enableValidation();

const cardValidator = new FormValidator(data.formSettings, data.cardPopup);
cardValidator.enableValidation();

//user_info
const profileData = new UserInfo({
  name: data.profileNameText,
  job: data.profileJobText
});

//user_form
const profileForm = new PopupWithForm(data.profilePopup, handleSubmitProfileForm);
data.profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

//img_popup
const imagePopup = new PopupWithImage(data.imagePopup);

//init_card
const imageForm = new PopupWithForm(data.cardPopup, handleSubmitCardForm);
const initialCards = new Section({
    items: data.initialCards,
    renderer: (cardData) => {
      const newCard = new Card(cardData, '#default-card', handleCardClick);
      const cardElement = newCard.generateCard();
      initialCards.addItem(cardElement);
    }
  },
  data.cardsBlock
);

initialCards.render();
imageForm.setEventListeners();

//card_form
data.cardAddButton.addEventListener('click', () => {
  openCardPopup();
});


//func
function openCardPopup() {
  cardValidator.resetValidation();
  imageForm.open();
}

function handleSubmitCardForm(newCardData)  {
  const newCards = new Section({
      items: [newCardData],
      renderer: (cardData) => {
        const newCard = new Card(cardData, '#default-card', handleCardClick);
        const cardElement = newCard.generateCard();
        newCards.addItem(cardElement);
      }
    },
    data.cardsBlock
  );
  newCards.render();
  imageForm.close();
}

function handleCardClick(name, link) {
  imagePopup.setEventListeners();
  imagePopup.open(name, link);
}

function openProfilePopup() {
  const currentProfileData = profileData.getUserInfo();
  data.profileNameInput.value = currentProfileData.name;
  data.profileJobInput.value = currentProfileData.job;
  profileValidator.resetValidation();
  profileForm.setEventListeners();
  profileForm.open();
}

function handleSubmitProfileForm()  {
  profileData.setUserInfo({
    name: data.profileNameInput.value,
    job: data.profileJobInput.value
  });
}













