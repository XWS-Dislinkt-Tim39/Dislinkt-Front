import { Injectable } from '@angular/core';
import { UserToken } from '../models/user-token.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getUserDetails(): any {
    let userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      return JSON.parse(userDetails || '');
    }
    return null;
  }

  saveUserDetails(userToken: string): void {
    localStorage.setItem('userDetails', JSON.stringify(userToken));
  }

  destroyUserDetails(): void {
    localStorage.removeItem('userDetails');
  }

  getRole(): string {
    let userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      let userDetails: UserToken = JSON.parse(userDetailsString || '');
      return userDetails.role;
    }
    return '';
  }

}
