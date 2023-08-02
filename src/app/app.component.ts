import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenAccess = ['Dinesh', 'Manu', 'Chris', 'Anna']
  signupForm: FormGroup;
  controls: any;

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.ForbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.ForbiddenEmails),
      }),
      'gender' : new FormControl('male'),
      'hobbies': new FormArray([]),
    });

    //Value Changes

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    //Status Changes

    //  this.signupForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );

    //SetValue

    // this.signupForm.setValue({
    //   'userData' : {
    //     'username' : 'Max',
    //     'email' : 'max@test.com'
    //   },
    //   'gender' : 'male',
    //   'hobbies' : []
    // });

    // this.signupForm.patchValue({
    //   'userData' : {
    //     'email' : 'test@test.com'
    //   },
    // });
  }

  Onsubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  //Adding field to the form with Validations
  AddonHubby(){
    this.controls =  (<FormArray>this.signupForm.get('hobbies')).controls;
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Custom Validations for ForbiddenNames
  ForbiddenNames(controls : FormControl): {[s: string]: boolean} {
    if(this.forbiddenAccess.indexOf(controls.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // Async Validations for ForbiddenEmails
  ForbiddenEmails(control : FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailForbidden' : true});
        } else {
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }

}
