import {cardImage, imagePopupDescription, imagePopup, openPopup} from "./index.js";

export class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._deleteBtn = this._element.querySelector('.card__delete-button');
    this._img = this._element.querySelector('.card__img');

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeEvent();
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteEvent();
    });

    this._img.addEventListener('click', () => {
      this._handleOpenEvent();
    });
  }

  _handleLikeEvent (){
    this._likeBtn.classList.toggle('card__like-button_active');
  }

  _handleDeleteEvent (){
    this._deleteBtn.closest('.card').remove();
  }

  _handleOpenEvent(){
    cardImage.src = this._link;
    cardImage.alt = this._name;
    imagePopupDescription.textContent = this._name;
    openPopup(imagePopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

}
