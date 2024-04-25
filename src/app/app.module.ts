import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplaySingleComponent } from './components/display-single/display-single.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { environment } from 'src/environments/enrironments'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ManagerSingleComponent } from './components/manager-single/manager-single.component';
import { DisplayDoubleComponent } from './components/display-double/display-double.component';
import { ManagerDoubleComponent } from './components/manager-double/manager-double.component';
import { ModeSelectorComponent } from './components/mode-selector/mode-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplaySingleComponent,
    ManagerSingleComponent,
    DisplayDoubleComponent,
    ManagerDoubleComponent,
    ModeSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
