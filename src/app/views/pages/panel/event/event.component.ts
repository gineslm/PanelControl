import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EventModel } from 'src/app/models/eventModel';
import { LinkModel } from '../../../../models/linkModel';
import { ImageModel } from '../../../../models/imageModel';





@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']

})
export class EventComponent  {

  @Input() selectedModel: string;
  @Input() selectedObject: EventModel;
  @Input() editar: boolean;
  @Output() notify = new EventEmitter<string>();

  newLink = new LinkModel();
  newImg: ImageModel;
  dragI: number;
  dropI: number;







  onNotify(menssage) {
    this.notify.emit(menssage);
  }


  // operaciones con los links

  insertNewLink(){
    if (!this.selectedObject.links) { this.selectedObject.links = []; }
    this.selectedObject.links.push(this.newLink);
    this.newLink = new LinkModel();
  }

  deleteLink(i: number){
    this.selectedObject.links.splice( i, 1 );

  }



  // operaciones con img

  insertNewImg(){
    if (!this.selectedObject.image) { this.selectedObject.image = []; }
    this.selectedObject.image.push(this.newImg);
    this.newImg = null;
  }

  deleteImg(i: number){
    this.selectedObject.image.splice( i, 1 );

  }


  drag(ev: any, ind: number) {
    console.log('coge', ev);




    this.dragI = ind;
    console.log(this.dragI);
  }

  drop(ev: any, ind: number) {
    console.log('coge', this.dragI , 'suelta', ind);
    this.dropI = ind;

    const drag = this.selectedObject.image[this.dragI];
    const drop = this.selectedObject.image[this.dropI];

    this.selectedObject.image[this.dragI] = drop;
    this.selectedObject.image[this.dropI] = drag;

    this.dragI = null;

  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }




}
