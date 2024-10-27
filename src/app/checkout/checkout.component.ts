 import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig?: IPayPalConfig;

  proceedToPayStatus:boolean=false
  grandTotal:any=""
  makePaymentStatus:boolean=false

  checkoutForm=this.fb.group({
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    flat:["",[Validators.required,Validators.pattern('[a-zA-Z0-9:,.]*')]],
    place:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:["",[Validators.required,Validators.pattern('[0-9]*')]],
  })

  constructor(private fb:FormBuilder,private api:ApiService, private router:Router){}

  cancel(){
    this.checkoutForm.reset()
  }

  proceedToPay(){
    if(this.checkoutForm.valid){
      this.proceedToPayStatus=true
      this.grandTotal=sessionStorage.getItem("total")
    }
    else{
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Oops....",
        text:"Enter Valid Input"
       
      });
    }
  }

  back(){
    this.proceedToPayStatus=false
  }

  makePayment(){
    this.makePaymentStatus=true
    this.initConfig()
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.grandTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.grandTotal
              }
            }
          },
         
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },

    //invoke when the payment is successful
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.api.getCartCount()
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Wow....",
        text:"Payment successful"
      });
      this.proceedToPayStatus=false
      this.makePaymentStatus=false
      this.router.navigateByUrl("/")
    },

    //payment cancel
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops....",
        text:"payment cancelled"
       
      });
      this.proceedToPayStatus=true

    },

    //error in gateway
    onError: err => {
      console.log('OnError', err);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops....",
        text:"Transaction failed please try again sometimes later"
       
      });
      this.proceedToPayStatus=true

    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


}
