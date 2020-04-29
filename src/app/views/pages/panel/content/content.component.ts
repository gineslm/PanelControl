import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContentModel } from '../../../../models/contentModel';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() selectedModel: string;
  @Input() selectedObject: ContentModel;
  @Input() editar: boolean;
  @Output() notify = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onNotify(menssage) {
    this.notify.emit(menssage);
  }

}
