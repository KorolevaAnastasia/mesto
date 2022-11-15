const initialCards = [
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

const elementsBlock = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const formProfile = document.querySelector('.popup__form-edit');
const formElement = document.querySelector('.popup__form-add');
const closeImgViewButton = document.querySelector('.popup__close-img-button');
const closeElementButton = document.querySelector('.popup__close-element-button');
const closeProfileButton = document.querySelector('.popup__close-profile-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');

let popupImg = document.querySelector('.popup__img');
let popupEditProfileSection = document.querySelector('.popup__edit-profile');
let profileEditNameInput = document.querySelector('.popup__form-text_type_name');
let profileEditJobInput = document.querySelector('.popup__form-text_type_job');
let profileNameText = document.querySelector('.profile__name');
let profileJobText = document.querySelector('.profile__job');
let popupAddElementSection = document.querySelector('.popup__add-element');
let popupOpenImgSection = document.querySelector('.popup__open-img');
let popupImgViewDesc = document.querySelector('.popup__description');

initialCards.forEach(el => createTempCard(el));

profileEditButton.addEventListener('click', (element) => openPopup(element.target));
elementAddButton.addEventListener('click', (element) => openPopup(element.target));

closeProfileButton.addEventListener('click', (element) => closePopup(element.target));
closeElementButton.addEventListener('click', (element) => closePopup(element.target));
closeImgViewButton.addEventListener('click', (element) => closePopup(element.target));

formProfile.addEventListener('submit', formProfileSubmitHandler);
formElement.addEventListener('submit', formElementSubmitHandler);


elementsBlock.addEventListener('click', (element) => {
  let targetElement = element.target;
  switch (targetElement.classList[0]){
    case 'element__like-button':
      targetElement.classList.contains('element__like-button_active') ?
        targetElement.classList.remove('element__like-button_active') :
        targetElement.classList.add('element__like-button_active');
    break;
    case 'element__delete-button':
      targetElement.parentNode.remove();
    break;
    case 'element__img':
      let newImg = {
        name: targetElement.alt,
        link: targetElement.currentSrc
      };
      createImgPopup(newImg);
      break;
  }
});

function openPopup(element) {
  switch (element){
    case profileEditButton:
      inputPopupProfileText();
      popupEditProfileSection.classList.add('popup_opened');
    break;
    case elementAddButton:
      popupAddElementSection.classList.add('popup_opened');
    break;
  }
}

function closePopup(element) {
  switch (element){
    case closeProfileButton:
      popupEditProfileSection.classList.remove('popup_opened');
    break;
    case closeElementButton:
      popupAddElementSection.classList.remove('popup_opened');
    break;
    case closeImgViewButton:
      popupOpenImgSection.classList.remove('popup_opened');
    break;
  }
}

function inputProfileText(){
  profileNameText.textContent = profileEditNameInput.value;
  profileJobText.textContent = profileEditJobInput.value;
}

function inputPopupProfileText(){
  profileEditNameInput.value = profileNameText.textContent;
  profileEditJobInput.value = profileJobText.textContent;
}


function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  inputProfileText();
  closePopup(closeProfileButton);
}

function formElementSubmitHandler (evt) {
  evt.preventDefault();

  let elementInput = document.querySelector('.popup__form-text_type_element').value;
  let linkInput = document.querySelector('.popup__form-text_type_link').value;

  if ((elementInput !== '' && linkInput !== '') && isUrl(linkInput)) {
    let newElement = {
      name: elementInput,
      link: linkInput
    };
    createTempCard(newElement);
  }
  closePopup(closeElementButton);
}

function createTempCard(element){
  let tempElement = elementTemplate.querySelector('.element').cloneNode(true);
  tempElement.querySelector('.element__img').src = element.link;
  tempElement.querySelector('.element__img').alt = element.name;
  tempElement.querySelector('.element__name').textContent = element.name;
  elementsBlock.prepend(tempElement);
}

function createImgPopup(element){
  popupImg.src = element.link;
  popupImg.alt = element.name;
  popupImgViewDesc.textContent = element.name;
  popupOpenImgSection.classList.add('popup_opened');
}

function isUrl(url) {
  let text = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
  return text.test(url);
}




