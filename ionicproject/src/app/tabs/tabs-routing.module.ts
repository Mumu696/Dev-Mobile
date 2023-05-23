import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children :[

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },

      {
        path: 'bluetooth',
        loadChildren: () => import('../bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
      },
      {
        path: 'device',
        loadChildren: () => import('../device/device.module').then( m => m.DevicePageModule)
      },
      {
        path: 'apropos',
        loadChildren: () => import('../apropos/apropos.module').then( m => m.AproposPageModule)
      },


    ]
  },


      {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
      },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
