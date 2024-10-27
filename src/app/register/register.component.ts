import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder ,private api:ApiService, private router:Router){}

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password

      const user ={username,email,password}
      this.api.registerapi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Wow....",
            text:"Registered successfully"
          });
          this.router.navigateByUrl('/user/login')
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
