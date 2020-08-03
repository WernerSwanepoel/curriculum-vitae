import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import {
  faEnvelope, faPhone, faTimes,
  faMapMarkerAlt, IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { Contact } from '../model/contact.model';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.component.responsivity.scss']
})

export class ContactComponent implements OnInit, AfterViewInit {

  name: string;
  email: string;
  phone: string;
  location: string;
  map: Leaflet.Map;

  faEnvelope: IconDefinition;
  faPhone: IconDefinition;
  faMapMarkerAlt: IconDefinition;
  faTimes: IconDefinition;

  isLoading: boolean = false;
  hasBeenSubmited: boolean = false;
  feedbackStatus: string;

  constructor(private contactService: ContactService) { }
  
  ngOnInit(): void {
    this.name = 'Werner Swanepoel';
    this.email = 'wwwerner.swan@gmail.com';
    this.phone = '+27(0) 60 988 0518';
    this.location = 'Pretoria, South Africa';

    this.faEnvelope = faEnvelope;
    this.faPhone = faPhone;
    this.faMapMarkerAlt = faMapMarkerAlt;
    this.faTimes = faTimes;
  }

  ngAfterViewInit(): void {

    this.map = Leaflet.map('map').setView([-25.731340, 28.218370], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    Leaflet.marker([-25.731340, 28.218370]).addTo(this.map).bindPopup('Pretoria');
  }

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-zÀ-ú ]*")
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    message: new FormControl('',[
      Validators.required
    ])
  }); 

  get senderEmail() {
    return this.contactForm.get('email')
  }

  get senderName() {
    return this.contactForm.get('name')
  }

  get senderMessage() {
    return this.contactForm.get('message')
  }

  get options() {
    return this.contactForm.get('options')
  }


  saveContact(contact: Contact) {
    this.contactService.createContact(contact).then(() => {
      this.displayUserInterfaceMessage(true);
    })
    .catch(error => {
      this.displayUserInterfaceMessage(false);
    });
  }
  
  displayUserInterfaceMessage(hasBeenSuccessfuly: boolean) {
    this.isLoading = false;
    this.hasBeenSubmited = true;
    this.feedbackStatus = hasBeenSuccessfuly? "success" : "error";
    this.contactForm.reset();
  }

  closeFeedbackMessage() {
    this.hasBeenSubmited = false;
    this.feedbackStatus = "";
  }

  onSubmit(contactForm) {
    this.isLoading = true;

    const contactValues: Contact = {
      name: this.senderName.value,
      email: this.senderEmail.value,
      message: this.senderMessage.value,
      date: new Date()
    } as Contact;

    this.saveContact(contactValues);
  }
}