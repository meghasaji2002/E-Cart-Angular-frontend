import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "https://e-cart-angular-backend.onrender.com"

  wishlistCount = new BehaviorSubject(0)

  cartCount = new BehaviorSubject(0)

  

  constructor(private http:HttpClient) {

    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
    
   }

  getallproductapi(){
   return this.http.get(`${this.server_url}/all-products`)
  }


  registerapi(user:any){
    return this.http.post(`${this.server_url}/register`,user)
   }


   loginapi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
   }
  

   getaproductapi(id:any){
    return this.http.get(`${this.server_url}/get-product/${id}`)
   }

   

   addTokenToHeader(){
    let headers = new HttpHeaders();        //creating an object for the class HttpHeaders
    const token = sessionStorage.getItem("token");   //getting token from the session storage
    if(token){
      //appending token to the headers of the request
      headers = headers.append('Authorization',`Bearer ${token}`);
    }
    return {headers}

   }

   addToWishlistApi(product:any){
    return this.http.post(`${this.server_url}/add-wishlist`,product,this.addTokenToHeader());
   }


   getWishlistCount(){
    return this.getWishlistItemapi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
   }


   getWishlistItemapi(){
   return this.http.get(`${this.server_url}/wishlist/allproduct`,this.addTokenToHeader());
   this.getWishlistCount()
   }


   


   removeItemFromWishlist(id:any){
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`,this.addTokenToHeader())
   }


   //add to cart
   addToCartApi(product:any){
    return this.http.post(`${this.server_url}/add-cart`,product,this.addTokenToHeader())
   }


   //get cart
   getCartApi(){
    return this.http.get(`${this.server_url}/cart/allproduct`,this.addTokenToHeader())
   }



   getCartCount(){
    return this.getCartApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
   }



   removeCartItem(id:any){
    return this.http.delete(`${this.server_url}/cart/remove-Item/${id}`,this.addTokenToHeader())
   }

   //increment item
   incrementCartItem(id:any){
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeader())
   }

   //decrement item
   decrementCartItem(id:any){
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeader())
   }

   //empty cart
   emptyAllCartProduct(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.addTokenToHeader())
   }


}
