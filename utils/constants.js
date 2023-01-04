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

export const formSettings = {
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

export const cardsBlock = document.querySelector('.cards');
export const cardPopup = document.querySelector('.popup-card');
export const profilePopup = document.querySelector('.popup-profile');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__card-button');
export const buttonCloseList = document.querySelectorAll('.popup__close-button');
export const overlayPopupList = document.querySelectorAll('.popup__overlay');
export const profileForm = document.querySelector('.popup__form-profile');
export const cardForm = document.querySelector('.popup__form-card');
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileJobInput = document.querySelector('.popup__input_type_job');
export const profileNameText = document.querySelector('.profile__name');
export const profileJobText = document.querySelector('.profile__job');
export const cardNameInput = document.querySelector('.popup__input_type_card');
export const cardLinkInput = document.querySelector('.popup__input_type_link');


