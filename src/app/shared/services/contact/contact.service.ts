import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { }
  Contacts: Contact[] = [];

  /**
   * getContacts
   */
  public getContacts(): Contact[] {
    return this.Contacts;
  }

  /**
   * addContact
   */
  public addContact(con: Contact): Contact | null {
    let indx: number = this.Contacts.indexOf(con);
    if (indx < 0) { //Contact doesn't exist yet
      this.Contacts.push(con);
      return con;
    }
    return null;
  }

  /**
   * updateContact
   */
  public updateContact(con: Contact): Contact | null {
    let indx: number = this.Contacts.indexOf(con);
    if (indx >= 0) { //Contact exists
      this.Contacts[indx] = con;
      return con;
    }
    return null;
  }

  /**
   * deleteContact
   */
  public deleteContact(con: Contact): boolean {
    let indx: number = this.Contacts.indexOf(con);
    if (indx >= 0) { //Contact exists to delete
      let beg = this.Contacts.slice(0,indx);
      let end = this.Contacts.slice(indx+1,this.Contacts.length);
      this.Contacts = beg.concat(end);
      return true;
    }
    return false;
  }
}
