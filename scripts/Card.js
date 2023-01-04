export class Card {
  constructor(object, templateSelector, handleCardClick) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardName = this._element.querySelector('.card__name');
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._deleteBtn = this._element.querySelector('.card__delete-button');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardName.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeEvent();
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteEvent();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeEvent (){
    this._likeBtn.classList.toggle('card__like-button_active');
  }

  _handleDeleteEvent (){
    this._deleteBtn.closest('.card').remove();
  }

}
