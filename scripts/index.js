const cardsBlock = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content.querySelector('.card');
const profilePopup = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-button');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const overlayPopupList = document.querySelectorAll('.popup__overlay');
const profileForm = document.querySelector('.popup__form-profile');
const cardForm = document.querySelector('.popup__form-card');
const cardPopup = document.querySelector('.popup-card');
const imagePopup = document.querySelector('.popup-card-open');
const cardImage = document.querySelector('.popup__card-img');
const imagePopupDescription = document.querySelector('.popup__card-description');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileNameText = document.querySelector('.profile__name');
const profileJobText = document.querySelector('.profile__job');
const cardNameInput = document.querySelector('.popup__input_type_card');
const cardLinkInput = document.querySelector('.popup__input_type_link');

initialCards.forEach(el => {
  const newCard = createCard(el);
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscListener();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener();
}

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
  const card = createCard(cardData);

  renderCard(card);
  closePopup(cardPopup);
}

function deleteCard(cardDeleteButton){
  cardDeleteButton.closest('.card').remove();
}

function toggleLikeForCard(cardLikeButton){
  cardLikeButton.classList.toggle('card__like-button_active');
}

function openImagePopup(cardData){
  cardImage.src = cardData.currentSrc;
  cardImage.alt = cardData.alt;
  imagePopupDescription.textContent = cardData.alt;
  openPopup(imagePopup);
}

function handleEscKeydown(evt) {
  if (evt.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function addEscListener(){
  document.addEventListener('keydown', handleEscKeydown);
}

function removeEscListener(){
  document.removeEventListener('keydown', handleEscKeydown);
}

function renderCard(newCard){
  cardsBlock.prepend(newCard);
}

function openProfilePopup() {
  fillProfileFormInputs();
  resetValidation(profileForm);
  openPopup(profilePopup);
}

function openCardPopup() {
  clearFormCardInput();
  resetValidation(cardForm);
  openPopup(cardPopup);
}

function createCard(cardData){
  const cloneCard = cardTemplate.cloneNode(true);
  const cardDeleteButton = cloneCard.querySelector('.card__delete-button');
  const cardLikeButton = cloneCard.querySelector('.card__like-button');
  const cardImg = cloneCard.querySelector('.card__img');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cloneCard.querySelector('.card__name').textContent = cardData.name;

  cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton));
  cardLikeButton.addEventListener('click',() => toggleLikeForCard(cardLikeButton));
  cardImg.addEventListener('click', () =>openImagePopup(cardImg));

  return cloneCard;
}

function resetValidation(form) {
  const formInputList = Array.from(form.querySelectorAll('input'));
  const formSubmitButton = form.querySelector('.popup__save-button');
  if (hasErrorClass(formInputList, 'popup__input_type_error')) {
    formInputList.forEach((inputElement) => {
      hideInputError(form, inputElement, 'popup__input_type_error', 'popup__error_visible');
    });
  }
  toggleSubmitButton(formInputList, formSubmitButton, 'popup__button_disabled');
}









