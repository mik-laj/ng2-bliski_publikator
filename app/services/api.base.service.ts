import { Injectable } from 'angular2/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export abstract class BaseApiService {
    private _apiUrl = 'http://localhost:3005/api/';
    constructor(protected _http: Http) { }

    protected simple_post(entry, data){
        let url = this._apiUrl + entry;
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log({ body, headers, options });
        return this._http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    protected simple_get(entry, qs = {}){
        let url = this._apiUrl + entry;
        return this._http.get(url)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    protected handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
