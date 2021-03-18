import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../shared/services/contact/contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snakeBar: MatSnackBar,
  ) {
    this.allContacts = this.contactService.getContacts();
  }

  ngOnInit(): void {
    this.getContact();
    if (this.contact === undefined) {
      this.contact = new Contact();
      this.form.enable();
      this.isDetail = true;
    }
    else this.form.disable();
    this.toggleColor();
  }

  @Input() contact: Contact;
  form = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });
  editColor: ThemePalette;
  allContacts: Contact[];
  isDetail: boolean = false;

  getContact(){
    const id =  this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.contact = this.allContacts.filter(x => x.Id == parseInt(id))[0];
      this.isDetail = true;
    }
  }

  save(){
    let updated = this.doesExist() ? this.contactService.updateContact(this.contact) : this.contactService.addContact(this.contact);
    this.contact = updated != null ? updated : new Contact();
    this.toggleEdit();
    this.form.markAsPristine()
    let message = updated != null ? "Saved Successfully": "FAILED to Save";
    this.triggerSnak(message);
  }

  toggleEdit(){
    this.form.disabled ? this.form.enable() : this.form.disable();
    this.toggleColor();
  }

  toggleColor(){ this.form.enabled ? this.editColor = 'warn' : this.editColor = 'primary'; }

  delete(){
    let didDel = this.contactService.deleteContact(this.contact);
    let message = didDel ? "Deleted Successfully": "FAILED to Delete";
    this.routeToDash().then((navi:boolean) => { if (navi) this.triggerSnak(message); });
  }

  triggerSnak(msg:string){ this.snakeBar.open(msg,'',{duration:3000}); }

  doesExist(){ return this.contact.Id != null && this.contact.Id != undefined && this.contact.Id > -1; }

  routeToDash(){
    return this.router.navigate(['dashboard'],{ relativeTo: this.route.parent });
  }

  validateForm(){
    let valid = this.contact.Name !== undefined &&
                this.contact.Address !== undefined &&
                this.contact.Email !== undefined &&
                this.contact.Phone !== undefined &&
                this.form.dirty;
    return !valid;
  }
}
