import {Component, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ModalDirective} from 'angular-bootstrap-md/modals/modal.directive';
import {HappeningDTO} from '../../../../../src/dtos/happening-dto';
import * as _ from 'lodash';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit {

  uploader: FileUploader;
  @ViewChild('uploadModal') public uploadModal: ModalDirective;
  happening: HappeningDTO;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      method: 'PUT',
    });
    this.uploader.authToken = 'Bearer ' + this.authService.getToken();
    this.uploader.onCompleteAll = () => {
    };

    this.uploader.onErrorItem = () => {
    };
  }

  open(happening: HappeningDTO) {
    this.happening = happening;
    this.uploadModal.show();
  }

  upload() {
    this.uploader.queue.forEach(file => file.url = `api/content/${this.happening.id}`);
    this.uploader.uploadAll();
  }

  remove(file) {
    _.remove(this.uploader.queue, file);
  }

}