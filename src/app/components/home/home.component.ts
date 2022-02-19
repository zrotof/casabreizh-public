import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, first, map } from 'rxjs/operators';

import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { EffectFade, Pagination, Navigation  } from "swiper";

SwiperCore.use([EffectFade, Pagination, Navigation])

//importing aos an animation library
declare var AOS: any;


//importing fontawesome icons
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faCalendarAlt, faPhone, faEnvelope, faPaperPlane, faInfoCircle, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ProduitsService } from '../../services/produits.service';
import { Produit } from '../../models/produit';
import { Temoignage } from '../../models/temoignage';

import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router, NavigationEnd} from '@angular/router';
import { Observable, of } from 'rxjs';

declare var google: { maps: { Animation: { DROP: any; }; }; };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarAlt = faCalendarAlt;
  faPhone = faPhone ;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faInfoCircle = faInfoCircle;
  faClock = faClock;
  faCheck = faCheck;

    //variables for home header slide
    
    counter:number = 1;
    timer: any;

    //Variable telling if first time slide
    isFirstTimeSlide: boolean = true;

    recommendedProducts: Produit[] = [];
    poissonsArray: Produit[] = [];
    dessertsArray: Produit[] = [];
    testimoniesArray: Temoignage[] = [];

  //Map options
  options: google.maps.MapOptions = {
    center: {lat:48.121950, lng:-1.662520 },
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: "hybrid"
  };

  //map centré sur
  
  marker =
    {
    position: {
      lat:48.121950, lng:-1.662520
    },
    info: "CASABREIZH",
  
  } ;

  isBurgerMenuClicked: boolean = false;



   currentLinkNumber = 1;
   currentAnchorTag ="accueil";


//variable that allow to know if the API of google is correctly load
   apiLoaded: Observable<boolean> ;

  constructor( 
    httpClient: HttpClient, 
    private produitService: ProduitsService, 
    private router: Router,
     ) {
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }




   ngOnInit(): void {

   this.redirectOnLoad();

    AOS.init();

    this.getRecommendedProducts();
    this.getPoissonsArray();
    this.getDessertArray();
    this.getTestimonies();

  }


//Setting the active link
  setActiveLink(linkNumber: number){

    var myLinks = <NodeListOf<HTMLElement>>document.querySelectorAll("li a");
    var navSmallScreen = <HTMLElement>document.querySelector('.header-right');
    var inputstatus = <HTMLInputElement>document.querySelector('.burger input');
    
    myLinks.forEach(element =>{
      element.classList.remove("active-link");
    })

    myLinks[linkNumber - 1].classList.add("active-link");

    // À chaque clique sur l'input on vérifie si l'input est cochée
    if(inputstatus.checked === true){
      navSmallScreen.classList.toggle("toggle-nav");
      inputstatus.checked = false;
    }
  }

  //Navigate to an anchor
  navigateToAnchor(targetAnchor: string){
    this.router.navigate([], { fragment: targetAnchor });
  }


  //Redirect to the good link on load so that this link will be acttivated
   redirectOnLoad(){

     this.router.events.pipe(first()).subscribe( event => {
     if(event instanceof NavigationEnd){



      var nav = this.router.url

      console.log(nav);

      if(nav == "/#a-propos"){
        this.currentLinkNumber = 2;
        this.currentAnchorTag = "a-propos"
      }
  
      else if(nav == "/#commandez"){
        this.currentLinkNumber = 3;
        this.currentAnchorTag = "commandez"
      }
  
      else if(nav == "/#carte"){
        this.currentLinkNumber = 4;
        this.currentAnchorTag = "carte"
      }
  
      else if(nav == "/#témoignages"){
        this.currentLinkNumber = 5;
        this.currentAnchorTag = "temoignages"
      }
  
      else if(nav == "/#contact"){
        this.currentLinkNumber = 6;
        this.currentAnchorTag = "contact"
      }


    }
    this.setActiveLinkAndNavigate(this.currentLinkNumber, this.currentAnchorTag);

   }

   )   
  }

    //Setting the link 
  //Toggle screen menu when on small devices 
  setActiveLinkAndNavigate(linkNumber: number, targetAnchor: string){

    this.setActiveLink(linkNumber);
    this.navigateToAnchor(targetAnchor);

  }

  //Handling click on burger menu
  onBurgerMenu(){
    var navSmallScreen = <HTMLElement>document.querySelector('.header-right');
    var inputstatus = <HTMLInputElement>document.querySelector('.burger input');

    // À chaque clique sur l'input on vérifie si l'input est cochée
    if(inputstatus.checked === true){
      
      navSmallScreen.classList.toggle("toggle-nav")

      this.isBurgerMenuClicked = true;

    }
    else{
      navSmallScreen.classList.toggle("toggle-nav");
      
    }
  }

 

  arrowSlide(param: number){

    if(param > 0){
      this.swiper?.swiperRef.slideNext(700);
      console.log('inside');
    }
    else{
      this.swiper?.swiperRef.slidePrev(700);
    }
  }


//Handling click on tabs menu
  chooseTab(tabNumber: number){
    var myTabMenu = <NodeListOf<HTMLElement>>document.querySelectorAll(".tab-menu");
    var myTabpages = <NodeListOf<HTMLElement>>document.querySelectorAll(".tab-page");

    myTabMenu.forEach(element =>{
      element.classList.remove("active-tab-menu");
    })

    myTabpages.forEach(element =>{
      element.classList.remove("active-tab-page");
    })

    myTabMenu[tabNumber - 1].classList.add("active-tab-menu");
    myTabpages[tabNumber - 1].classList.add("active-tab-page");

  }

  //Gettingrecommended product
  getRecommendedProducts(){
    this.recommendedProducts = this.produitService.getRecommendedProducts();
  }

  //Getting fishes arrays
  getPoissonsArray(){
    this.poissonsArray = this.produitService.getPlatsPoissons();
  }

  //Getting desserts arrays
  getDessertArray(){
    this.dessertsArray = this.produitService.getDesserts();
  }



  

  // Handling testimony arrow click

  testimonyClickPrev(){
    var testimonyCarousselContainer = <HTMLElement>document.querySelector(".testimony-caroussel-container");
    var allTestimonyCarousselElements = <NodeListOf<HTMLElement>>document.querySelectorAll(".testimony-element");
    testimonyCarousselContainer.prepend(allTestimonyCarousselElements[allTestimonyCarousselElements.length-1]);
   
  }

  testimonyClickNext(){
    var testimonyCarousselContainer = <HTMLElement>document.querySelector(".testimony-caroussel-container");
    var allTestimonyCarousselElements = <NodeListOf<HTMLElement>>document.querySelectorAll(".testimony-element");
    testimonyCarousselContainer.append(allTestimonyCarousselElements[0]);
   
  }

  //Getting testimonies arrays
  getTestimonies(){
    this.testimoniesArray =  this.produitService.getTestimonies();
  }

  //Google Map function  displaying information when red icon on the map is clicked
  openMapInfo(marker: MapMarker) {
     this.info.open(marker);
  }

}

