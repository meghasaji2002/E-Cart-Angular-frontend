import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {

  allproduct:any=[]

  searchQuery: string = ''; 
  filteredProducts: any[] = [];

  constructor(private api:ApiService ,private router:Router){}

  ngOnInit(): void {
    this.filteredProducts = this.allproduct;
    this.api.getallproductapi().subscribe({
      next:(res:any)=>{
        this.allproduct=res
        console.log(this.allproduct);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  filterProducts(): void {
    if (this.searchQuery) {
      this.filteredProducts = this.allproduct.filter((product:any) => 
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.allproduct;
    }
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Wow....",
            text:"Product added to wishlist successfully"
          });
        
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops....",
            text:`${err.error}`
           
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
