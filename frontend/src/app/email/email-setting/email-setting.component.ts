import {Component, OnInit} from '@angular/core';
import {EmailService} from "../email.service";
import {EmailDTO} from "../../../../../src/dtos/email-dto";

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.scss']
})
export class EmailSettingComponent implements OnInit {

  newEmail: EmailDTO = <EmailDTO>{};
  updateEmail: EmailDTO = <EmailDTO>{};

  constructor(private emailService: EmailService) {
  }

  ngOnInit() {
    this.emailService.getNewEmail().subscribe(
      (newEmail: EmailDTO) => {
        this.newEmail = newEmail;
      },
      (err) => {
        console.log(err);
      }
    );
    this.emailService.getUpdateEmail().subscribe(
      (updateEmail: EmailDTO) => {
        this.updateEmail = updateEmail;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  updateNewEmail(){
    this.emailService.updateNewEmail(this.newEmail).subscribe(
      (newEmail: EmailDTO) => {
        this.newEmail = newEmail;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  updateUpdateEmail(){
    this.emailService.updateUpdateEmail(this.updateEmail).subscribe(
      (updateEmail: EmailDTO) => {
        this.updateEmail = updateEmail;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
