import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder ,private api:ApiService, private router:Router){

  }


 loginForm = this.fb.group({

    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })


  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      const user ={email,password}
      this.api.loginapi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Wow....",
            text:"Login successful"
          });
          this.router.navigateByUrl('')
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
    }
    else{
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Oops....",
        text:"Invalid form"
      });
    }
  }
}
