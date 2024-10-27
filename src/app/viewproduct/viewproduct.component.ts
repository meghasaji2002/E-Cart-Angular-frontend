import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit{

  product:any={};
constructor(private api:ApiService, private route:ActivatedRoute, private router:Router){}

ngOnInit(): void {
   this.route.params.subscribe((res:any)=>{
    const id = res.id
    console.log(id);
    this.getproduct(id);
   })

}

  getproduct(id:any){
    this.api.getaproductapi(id).subscribe({
      next:(res:any)=>{
       
        this.product=res[0]
        console.log(this.product);
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
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
