import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { }
  private Contacts: Contact[] = [];

  public getContacts(): Contact[] {
    return this.Contacts;
  }

  public getContact(id: number): Contact {
    return this.Contacts.filter(x => x.Id == id)[0];
  }

  public addContact(con: Contact): Contact | null {
    let indx: number = this.Contacts.indexOf(con);
    if (indx < 0) { //Contact doesn't exist yet
      con.Id = this.Contacts.length+1;
      this.Contacts.push(con);
      return con;
    }
    return null;
  }

  public updateContact(con: Contact): Contact | null {
    let indx: number = this.Contacts.indexOf(con);
    if (indx >= 0) { //Contact exists
      this.Contacts[indx] = con;
      return con;
    }
    return null;
  }

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

  public seedContacts() {
    this.addContact(new Contact({Name: "Darth Vader", Address: `${this.getRand()} S ${this.getRand()} E`, Email: "billy@craig.com", Phone: "9924453466"}));
    this.addContact(new Contact({Name: "Zac Yolo", Address: `${this.getRand()} W ${this.getRand()} S`, Email: "zac@yolo.com", Phone: "3872993740"}));
    this.addContact(new Contact({Name: "Bob Rando", Address: `${this.getRand()} S ${this.getRand()} E`, Email: "bob@rando.com", Phone: "1231231234"}));
    this.addContact(new Contact({Name: "Jill Bubcheck", Address: `${this.getRand()} N ${this.getRand()} E`, Email: "jill@bubcheck.com", Phone: "112233445"}));
  }

  private getRand(){
    return Math.floor(Math.random() * 10000);
  }
}
