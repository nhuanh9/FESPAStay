import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {DetailRoomComponent} from '../Components/Pages/room/detail-room/detail-room.component';
import {AddRoomComponent} from '../Components/Pages/room/add-room/add-room.component';
import {EditRoomComponent} from '../Components/Pages/room/edit-room/edit-room.component';
import {CreateOrderComponent} from '../Components/Pages/room/Order/create-order/create-order.component';
import {ListOrderComponent} from '../Components/Pages/room/Order/list-order/list-order.component';
import {ListYourRoomsComponent} from '../Components/Pages/users/list-your-rooms/list-your-rooms.component';
import {DetailYourRoomsComponent} from '../Components/Pages/users/detail-your-rooms/detail-your-rooms.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

const routing: Routes = [
  {
    path: 'detail-room/:id',
    component: DetailRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-your-room/:id',
    component: DetailYourRoomsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-room/:id',
    component: EditRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/createOrder',
    component: CreateOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/list-order',
    component: ListOrderComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DetailRoomComponent,
    EditRoomComponent,
    CreateOrderComponent,
    ListOrderComponent,
    DetailYourRoomsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbRatingModule
    ]
})
export class RoomModule {
}
