import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { HomeComponent } from './home/home.component';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { FrontFooterComponent } from './front-footer/front-footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AdsenseModule } from 'ng2-adsense';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FrontHeaderComponent,
    FrontFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    SlickCarouselModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
