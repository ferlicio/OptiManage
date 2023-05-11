import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat/'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {} from '@angular/fire/compat/storage'
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { AitTableModule } from './widget/ait-table/ait-table.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AitTableModule,
    HttpClientModule,
  ],
  exports:[
    MaterialModule,
    AitTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
