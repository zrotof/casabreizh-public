import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, first, map } from 'rxjs/operators';

//importing aos an animation library
declare var AOS: any;


//importing fontawesome icons
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faCalendarAlt, faPhone, faEnvelope, faPaperPlane, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { ProduitsService } from '../../services/produits.service';
import { Produit } from '../../models/produit';
import { Temoignage } from '../../models/temoignage';

import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProduitComponent } from '../produit/produit.component';
import { Router, NavigationEnd} from '@angular/router';
import { Observable, of } from 'rxjs';

declare var google: { maps: { Animation: { DROP: any; }; }; };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

    //variables for home header slide
    counter:number = 1;
    timer: any;

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

//variable that allow to know ifthe API of google is correctly load
   apiLoaded: Observable<boolean> ;

  constructor( httpClient: HttpClient, private produitService: ProduitsService, 
    private modalService: NgbModal, 
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

    this.slideFunction(this.counter);
    this.getPoissonsArray();
    this.getDessertArray();
    this.getTestimonies();

  }

  @HostListener('window:scroll', ['$event'])

//Changing backgroung on scroll of header
//changing the rigth active link when scolling

  onWindowScroll( ) {
      let header = <HTMLElement>document.querySelector('header');
      let accueil = <HTMLElement>document.querySelector('#accueil');
      let about = <HTMLElement>document.querySelector('.about');
      let commandez = <HTMLElement>document.querySelector('.a-emporter');
      let carte = <HTMLElement>document.querySelector('.carte');
      let temoignages = <HTMLElement>document.querySelector('.testinony-bloc');
      let contact = <HTMLElement>document.querySelector('.contact-bloc');


      //Setting the background color of the header to black after scroll
      if (window.pageYOffset > header.clientHeight) {
        header.classList.add('navbar-background-on-scroll');
      } else {
        header.classList.remove('navbar-background-on-scroll');
      }


      //changinthe color of link
      if(window.pageYOffset < accueil.offsetHeight -30){

        this.setActiveLink(1);
      }
      
      if ((window.pageYOffset < commandez.offsetTop) && window.pageYOffset > about.offsetTop - header.clientHeight) {
        
        this.setActiveLink(2);
      }

      if ((window.pageYOffset < carte.offsetTop) && window.pageYOffset > commandez.offsetTop - header.clientHeight) {
        
        this.setActiveLink(3);
      }

      if ((window.pageYOffset < temoignages.offsetTop) && window.pageYOffset > carte.offsetTop - header.clientHeight) {
        
        this.setActiveLink(4);
      }

      if ((window.pageYOffset < contact.offsetTop) && window.pageYOffset > temoignages.offsetTop - header.clientHeight) {
        
        this.setActiveLink(5);
      }

      if (window.pageYOffset > contact.offsetTop - header.clientHeight) {
        
        this.setActiveLink(6);
      }
  }

//Setting the active link
  setActiveLink(linkNumber: number){

    var myLinks = <NodeListOf<HTMLElement>>document.querySelectorAll("li span");
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
  
      else if(nav == "/#temoignages"){
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
    var menuText = <NodeListOf<HTMLElement>>document.querySelectorAll("a span");

    // À chaque clique sur l'input on vérifie si l'input est cochée
    if(inputstatus.checked === true){
      
      navSmallScreen.classList.toggle("toggle-nav")

      this.isBurgerMenuClicked = true;

    }
    else{
      navSmallScreen.classList.toggle("toggle-nav");
      
    }
  }


  //Function handling the slider
  slideFunction(slideNumber: number): void{
    var mySlides = <NodeListOf<HTMLElement>>document.querySelectorAll(".mySlide");
    var myDots = <NodeListOf<HTMLElement>>document.querySelectorAll(".dot");

    mySlides.forEach(element => {

      element.style.display = "none";
      
    });

    myDots.forEach(element =>{
      element.classList.remove("active-dot");
    })

    if(slideNumber > mySlides.length){
      this.counter = 1;
    }

    if(slideNumber < 1){
      this.counter = mySlides.length;
    }

    mySlides[this.counter - 1].style.display ="block";

    myDots[this.counter - 1].classList.add("active-dot");

  }

  //chage slide to the next slide after 8 secondes 
  autoSlide() {
    this.counter += 1;
    //console.log("auto work");
    //this.slideFunction(this.counter);
  }

   //Show the next or prev slide when click on plus or minus sign arrows
   clickOnArrow(num: number): any{
    this.counter += num;
    this.slideFunction(this.counter);
    this.resetTimer();
  }

  //Show corresponding clicked dot 
  currentSlide(slideNumber: number):any{
    this.counter = slideNumber;

    this.slideFunction(this.counter);
    this.resetTimer();

  }

  //reset the timer to 0 and relaunch the autoSlide funtion
  resetTimer():void{
    clearInterval(this.timer);
    this.timer = setInterval(this.autoSlide,8000);
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


  //Getting fishes arrays
  getPoissonsArray(){
    this.poissonsArray = this.produitService.getPlatsPoissons();
  }

  //Getting desserts arrays
  getDessertArray(){
    this.dessertsArray = this.produitService.getDesserts();
  }


  //Handling click on product
  openProduit(typeProduit: string, index: number){

      const produitRef = this.modalService.open(ProduitComponent);
      
      if(typeProduit == "poisson"){
        produitRef.componentInstance.currentProduit = this.poissonsArray[index];
      }
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

