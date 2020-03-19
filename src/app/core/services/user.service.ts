import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from "../../../config.json";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }

    public createUser(id) {
        return this.http.post(`${config.api.invokeUrl}/users`, {id});
    }
    
}