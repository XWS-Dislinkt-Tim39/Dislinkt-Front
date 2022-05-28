import { Injectable } from '@angular/core';
import { UpdateUser } from '../models/updateUser.model';
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

  updateUserDetails(editedUser:UpdateUser){
      let userDetails= JSON.parse(localStorage.getItem('userDetails') || '');
      userDetails.user.firstName=editedUser.firstName;
      userDetails.user.lastName=editedUser.lastName;
      userDetails.user.address=editedUser.address;
      userDetails.user.city=editedUser.city;
      userDetails.user.country=editedUser.country;
      userDetails.user.emailAddress=editedUser.emailAddress;
      userDetails.user.phoneNumber=editedUser.phoneNumber;
      userDetails.user.biography=editedUser.biography;
      userDetails.user.dateOfBirth=editedUser.dateOfBirth;
      localStorage.removeItem('userDetails');
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
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

  getUserId():string{
    let userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      let userDetails= JSON.parse(userDetailsString || '');
      return userDetails.user.id;
    }
    return '';
  }

}
