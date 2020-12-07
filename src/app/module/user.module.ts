
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateUserProfileComponent} from '../Components/Pages/users/update-user-profile/update-user-profile.component';
import {ListYourHouseComponent} from '../Components/Pages/users/list-your-house/list-your-house.component';
import {YourOrdersComponent} from '../Components/Pages/users/your-orders/your-orders.component';
import {ProfileComponent} from '../Components/Pages/users/profile/profile.component';
import {ListYourRoomsComponent} from '../Components/Pages/users/list-your-rooms/list-your-rooms.component';
const routes: Routes = [
  {
    path: 'house',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./house.module').then(module => module.HouseModule)
  },
  {
    path: 'update-profile/:id',
    component: UpdateUserProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'list-your-house',
    component: ListYourHouseComponent
  },
  {
    path: 'list-orders/:id',
    component: YourOrdersComponent
  }
];

@NgModule({
  declarations: [
    UpdateUserProfileComponent,
    ListYourHouseComponent,
    YourOrdersComponent,
    ProfileComponent,
    ListYourRoomsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class UserModule {
}
