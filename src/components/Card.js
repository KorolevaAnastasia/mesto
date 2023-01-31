export class Card {
  constructor({object, templateSelector, handleCardRemove}, handleCardClick, userId, api) {
    this._name = object.name;
    this._link = object.link;
    this._likes = object.likes;
    this._cardId = object._id;
    this._ownerId = object.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._userId = userId;

    this._api = api;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardName = this._element.querySelector('.card__name');
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteBtn = this._element.querySelector('.card__delete-button');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    if(this._ownerId !== this._userId) {
      this._deleteBtn.style.display = 'none';
    }

    if(this._likes.find((user) => this._userId === user._id)) {
      this._likeBtn.classList.add('card__like-button_active');
    }

    this._setEventListeners();
    return this._element;
  }

  removeCard() {
    this._deleteBtn.closest('.card').remove();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeEvent();
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleCardRemove();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeEvent() {
    if(this._likeBtn.classList.contains('card__like-button_active')){
      this._api.dislikeCard(this._cardId)
        .then((res) => {
          this._likeBtn.classList.remove('card__like-button_active');
          this._likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.likeCard(this._cardId)
        .then((res) => {
          this._likeBtn.classList.add('card__like-button_active');
          this._likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
