import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _questions: any;
 
  constructor(private storage: Storage, public api: Api) {
    this.storage.get('userdata').then((data) => {
        this._user = data;
    });
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    
    let seq = this.api.post('/api/auth/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.user.user_id>0) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('/api/signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.user.auth_token) {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /**
   * Send a GET request to fetch entry questions
   * which is voted by user on questions page
   */
  entryquestions(reqs) {
    
    let seq = this.api.get('/api/allquestions', {token:reqs.user.auth_token}, {headers:{'Authorization':reqs.user.auth_token}}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, get list of questions in variable
      if (res.length > 0 ) {
        this._questions=res;
      }
    }, err => {
      //console.error('ERROR', err);
    });

    return seq;
  }
  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove('userdata');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.storage.set('userdata', resp.user);
    this._user = resp.user;
  }

  /**
  * RESET PASSWORD REQUEST BY USER
  **/ 
  forgot(accountInfo: any) {
    
    let seq = this.api.post('/api/password/forgot', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, redirect user to update password
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /**
  * RESET PASSWORD BY USING TOKEN FROM MAIL
  **/ 
  reset(accountInfo: any) {
    
    let seq = this.api.post('/api/password/reset', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, redirect user to update password
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}

