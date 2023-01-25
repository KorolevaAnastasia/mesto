import {Popup} from "./Popup";

export class PopupWithForm  extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');

    this._submitFormCallback = submitFormCallback;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._submitFormCallback(this._getInputValues());
      evt.preventDefault();
      super.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
