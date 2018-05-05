import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot()
  ],
  declarations: [DeleteModalComponent],
  exports: [DeleteModalComponent]
})
export class CommonsModule { }

