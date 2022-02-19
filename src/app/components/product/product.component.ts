import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitComponent } from '../produit/produit.component';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Produit | any;

  constructor( private modalService : NgbModal ) { }

  ngOnInit(): void {
  }

  //Handling click on product
  openProduit(){

    const produitRef = this.modalService.open(ProduitComponent);
    produitRef.componentInstance.currentProduit = this.product;
    
}

}
