import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscribtion: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    this.subscribtion = this.productService.getAll()
    .subscribe(products => {
      this.products = products;
      this.initializeTable(products);
       
   });
  }

  private initializeTable(products: Product[]) {

    this.tableResource = new DataTableResource(products);
       this.tableResource.query({ offset: 0})
        .then(items => this.items = items);
      this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params)
        .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

      this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {
  }

}
