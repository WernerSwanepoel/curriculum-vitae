import { Component, AfterViewInit, Input } from '@angular/core';

import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lf-map',
  templateUrl: './cs-map.component.html',
  styleUrls: ['./cs-map.component.scss']
})

export class CsMapComponent implements AfterViewInit {
  map: Leaflet.Map;

  @Input()
  coordinates: any;
  defaultCoordinates = [28.644800, 77.216721];

  constructor() { }
  ngAfterViewInit(): void {
    this.renderMap();
  }

  renderMap() {
    this.refreshMap();

    // TODO: pass in params for view location & pins
  }

  refreshMap() {
    // tslint:disable-next-line: only-arrow-functions
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }
}
