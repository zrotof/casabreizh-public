import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';


import { ProduitComponent } from './components/produit/produit.component';
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: "enabled",
  onSameUrlNavigation: 'reload',
  scrollOffset: [50, 50]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProduitComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    GoogleMapsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes, routerOptions),
    SwiperModule
  ],
  entryComponents: [
    ProduitComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
