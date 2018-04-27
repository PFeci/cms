import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md/modals/modal.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('fluid') public fluid: ModalDirective;
  inPassword: boolean = false;
  isLogin: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  public open(): void {
    this.fluid.show();
  }

  clickPasswordInput(isIn: boolean) {
    this.inPassword = isIn;
  }

  changeIsLogin(isLogin: boolean){
    this.isLogin = isLogin;
  }

  login(){

  }

  registrate(){

  }
}
