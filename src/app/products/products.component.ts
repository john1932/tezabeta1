import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category:string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
     ) {

    productService.getAll().subscribe(products => {//dute in firebase si ia toate produsele
      this.products = products;

      route.queryParamMap.subscribe(params => { //obtinem curent rout parametru
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? //filtreaza produsele in dependenta de categorie
          this.products.filter(p => p.category === this.category) :
          this.products;
    }); 

    
    });
   }

    

}
