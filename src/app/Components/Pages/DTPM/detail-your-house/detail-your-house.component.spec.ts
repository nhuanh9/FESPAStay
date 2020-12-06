import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailYourHouseComponent } from './detail-your-house.component';

describe('DetailYourHouseComponent', () => {
  let component: DetailYourHouseComponent;
  let fixture: ComponentFixture<DetailYourHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailYourHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailYourHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
