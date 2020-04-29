import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CrewModel } from '../../../../models/crewModel';
import { FormsModule, NgForm } from '@angular/forms';
import { LinkModel } from '../../../../models/linkModel';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent  {

  @Input() selectedModel: string;
  @Input() selectedObject: CrewModel;
  @Input() editar: boolean;
  @Output() notify = new EventEmitter<string>();

  newLink = new LinkModel();

  constructor() { }

  
  onNotify(menssage) {
    this.notify.emit(menssage);
  }


  insertNewLink(){
    if (!this.selectedObject.links) { this.selectedObject.links = []; }
    this.selectedObject.links.push(this.newLink);

    console.log('selecteobject', this.selectedObject);
    this.newLink = new LinkModel();
  }


  deleteLink(i: number){
    this.selectedObject.links.splice( i, 1 );

  }



}
