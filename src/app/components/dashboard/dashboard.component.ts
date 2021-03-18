import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private _contactService: ContactService) {
    this.Contacts = _contactService.getContacts();
  }
  ngOnInit(): void {
  }
  Contacts: Contact[];
  selectedContact?: Contact;
}
