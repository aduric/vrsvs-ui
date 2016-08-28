import {FB, FacebookApiException} from 'fb';

export default class Facebook {
  constructor(acess_token) {
    this.fb = FB.withAccessToken(access_token);
  }

  getProfile() {
    this.fb.api('me', function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log(res);
    });
  }
}

