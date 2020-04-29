import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentModel } from '../../../models/contentModel';
import { CrewModel } from '../../../models/crewModel';
import { EventModel } from '../../../models/eventModel';
import { ContentService } from '../../../services/content/content.service';
import { CrewService } from '../../../services/crew/crew.service';
import { EventService } from '../../../services/event/event.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel } from '../../../models/userModel';
import { UserService } from '../../../services/user/user.service';
import { ImageModel } from '../../../models/imageModel';
import { ImageService } from '../../../services/image/image.service';





@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  selectedData: EventModel[] | CrewModel[] | ContentModel[] | UserModel[] | ImageModel[] = [];
  selectedObject: EventModel | CrewModel | ContentModel | UserModel | ImageModel | null = null;
  selectedModel: string | null = null;
  selectedaccion: string | null = null;
  editar = false;
  arrModels: string[] = [ 'Event', 'User', 'Content', 'Crew', 'Image' ];



  constructor(  private servEvent: EventService,
                private servContent: ContentService,
                private servCrew: CrewService,
                private servUser: UserService,
                private servImage: ImageService
              ) {

  console.log(this.arrModels);

              }


  getData(select: string) {
    this.selectedModel = select;
    this.selectedObject = null;
    this.listarData();
  }

  listarData() {

      const serv = this.selectService();

      serv.getAll().subscribe( resp =>{
        console.log( 'resp', resp);
        this.selectedData = resp.data;
        this.editar = false;

        // si existe un objeto seleccionado mantenemos el objeto seleccionado
        if (this.selectedObject && this.selectedObject._id ) {
          this.selectedData.forEach( element => {
            if ( element._id === this.selectedObject._id) {
              this.selectedObject = element;
            }
          });
        } else {
          this.selectedObject = null;
        }
      });
  }


  onNotify(menssage) {
    if (menssage === 'reload') { this.listarData(); }

  }

  recibeSelectImage(objeto) {
    this.selectedObject = objeto;
  }


  newObj() {
    switch (this.selectedModel) {
    case 'Event':
      this.selectedObject = new EventModel();
      console.log(this.selectedObject);
      this.editar = true;
      break;
    case 'Content':
      this.selectedObject = new ContentModel();
      console.log(this.selectedObject._id);
      this.editar = true;
      break;
    case 'Crew':
      this.selectedObject = new CrewModel();
      // console.log(this.selectedObject);
      this.editar = true;
      break;
    case 'User':
      this.selectedObject = new UserModel();
      // console.log(this.selectedObject);
      this.editar = true;
      break;
    default:
      break;
    }
  }

  actObj(id: string, value: string) {
    const serv = this.selectService();
    console.log(value);
    serv.actObject(id, value).subscribe( resp =>{
      console.log('respuesta', resp);
      // actualizamos contenido
      this.listarData();

    });

  }

  deleteObj() {
    const serv = this.selectService();
    serv.killObject(this.selectedObject._id).subscribe( resp =>{
      console.log('respuesta', resp);
      // actualizamos contenido
      this.selectedObject = null;
      this.listarData();

    });
  }

  selectObject( objeto: any) {
    this.editar = false;
    this.selectedObject = objeto;
    console.log('selectedObject', this.selectedObject);
  }

  startEdition() {
    this.editar = true;
  }

  cancelEdition() {
    // inicializamos valores
    this.listarData();
  }

  saveObject() {
    console.log('existe id?', this.selectedObject._id);

    if (this.selectedObject._id) {
      this.saveEdition();
    } else {
      this.saveNew();
    }

  }

  saveNew() {
    const serv = this.selectService();

    serv.postObject( this.selectedObject ).subscribe( resp =>{
      console.log('respuesta', resp);
      // actualizamos contenido
      this.listarData();
    });
  }

  saveEdition() {
    const serv = this.selectService();

    serv.putObject( this.selectedObject['_id'], this.selectedObject ).subscribe( resp =>{
      console.log('respuesta', resp);
      // actualizamos contenido
      this.listarData();
    });
  }

  selectService(): any {
    let serv;
    switch (this.selectedModel) {

      case 'Event':
        serv = this.servEvent;
        return serv;
        break;

      case 'Content':
        serv = this.servContent;
        return serv;
        break;

      case 'Crew':
        serv = this.servCrew;
        return serv;
        break;

      case 'Image':
        serv = this.servImage;
        return serv;
        break;

      case 'User':
        serv = this.servUser;
        return serv;
        break;

      default:
        break;
      }

  }



}
