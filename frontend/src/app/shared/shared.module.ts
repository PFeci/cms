import {MDBBootstrapModule} from 'angular-bootstrap-md/index';
import {DeleteModalComponent} from '../shared/delete-modal/delete-modal.component';
import {NgModule} from '@angular/core';
import {UploadMediaModalComponent} from '../shared/upload-media-modal/upload-media-modal.component';
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
  declarations: [DeleteModalComponent, UploadMediaModalComponent],
  exports: [DeleteModalComponent, UploadMediaModalComponent]
})
export class SharedModule { }

