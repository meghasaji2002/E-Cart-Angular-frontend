import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allproducts:any=[]

constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
   this.getWishlistitem()
  }

  getWishlistitem(){
    this.api.getWishlistItemapi().subscribe({
      next:(res:any)=>{
        this.allproducts=res
        console.log(this.allproducts);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  removeItem(id:any){
    this.api.removeItemFromWishlist(id).subscribe({
      next:(res:any)=>{
       console.log(res);
      //  Swal.fire({
      //   position: "top",
      //   icon: "success",
      //   title: "ooh....",
      //   text:"Product deleted from wishlist"
      // });
      
      this.api.getWishlistCount()
      this.getWishlistitem();
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  addToCart(product:any){

    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1});
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
         
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Wow....",
            text:"Product added to cart successfully"
          });
          this.api.getCartCount()
          this.removeItem(product._id)
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops....",
            text:err.error
          });
        }
      })
    }else{
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Oops....",
        text:"Please login"
      });
      this.router.navigateByUrl('/user/login')
    }

  }


}
