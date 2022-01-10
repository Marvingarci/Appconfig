import {Component, TemplateRef} from '@angular/core';
import { ToastServiceUpdate } from './toastUpdate.services';
import { TestService } from 'src/app/test.service';
import { ToastServiceAlert } from './toastAlert.services';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast

      style="background-color:#ddd; color:#3cadee;opacity: 0.90;"
        *ngFor="let toast of toastServiceUpdate.toasts"
        [class]="toast.classname "
        [autohide]="true"
        [delay]="toast.delay || 20000"     
      >
    
            <div class="flex  items-center ml-auto mr-auto w-max">


                  <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text" >
                      <ng-template [ngTemplateOutlet]="toast.textOrTpl" > </ng-template>
                  </ng-template> 

                  <div class="flex ml-3">
                        <button (click)=updateVersion() class="buttonSorange ">
                          Update
                        </button>

                        &nbsp;

                        <button (click)="toastServiceUpdate.remove(toast)" class="text-aedpay w-auto h-10 mx-3  rounded-sm outline-none ">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
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
    public toastServiceAlert: ToastServiceAlert
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
      this.toastServiceAlert.show("You are not connected to the internet", { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });  
    }
    
  }


  

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}