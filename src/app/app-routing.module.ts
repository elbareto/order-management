import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySingleComponent } from './components/display-single/display-single.component';
import { DisplayDoubleComponent } from './components/display-double/display-double.component';
import { ManagerSingleComponent } from './components/manager-single/manager-single.component';
import { ManagerDoubleComponent } from './components/manager-double/manager-double.component';
import { ModeSelectorComponent } from './components/mode-selector/mode-selector.component';

const routes: Routes = [
  {path: '', component: ModeSelectorComponent},
  {path: 'single/manager', component: ManagerSingleComponent},
  {path: 'single/display', component: DisplaySingleComponent},

  {path: 'double/manager', component: ManagerDoubleComponent},
  {path: 'double/display', component: DisplayDoubleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
