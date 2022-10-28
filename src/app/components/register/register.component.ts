
import { Component, OnInit } from '@angular/core';
import { CustomValidatorsDirectiveDirective } from '../../directives/custom-validators-directive.directive';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isValid = true
  signupForm: FormGroup | any;
  file: File | any; // Variable to store file to Upload
  constructor(private fb: FormBuilder,
    private customValidators: CustomValidatorsDirectiveDirective,
    private auth: AuthService
  ) {
  }
  ngOnInit() {
    this.initializeForm();
    
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  initializeForm() {

    this.signupForm = this.fb.group({
      'name': new FormControl('Henny',
        Validators.required,
      ),
      'username': new FormControl('henny',
        Validators.required,),
      'role': new FormControl('user',
        Validators.required,),
      'address': new FormControl('surat',
        Validators.required,),
      'phone': new FormControl('+919988776655',
        Validators.required,),
      'email': new FormControl('test@yopmail.com',
        [Validators.required,
        Validators.email]
      ),
      'password': new FormControl('Admin@123',
        [Validators.required,
        this.customValidators.patternValidator(/\d/, { hasNumber: true }),
        this.customValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.customValidators.patternValidator(/[!@#$%^&*(),.?":{}|<>]/, { hasSpecialCharacters: true })]
      ),
      'confirmpassword': new FormControl('Admin@123',
        Validators.required
      ),
      'imageInput': new FormControl('',
        Validators.required
      )
    }, {
      validators: this.customValidators.isDifferent('password', 'confirmpassword', 'notConfirmed')

    });
  }
  get formAltaControls(): any {
    return this.signupForm['controls'];
  }
  registerUser() {
    console.log(this.file);
    // var fd = new FormData();
    const data = this.signupForm.value
    const formdata = new FormData();
    formdata.append('image', this.file);
    formdata.append('name', data.name);
    formdata.append('role', data.role);
    formdata.append('username', data.username);
    formdata.append('phone', data.phone);
    formdata.append('password', data.password);
    formdata.append('email', data.email);
    formdata.append('address', data.address);
    formdata.append('passwordConfirmation', data.password);
    this.auth.register(formdata).subscribe((data: any) => {
    })
  }
  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      let type = ['image/png', 'image/jpg', 'image/jpeg']
      type.includes(file.type);

      if (type.includes(file.type)) {
        this.isValid = true
      }
      else {
        this.isValid = false
      }
    }
  }
}


