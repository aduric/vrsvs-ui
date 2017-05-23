import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events'
import { ManagementClient } from 'auth0';

export default class AuthService extends EventEmitter {

  constructor(clientId, key, domain) {
    super();
    // Configure Auth0
    var options = {
      languageDictionary: {
        signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>.",
        title: "vrsvs",
      },
      theme: {
        logo: "svg/vrsvs_icon.svg#Bear_logo",
        primaryColor: "green",
      }      
    }
    this.lock = new Auth0Lock(clientId, domain, options);
    this.management = new ManagementClient({
      token: key,
      domain: domain
    });
    // Add callback for lock `authenticated` event - NOT WORKING
    this.lock.on('authenticated', this._doAuthentication.bind(this));
     // Add callback for lock `authorization_error` event - NOT WORKING
    this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
  }

  _doAuthentication(authResult) {
    console.log('doing auth too2')
    // Saves the user token
    console.log(authResult);
    this.setToken(authResult.idToken)
    // Async loads the user profile data
    this.lock.getUserInfo(authResult.accessToken, this.getUserInformation)
  }

  getUserInformation(error, profile) {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        console.log('getting profile')
        console.log(profile)
        this.setProfile(profile)
      }
  }

  _authorizationError(authResult) {
    console.log('Error authorizing: ' + authResult)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  login(setLoginState) {
    // Call the show method to display the widget.
    console.log('in login')
    //this.lock.show();
    
    this.lock.show({
      focusInput: false,
      popup: true,
    }, function (err, profile, token) {
      if (err) {
        console.log('Error loading the Profile', err)
      } else {
        // Saves the user token
        console.log(authResult);
        this.setToken(authResult.idToken)
        // Async loads the user profile data
        this.lock.getUserInfo(authResult.accessToken, this.getUserInformation)
        setLoginState({isLoggedIn: true})
      }
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to localStorage
    console.log('setting token')
    localStorage.setItem('id_token', idToken)
  }

  setAccessToken(accessToken) {
    // Saves user token to localStorage
    localStorage.setItem('access_token', accessToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  getAccessToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('access_token')
  }

  logout() {
    console.log("In logout");
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    this.emit('logged_out')
  }
}

