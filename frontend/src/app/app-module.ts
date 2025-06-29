import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';
const routes: Routes = [
  {path: 'search/:keyword', component: ProductList},
  {path: 'category/:id', component: ProductList},
  {path: 'category', component: ProductList},
  {path: 'products', component: ProductList},
  {path: '', redirectTo: '/products', pathMatch: 'full' },
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [App]
})
export class AppModule { }
