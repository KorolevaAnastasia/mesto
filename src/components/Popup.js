export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape')
        this.close();
    });
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup__overlay') &&
      this._popup.classList.contains('popup_opened'))
      this.close();
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
