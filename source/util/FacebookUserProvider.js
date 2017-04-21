import {Facebook, FacebookApiException} from 'fb';

export default class FacebookUserProvider {
  constructor(access_token) {
    var options = {
      appId      : '288501908166908',
      xfbml      : true,
      version    : 'v2.7'
    };
    this.fb = new Facebook(options).withAccessToken(access_token);
  }

  getProvider() {
    return this.fb;
  }

  getProfile() {
    this.fb.api('me', function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log(res);
    return {};
    });
  }
  getFriends() {
    this.fb.api('me/friends', function(res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return [];
    }
    console.log(res)
    return res.data;
    });
  }
}

