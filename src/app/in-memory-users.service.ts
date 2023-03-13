import { Injectable } from '@angular/core';
import { LDAP_USERS } from './model/ldap-mock-data';
import { UserLdap } from './model/user-ldap';
import { InMemoryDbService } from 'angular-in-memory-web-api';



@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {
  createDb(){
    console.log('InMemoryUsersService.createDB');
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }

  genId(users: UserLdap[]): number{
    console.log('InMemoryUsersService.genId');
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1:4;
  }

}
