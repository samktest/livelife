import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

/*
  Generated class for the InterestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterestProvider {
  _interestlist: any;	
  constructor(private storage: Storage, public api: Api) {
    console.log('Hello InterestProvider Provider');
  }

  /**
   * Send a GET request to fetch all interest
   * and show them on interest list page
   */
  getinterestlist(reqs) {    
    let seq = this.api.get('/api/allinterest', {token:reqs.auth_token}, {headers:{'Authorization':reqs.auth_token}}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, get list of questions in variable
      if (res.length > 0 ) {
        this._interestlist=res;
      }
    }, err => {
      //console.error('ERROR', err);
    });

    return seq;
  }

}
