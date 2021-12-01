import {Component, TemplateRef} from '@angular/core';
import { ToastServiceUpdate } from './toastUpdate.services';
import { TestService } from 'src/app/test.service';
import { ToastServiceAlert } from './toastAlert.services';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast

    style="background-color:#000; width:100%;opacity: 0.90;"
      *ngFor="let toast of toastServiceUpdate.toasts"
      [class]="toast.classname "
      [autohide]="true"
      [delay]="toast.delay || 20000"
      
      
    >
    
    <div class="flex justify-between w-full  items-center  absolute ">

    <img  style="width:120px;heigth:80px" src="assets/img/aedpay_whitelogo.png">
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text" >
        <ng-template [ngTemplateOutlet]="toast.textOrTpl" > </ng-template>
      </ng-template> 

    

    <div class=" pr-10" >
    <div class="row">
     <button (click)=updateVersion() class="w-auto h-10 px-3 text-black bg-white  rounded-sm outline-none ">
    Update
    </button>
    &nbsp;
    <button (click)="toastServiceUpdate.remove(toast)" class="w-auto h-10 mx-3 text-white  rounded-sm outline-none ">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
  </button>
    </div>
   
    
    
    </div>

    
    
      
 
    </div>




      <ng-template #text >{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsUpdateVersion {
  constructor(private test: TestService, 
    public toastServiceUpdate: ToastServiceUpdate,
    public toastAlertService: ToastServiceAlert
    ) {}

  

  updateVersion(){
    if(navigator.onLine){
      this.test.execphp().subscribe(
        res => {
          console.log(res);
          window.location.reload();
      }, (err) => {
          console.log(err);
      }
      );
    }else{
      this.toastAlertService.show("You are not connected to the internet", { classname: '  ', delay: 2000 });  
    }
    
  }


  

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}