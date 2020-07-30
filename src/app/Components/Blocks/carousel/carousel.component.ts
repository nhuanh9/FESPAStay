import {Component, OnInit} from '@angular/core';
import {HouseImages} from "../../../model/houseImages";
import {Subscription} from "rxjs";
import {HouseImagesService} from "../../../Services/house-images.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentFixtureAutoDetect} from "@angular/core/testing";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
})
export class CarouselComponent implements OnInit {
  houseImages: HouseImages[];
  sub: Subscription;

  constructor(private houseImagesService: HouseImagesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
