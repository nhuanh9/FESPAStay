import {Component, OnInit} from '@angular/core';
import {HouseImages} from "../../../model/houseImages";
import {Subscription} from "rxjs";
import {HouseImagesService} from "../../../Services/house-images.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  houseImages: HouseImages[];
  sub: Subscription;

  constructor(private houseImagesService: HouseImagesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.houseImagesService.getImagesByIdHouse('4').subscribe(result => {
      this.houseImages = result;
      console.log(this.houseImages);
    })
  }

}
