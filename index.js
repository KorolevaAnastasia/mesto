let closeButton = document.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name-input');
let jobInput = document.querySelector('.popup__description-input');

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', function () {
  popup.classList.remove('popup_opened');
});

