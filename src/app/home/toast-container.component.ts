import {Component, TemplateRef} from '@angular/core';
import { ToastService } from '../../toast.services';
import { TestService } from 'src/app/test.service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast

    style="background-color:#000; width:100%;opacity: 0.90;"
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname "
      [autohide]="true"
      [delay]="toast.delay || 20000"
      (hidden)="toastService.remove(toast)" 
      
    >
    
    <div class="flex justify-between w-full  items-center  absolute ">

    <img  style="width:120px;heigth:80px" src="assets/img/aedpay_whitelogo.png">
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text" >
        <ng-template [ngTemplateOutlet]="toast.textOrTpl" > </ng-template>
      </ng-template> 

    

    <div class=" pr-10" >
    <button (click)=updateVersion() class="w-auto h-10 px-3 text-black bg-white  rounded-sm outline-none hover:bg-gray-500">Update</button>
    </div>

    
    
      
 
    </div>




      <ng-template #text >{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(private test: TestService, public toastService: ToastService) {}

  updateVersion(){
    this.test.execphp().subscribe(
        res => {
          console.log(res);
          window.location.reload();
      }, (err) => {
          console.log(err);
      }
      );
  }


  

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}