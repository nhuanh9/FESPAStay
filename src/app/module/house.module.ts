import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {DetailHouseComponent} from '../Components/Pages/house/detail-house/detail-house.component';
import {CreateHouseComponent} from '../Components/Pages/house/create-house/create-house.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditHouseComponent} from '../Components/Pages/house/edit-house/edit-house.component';
import {AddRoomComponent} from '../Components/Pages/room/add-room/add-room.component';
import {DetailYourHouseComponent} from '../Components/Pages/DTPM/detail-your-house/detail-your-house.component';
import {ListOrderComponent} from "../Components/Pages/DTPM/Order/list-order/list-order.component";

const routing: Routes = [
  {
    path: 'detail-house/:id',
    component: DetailHouseComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'detail-your-house/:id',
    component: DetailYourHouseComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'create-house',
    component: CreateHouseComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'detail-house/:id/create-room',
    component: AddRoomComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-house/:id',
    component: EditHouseComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'orders',
    component: ListOrderComponent
  }
];

@NgModule({
  declarations: [
    DetailHouseComponent,
    CreateHouseComponent,
    AddRoomComponent,
    EditHouseComponent,
    DetailYourHouseComponent,
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule
  ]
})
export class HouseModule {
}
