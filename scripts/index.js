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
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileNameText = document.querySelector('.profile__name');
const profileJobText = document.querySelector('.profile__job');
const imageNameInput = document.querySelector('.popup__input_type_element');
const imageLinkInput = document.querySelector('.popup__input_type_link');
const overlayPopupList = document.querySelectorAll('.popup__overlay');

initialCards.forEach(el => {
  const newCard = createCard(el);
  renderCard(newCard);
});

profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

elementAddButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

overlayPopupList.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', submitFormProfileHandler);
elementForm.addEventListener('submit', submitFormElementHandler);

function openPopup(element) {
  element.classList.add('popup_opened');
  addEscListener(element);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener(popup);
}

function openProfilePopup() {
  openPopup(profilePopup);
}

function replaceProfileInputText(){
  profileNameText.textContent = profileNameInput.value;
  profileJobText.textContent = profileJobInput.value;
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
  const elementDeleteButton = cloneTemplate.querySelector('.element__delete-button');
  const elementLikeButton = cloneTemplate.querySelector('.element__like-button');
  const elementImg = cloneTemplate.querySelector('.element__img');

  elementImg.src = element.link;
  elementImg.alt = element.name;
  cloneTemplate.querySelector('.element__name').textContent = element.name;

  elementDeleteButton.addEventListener('click', () => deleteCard(elementDeleteButton));
  elementLikeButton.addEventListener('click',() => toggleLikeForCard(elementLikeButton));
  elementImg.addEventListener('click', () =>createImgPopup(elementImg));

  return cloneTemplate;
}

function deleteCard(element){
  element.closest('.element').remove();
}

function toggleLikeForCard(element){
  element.classList.toggle('element__like-button_active');
}

function renderCard(newElement){
  elementsBlock.prepend(newElement);
}

function createImgPopup(element){
  imagePopup.src = element.currentSrc;
  imagePopup.alt = element.alt;
  imagePopupDescription.textContent = element.alt;
  imgPopup.classList.add('popup_opened');
  addEscListener(imgPopup);
}

function keyHandler(key, popup) {
  if (key.code === 'Escape')
    closePopup(popup);
}

function addEscListener(popup){
  document.addEventListener('keydown', key => keyHandler(key, popup));
}

function removeEscListener(popup){
  document.removeEventListener('keydown', key => keyHandler(key, popup));
}






