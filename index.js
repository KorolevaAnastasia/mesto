let close_button = document.querySelector('.popup__close-button');
let profile_edit_button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let form_element = document.querySelector('.popup');
let name_input = document.querySelector('.popup__name-input');
let job_input = document.querySelector('.popup__description-input');

close_button.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

profile_edit_button.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = name_input.value;
  document.querySelector('.profile__description').textContent = job_input.value;
}

form_element.addEventListener('submit', formSubmitHandler);
form_element.addEventListener('submit', function () {
  popup.classList.remove('popup_opened');
});

