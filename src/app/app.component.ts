import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  formInfo = new FormGroup({
    servername: new FormControl('',[]),
    username:new FormControl('',[]),
    password: new FormControl('',[])
  });

  constructor(private test: TestService){

  }

  save() {
console.log(this.formInfo.value);
    this.test.post(this.formInfo.value).subscribe(
      res => {
        console.log(res);
    }, (err) => {
        console.log(err);
    }
    );
  }


  title = 'testingCreateddatabase';
}