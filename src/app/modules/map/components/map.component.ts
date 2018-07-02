import { Component, OnInit } from '@angular/core';
import { LatLng } from 'leaflet';
import { IndoorAtlasPaths } from '../components/map.model';
import { DEFAULT_MAP_OPTIONS, WAYPOINTS_LAYER } from '../components/map.config';
import { MapService } from './map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    options = DEFAULT_MAP_OPTIONS;
    center: LatLng | undefined;
    currentFloor: number;
    availableFloors: number[];
    indoorAtlasPaths: IndoorAtlasPaths;

    constructor(private mapService: MapService) {
        mapService.getAllPaths().subscribe((paths) => {
            this.indoorAtlasPaths = paths;
        });
        mapService.getAllAvailableFloors().subscribe((floors) => {
            this.availableFloors = floors;
            if (!this.currentFloor) {
                this.currentFloor = floors[0];
            }
        });
        mapService.getAllMapWayPoints().subscribe((waypoints) => {
            WAYPOINTS_LAYER.addData(waypoints);
        });
    }

    async ngOnInit() {
        this.center = await this.mapService.getCurrentPosition();
    }

    setFloor(floorNum: number) {
        this.currentFloor = floorNum;
    }
}
