import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  item: any;

  constructor() { }

  ngOnInit() {
  }

  public open(item): void {
    this.item = item;
    this.deleteModal.show();
  }

  deleteItem(){
    this.deleteEvent.emit(this.item);
    this.deleteModal.hide();
  }

}
