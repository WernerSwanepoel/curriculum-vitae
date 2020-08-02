import { Component, AfterViewInit, Input } from '@angular/core';

import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cs-map',
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

    this.map = Leaflet.map('map').setView(this.coordinates ? this.coordinates : this.defaultCoordinates, 5);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }
}
