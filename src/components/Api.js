export class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(
      this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    }).then(res => this._checkStatus(res));
  }

  getUserProfileData() {
    return fetch(
      this._url + '/users/me', {
        method: 'GET',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  updateUserProfileData(userData) {
    return fetch(
      this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      }).then(res => this._checkStatus(res));
  }

  changeUserProfileAvatar(avatarData){
    return fetch(
      this._url + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarData.avatar,
        })
      }).then(res => this._checkStatus(res));
  }

  addCard(cardData){
    return fetch(
      this._url + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      }).then(res => this._checkStatus(res));
  }

  removeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  likeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  dislikeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  _checkStatus(res) {
    if (res.ok)
      return res.json();

    return console.log(`Ошибка: ${res.status}`);
  }
}
