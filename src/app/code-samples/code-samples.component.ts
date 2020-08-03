import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import {
  faEnvelope, faPhone, faTimes,
  faMapMarkerAlt, IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../model/contact.model';

import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-code-samples',
  templateUrl: './code-samples.component.html',
  styleUrls: ['./code-samples.component.scss', './code-samples.component.responsivity.scss']
})

export class CodeSamplesComponent implements OnInit, AfterViewInit {
  
  name: string;
  email: string;
  phone: string;
  location: string;
    
  faEnvelope: IconDefinition;
  faPhone: IconDefinition;
  faMapMarkerAlt: IconDefinition;
  faTimes: IconDefinition;

  isLoading: boolean = false;
  hasBeenSubmited: boolean = false;
  feedbackStatus: string;

  map: Leaflet.Map;

  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {

  }

  closeFeedbackMessage() {
    this.hasBeenSubmited = false;
    this.feedbackStatus = '';
  }
}