import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { faBars, faShareAlt, faCloudDownloadAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.responsivity.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: variable-name
  private _activeSection: any;
  // tslint:disable-next-line: variable-name
  private _pageXOffset: any;
  private ngNavigatorShareService: NgNavigatorShareService;

  hasMenuToggled: boolean;
  faBars: IconDefinition;
  faShareAlt: IconDefinition;
  faCloudDownloadAlt: IconDefinition;

  @ViewChild('nav') nav: ElementRef;
  @ViewChild('shareBtn') shareBtn: ElementRef;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private renderer: Renderer2,
    ngNavigatorShareService: NgNavigatorShareService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  // use getter setter to define the properties
  get activeSection(): any {
    return this._activeSection;
  }

  get pageXOffset(): any {
    return this._pageXOffset;
  }

  @Input()
  set pageXOffset(value: any) {
    this._pageXOffset = value;
    this.onDetectScreenSize();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  @Input()
  set activeSection(value: any) {
    this._activeSection = value;
    this.updateNavigation();
  }

  ngAfterViewInit() {
      // Share button available only for browsers that do support it.
      if (this.ngNavigatorShareService.canShare()) {
        this.shareBtn.nativeElement.style.display ='block';
      }
  }

  ngOnInit(): void {
    this.faBars = faBars;
    this.faShareAlt = faShareAlt;
    this.faCloudDownloadAlt = faCloudDownloadAlt;
  }

  private updateNavigation() {

    if(this._activeSection && this.renderer) {

      // Remove any selected anchor
      const activePreviousElem = this.nav.nativeElement.querySelector('a.active');

      if(activePreviousElem) {
        this.renderer.removeClass(activePreviousElem, 'active');
      }

      const targetElem = this.nav.nativeElement.querySelector(`a[href^="#${this._activeSection}"]`);
      if(targetElem) {
        this.renderer.addClass(targetElem, 'active');
      }
    }
  }

  /*
   * For media types such as tablets and mobile devices, the nav-bar navigation should be
   * collapsed by default.
  */
  private onDetectScreenSize() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  onToggleBar() {
    this.hasMenuToggled = !this.hasMenuToggled;
  }

  resetMenu() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  async share() {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: '`Live CV - Werner Swanepoel',
        // tslint:disable-next-line: max-line-length
        text: `Hello, I'm a Full-stack .NET Web Developer with a lot of experience designing web and mobile projects since 2014 December. Find out more in my curriculum-vitae!`,
        url: 'https://wernerswanepoel.github.io/curriculum-vitae/'
      });
    } catch (error) {
      console.log('You app is not shared, reason: ', error);
    }
  }
}
