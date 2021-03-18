import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private _contactService: ContactService
    ) {
    this.refreshList();
  }
  ngOnInit(): void {
  }
  Contacts: Contact[];
  ogContacts: Contact[];
  selectedContact?: Contact;
  private none: string = 'sort';
  private up: string = 'keyboard_arrow_up';
  private down: string = 'keyboard_arrow_down';
  icon: string = this.none;

  refreshList(){
    this.ogContacts = this._contactService.getContacts();
    this.Contacts = this.ogContacts.slice();
  }

  seed(){
    this._contactService.seedContacts();
    this.refreshList();
  }

  sortData(){
    const data = this.Contacts.slice();
    switch(this.icon){
      case this.none: 
        this.icon = this.up;
        this.Contacts = data.sort((a,b) => this.compare(a.Name,b.Name))
        break;
      case this.up:
        this.icon = this.down;
        this.Contacts = data.sort((a,b) => this.compare(b.Name,a.Name))
        break;
      case this.down:
        this.icon = this.none;
        this.Contacts = this.ogContacts.slice();
        break;
    }
  }

  compare(a:any,b:any): number{
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  }
}
