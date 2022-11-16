const elementsBlock = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const profileForm = document.querySelector('.popup__form-edit');
const elementForm = document.querySelector('.popup__form-add');
const cardPopup = document.querySelector('.popup-add-element');
const imgPopup = document.querySelector('.popup-img-open');
const profilePopup = document.querySelector('.popup-edit-profile');
const imagePopup = document.querySelector('.popup__img');
const imagePopupDescription = document.querySelector('.popup__description');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');
const profileNameInput = document.querySelector('.popup__form-text_type_name');
const profileJobInput = document.querySelector('.popup__form-text_type_job');
const profileNameText = document.querySelector('.profile__name');
const profileJobText = document.querySelector('.profile__job');
const imageNameInput = document.querySelector('.popup__form-text_type_element');
const imageLinkInput = document.querySelector('.popup__form-text_type_link');

initialCards.forEach(el => {
  const newCard = createCard(el);
  renderCard(newCard);
});

profileEditButton.addEventListener('click', el => {
  openProfilePopup(profilePopup);
});

elementAddButton.addEventListener('click', el => {
  openPopup(cardPopup);
});

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', submitFormProfileHandler);
elementForm.addEventListener('submit', submitFormElementHandler);

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup(popup) {
  replaceProfileText();
  openPopup(popup);
}

function replaceProfileInputText(){
  profileNameText.textContent = profileNameInput.value;
  profileJobText.textContent = profileJobInput.value;
}

function replaceProfileText(){
  profileNameInput.value = profileNameText.textContent;
  profileJobInput.value = profileJobText.textContent;
}

function clearFormElementInput(){
  imageNameInput.value = '';
  imageLinkInput.value = '';
}


function submitFormProfileHandler(evt){
  evt.preventDefault();
  replaceProfileInputText();
  closePopup(profilePopup);
}

function submitFormElementHandler(evt){
  evt.preventDefault();

  const newElement = {
    name: imageNameInput.value,
    link: imageLinkInput.value
  };
  const card = createCard(newElement);

  renderCard(card);
  closePopup(cardPopup);
  clearFormElementInput();
}

function createCard(element){
  const cloneTemplate = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImg = cloneTemplate.querySelector('.element__img');

  elementImg.src = element.link;
  elementImg.alt = element.name;
  cloneTemplate.querySelector('.element__name').textContent = element.name;
  cloneTemplate.addEventListener('click', (element) => {

    const targetElement = element.target;
    const targetFirstElementClass = targetElement.classList[0];

    switch (targetFirstElementClass) {
      case 'element__like-button':
        targetElement.classList.toggle('element__like-button_active');
        break;
      case 'element__delete-button':
        targetElement.closest('.element').remove();
        break;
      case 'element__img':
        createImgPopup(targetElement);
        break;
    }
  });

  return cloneTemplate;
}

function renderCard(newCard){
  elementsBlock.prepend(newCard);
}

function createImgPopup(element){
  imagePopup.src = element.currentSrc;
  imagePopup.alt = element.alt;
  imagePopupDescription.textContent = element.alt;
  imgPopup.classList.add('popup_opened');
}




