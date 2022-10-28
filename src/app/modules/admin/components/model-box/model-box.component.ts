import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model-box',
  templateUrl: './model-box.component.html',
  styleUrls: ['./model-box.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModelBoxComponent {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }
}
