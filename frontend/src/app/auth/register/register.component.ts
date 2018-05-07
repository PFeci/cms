import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthenticateDTO} from '../../../../../src/dtos/user-authenticate-dto';
import {AuthService} from '../auth.service';
import {equalValidator} from './equal-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() inPassword: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() registerSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  registerForm: FormGroup;
  userRegist: UserAuthenticateDTO = <UserAuthenticateDTO> {};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      'firstName': new FormControl('', [
        Validators.required
      ]),
      'lastName': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      'confirmPassword': new FormControl('', [
        Validators.required
      ])
    },
      {validators: equalValidator()}
    );
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      resp => {
        this.registerSuccess.emit(true);
      },
      err => this.registerForm.setErrors({formError: true})
    );
  }

  clickPasswordInput(isIn: boolean) {
    this.inPassword.emit(isIn);
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

}
