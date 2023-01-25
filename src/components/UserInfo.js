export class UserInfo {
  constructor(profileSelectors) {
    this._profileName = profileSelectors.name;
    this._profileJob = profileSelectors.job;
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
