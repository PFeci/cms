import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md/modals/modal.directive';
import {UserDTO} from '../../../../../src/dtos/user-dto';
import {AuthService} from '../auth.service';
import {UserAuthenticateDTO} from '../../../../../src/dtos/user-authenticate-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {equalValidator} from '../register/equal-validator.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('fluid') public fluid: ModalDirective;
  inPassword: boolean = false;
  isLogin: boolean = true;
  isRegisterSuccess: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
      ]),
      'password': new FormControl('', [
        Validators.required,
      ])
    });
  }

  public open(): void {
    this.fluid.show();
  }

  clickPasswordInput(isIn: boolean) {
    this.inPassword = isIn;
  }

  changeIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      resp => {
        if (resp['body']) {
          this.authService.saveToken(resp);
          this.fluid.onEsc();
        }
      },
      err => this.loginForm.setErrors({formError: true})
    );
  }

  registerSuccess(isSuccess: boolean) {
    if (isSuccess) {
      this.isLogin = true;
      this.isRegisterSuccess = true;
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
