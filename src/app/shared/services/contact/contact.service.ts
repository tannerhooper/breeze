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
    this.addContact(new Contact({Name: "Darth Vader", Address: this.getRandAdr(), Email: "dark@father.com", Phone: `${this.getRandRange(1000000000,10000000000)}`}));
    this.addContact(new Contact({Name: "Zac Yolo", Address: this.getRandAdr(), Email: "zac@yolo.com", Phone: `${this.getRandRange(1000000000,10000000000)}`}));
    this.addContact(new Contact({Name: "Bob Rando", Address: this.getRandAdr(), Email: "bob@rando.com", Phone: `${this.getRandRange(1000000000,10000000000)}`}));
    this.addContact(new Contact({Name: "Jill Bubcheck", Address: this.getRandAdr(), Email: "jill@bubcheck.com", Phone: `${this.getRandRange(1000000000,10000000000)}`}));
  }

  private streets = ['N','S','E','W'];
  private getRandAdr(){
    let first = this.streets[this.getRandRange(0,this.streets.length)];
    let edit = this.streets.filter(x => x !== first);
    let sec = edit[this.getRandRange(0,edit.length)];
    return `${this.getRandRange(0,10000)} ${first} ${this.getRandRange(0,10000)} ${sec}`;
  }
  private getRandRange(min:number, max:number){ return Math.floor(Math.random() * (max - min) + min); }
}
