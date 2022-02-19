import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  screenWidth: any;
  
  isBurgerMenuClicked: boolean = false;


  currentLinkNumber = 1;
  currentAnchorTag ="accueil";

  constructor(
    private router: Router) 
    { }

  ngOnInit(): void {
    
    this.redirectOnLoad();
  }

  //Handling click on burger menu
  onBurgerMenu(){
    let navSmallScreen = <HTMLElement>document.querySelector('nav');
    let inputstatus = <HTMLInputElement>document.querySelector('.burger input');
    let header = <HTMLElement>document.querySelector('header');
    // À chaque clique sur l'input on vérifie si l'input est cochée
    if(inputstatus.checked === true){
      
      navSmallScreen.classList.toggle("toggle-nav")

      if (window.pageYOffset <= header.clientHeight) {
        header.classList.add('navbar-background-on-scroll');
      }
      this.isBurgerMenuClicked = true;
    }
    else{
      navSmallScreen.classList.toggle("toggle-nav");
      this.isBurgerMenuClicked = false;

      if (window.pageYOffset <= header.clientHeight) {
        header.classList.remove('navbar-background-on-scroll');
      }

    }
  }


  //Handling navigation on scroll

  @HostListener('window:scroll', ['$event'])

  //Changing backgroung on scroll of header menu 
  //changing the rigth active link when scolling
  
    onWindowScroll( ) {

      let header = <HTMLElement>document.querySelector('header');
      let accueil = <HTMLElement>document.querySelector('.accueil');
      let about = <HTMLElement>document.querySelector('.about');
      let commandez = <HTMLElement>document.querySelector('.commandez');
      let carte = <HTMLElement>document.querySelector('.carte');
      let temoignages = <HTMLElement>document.querySelector('.testinony-bloc');
      let contact = <HTMLElement>document.querySelector('.contact-bloc');

      if(!this.isBurgerMenuClicked){
        //Setting the background color of the header to black after scroll
        if (window.pageYOffset > header.clientHeight) {
          header.classList.add('navbar-background-on-scroll');
        } 
        else {
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
      }


//Redirect to the good link on load so that this link will be activated
   redirectOnLoad(){

    this.router.events.pipe(first()).subscribe( event => {
      if(event instanceof NavigationEnd){

     var nav = this.router.url

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

//Setting the active link
  setActiveLink(linkNumber: number){

    var myLinks = <NodeListOf<HTMLElement>>document.querySelectorAll("li a");
    var navSmallScreen = <HTMLElement>document.querySelector('nav');
    var inputstatus = <HTMLInputElement>document.querySelector('.burger input');
    
    myLinks.forEach(element =>{
      element.classList.remove("active-link");
    });

    myLinks[linkNumber - 1].classList.add("active-link");

    // À chaque clique sur l'input on vérifie si l'input est cochée
    if(inputstatus.checked === true){
      navSmallScreen.classList.toggle("toggle-nav");
      inputstatus.checked = false;
    }
  }

//Navigate to an anchor
  navigateToAnchor(targetAnchor: string){


    if(this.isBurgerMenuClicked === true){
      this.onBurgerMenu();
    }


    this.router.navigate([], { fragment: targetAnchor });
  }
}
