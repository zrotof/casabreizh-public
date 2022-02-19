import { Injectable } from '@angular/core';

import { Produit } from '../models/produit';
import { Temoignage } from '../models/temoignage';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor() { }


  //return list of recommended product
  getRecommendedProducts(){

    return [
      {
        "nomProduit": "Tièboudjène",
        "imageProduit": "../../../assets/img/tieb.png",
        "prixProduit": "18,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
        "etatProduit": true,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes","huile végétale","crevettes"]
      },
      {
        "nomProduit": "Magret de cannard",
        "imageProduit": "../../../assets/img/magret.png",
        "prixProduit": "16,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
        "etatProduit": true,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
        
      }
    ];

  }


  //return list of fish product
  getPlatsPoissons(){

    return [
       {
         "nomProduit": "Bar grillé sauce Yassa",
         "imageProduit": "../../../assets/img/poissons/casa-poisson-bar-yassa.jpeg",
         "prixProduit": "18,00 €",
         "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
         "etatProduit": true,
         "categProduit": "poisson",
         "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes","huile végétale","crevettes"]
       },
       {
         "nomProduit": "Mafé au poisson",
         "imageProduit": "../../../assets/img/poissons/casa-poisson-mafe.jpeg",
         "prixProduit": "16,00 €",
         "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
                  "etatProduit": true,
         "categProduit": "poisson",
         "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
         
       },
       {
        "nomProduit": "Bar grillé sauce Yassa",
        "imageProduit": "../../../assets/img/poissons/casa-poisson-bar-yassa.jpeg",
        "prixProduit": "18,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
                "etatProduit": false,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
      },
      {
        "nomProduit": "Mafé au poisson",
        "imageProduit": "../../../assets/img/poissons/casa-poisson-mafe.jpeg",
        "prixProduit": "18,50 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
                "etatProduit": false,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
      },
      {
        "nomProduit": "Bar grillé sauce Yassa",
        "imageProduit": "../../../assets/img/poissons/casa-poisson-bar-yassa.jpeg",
        "prixProduit": "18,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
                "etatProduit": true,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
      },
      {
        "nomProduit": "Mafé au poisson",
        "imageProduit": "../../../assets/img/poissons/casa-poisson-mafe.jpeg",
        "prixProduit": "16,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque doloribus",
                "etatProduit": false,
        "categProduit": "poisson",
        "ingredientsProduit": ["bar","oigons","piment","arachide","ail","huile végétale","crevettes"]
      }
     ];

   }


  //return array of deserts
  getDesserts(){

   return [
      {
        "nomProduit": "Crème brûlée à la vanille",
        "imageProduit": "../../../assets/img/desserts/casa-dessert-creme-brulee.jpeg",
        "prixProduit": "05,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
                "etatProduit": false,
        "categProduit": "viande"
      },
      {
        "nomProduit": "Salade de fruits",
        "imageProduit": "../../../assets/img/desserts/casa-dessert-salade-de-fruits.jpeg",
        "prixProduit": "04,50 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "etatProduit": false,
        "categProduit": "viande"
      },
      {
        "nomProduit": "Riz au lait caramel",
        "imageProduit": "../../../assets/img/desserts/casa-dessert-riz-au-lait.jpg",
        "prixProduit": "04,50 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "etatProduit": true,
        "categProduit": "viande"
      },
      {
        "nomProduit": "Moelleux au chocolat caramel",
        "imageProduit": "../../../assets/img/desserts/casa-dessert-moelleux-chocolat-caramel.jpeg",
        "prixProduit": "05,20 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "etatProduit": false,
        "categProduit": "viande"
      },
      {
        "nomProduit": "Café gourmand",
        "imageProduit": "../../../assets/img/desserts/casa-dessert-cafe-gourmand.jpeg",
        "prixProduit": "05,00 €",
        "descriptionProduit": "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "etatProduit": true,
        "categProduit": "viande"
      }
    ];

  }


  //return array of deserts
  getTestimonies(){

    return [
       {
         "nom": "Albertine",
        "message": "Cuisine excellente. C'est toujours un régal à chaque fois" 
        },
       {
        "nom": "Serge",
        "message": "Je n'ai jamais autant mangé de la vie. Je recommande très vivement le restaurant Casabreizh"
       },
       {
        "nom": "Thomas",
        "message": "Nourriture délicieuse et bonne décoration du salon. Mais bon, petit bémol, je n'aime pas trop le cadre, c'est trop petit. Nourriture délicieuse et bonne décoration du salon. Mais bon, petit bémol, je n'aime pas trop le cadre, c'est trop petit."
       },
       {
        "nom": "Steve Bogler",
        "message": "Très bon !!"
       },
       {
        "nom": "Tento",
        "message": "Accueil chaleureux, le chef est accueillant, nourriture délicieuse, franchement rien à dire"
       },
       {
        "nom": "Vichenzo",
        "message": "J'y suis allé c'étais une première pour moi mais j'ai adoré"
       },
       {
        "nom": "Silvia",
        "message": "La nourriture j'adore et Casabreizh aussi"
       },
       {
        "nom": "Jean Louis",
        "message": "J'ai mangé et j'en ai pris à emporter. Vous vous doutez bien pourquoi"
       },
       {
        "nom": "Niquaise",
        "message": "On a réservé pour l'anniversaire de ma fille et tout était super. Merci encore à Casabreizh"
       }
    ];

   }



}
