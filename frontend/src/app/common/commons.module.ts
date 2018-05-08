import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {NgModule} from '@angular/core';
import {UploadMediaComponent} from './upload-media/upload-media.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
    FileUploadModule,
    FormsModule,
    CommonModule
  ],
  declarations: [DeleteModalComponent, UploadMediaComponent],
  exports: [DeleteModalComponent, UploadMediaComponent]
})
export class CommonsModule { }

