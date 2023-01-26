export class UserInfo {
  constructor(profileSelectors) {
    this._profileName = document.querySelector(profileSelectors.name);
    this._profileJob = document.querySelector(profileSelectors.job);
  }

  getUserInfo() {
    this._profileData = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
    return this._profileData;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.job;
  }
}
