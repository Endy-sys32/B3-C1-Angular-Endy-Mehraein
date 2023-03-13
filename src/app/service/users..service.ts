import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private static users: UserLdap[] = LDAP_USERS;
  private usersUrl = 'api/users';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
    this.usersUrl = environment.userApiUrl;
  }

  addUser(user: UserLdap): Observable<UserLdap>{
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    });
  }

  updateUser(user:UserLdap): Observable<UserLdap>{
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user,{headers: this.httpOptions});
  }

  deleteUser(id: number): Observable<UserLdap>{
    return this.http.put<UserLdap>(this.usersUrl + '/' + id, {headers: this.httpOptions});
  }

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(id: number): Observable<UserLdap>{
    return this.http.get<UserLdap>(this.usersUrl + '/' +id);
  }


}
