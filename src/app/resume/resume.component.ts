import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { debounce } from '../core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css', './resume.component.responsivity.css']
})
export class ResumeComponent implements OnInit {

  isSticky: boolean = false;
  activeSection: string;

  pageYOffset: number = 0;
  pageXOffset: number;

  // tslint:disable-next-line: variable-name
  constructor(_router: Router) {
    this.checkResize();
  }

  @HostListener('window:scroll')
  @debounce()
  checkScroll() {
    this.pageYOffset = window.pageYOffset;
    this.isSticky = pageYOffset >= 250;
  }

  @HostListener('window:resize')
  @debounce(25)
  checkResize() {
    this.pageXOffset = window.innerWidth;
  }

  ngOnInit(): void { }

  @debounce(150)
  onViewport(isOnViewPort: any, element?: string) {
    this.activeSection = element;
  }
}
