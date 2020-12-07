import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './Components/Pages/users/register/register.component';
import {ListHouseComponent} from './Components/Pages/DTPM/list-house/list-house.component';
import {DetailHouseComponent} from './Components/Pages/house/detail-house/detail-house.component';
import {CreateHouseComponent} from './Components/Pages/house/create-house/create-house.component';
import {CarouselComponent} from './Components/Blocks/carousel/carousel.component';
import {LoginComponent} from './Components/Pages/users/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {CreateOrderComponent} from "./Components/Pages/DTPM/Order/create-order/create-order.component";


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: ListHouseComponent
  },
  {
    path: 'user/room/:id/createOrder',
    component: CreateOrderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./module/user.module').then(module => module.UserModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
