import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ImageModel } from '../../../../models/imageModel';
import { ImageService } from '../../../../services/image/image.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})


export class ImageComponent implements  OnChanges {


  @Input() selectedModel: string;
  @Input() selectedObject: any;
  @Input() editar: boolean;
  @Input() selectedData: any[];
  @Output() notify = new EventEmitter<string>();
  @Output() emitselectedObject = new EventEmitter<object>();



  baseFolder = '../../';
  arrImages: ImageModel[];
  dragI: number;
  dragObject: ImageModel;
  dropI: number;
  hoverI: number;
  editI = false;
  uploadFolder: any[]; // json con la informacion del directorio upload se carga a traves de api
  selectedPath = ''; // string del folder seleccionado
  selectedFile: any = {}; // es el objeto file selecionado
  selectedFolderWiev: any = {}; // objeto q contiene todo el contenido del folder seleccionado
  selectedImage: ImageModel = new ImageModel();
  writeNew = false; // variable para ngidf del template es true si se esta creando un nuevo selectedimage
  inputFile: any;


  constructor(    private servImage: ImageService) {
    this.readDir(); // lee el contenido de la carpeta upload del server

  }




  ngOnChanges(changes: SimpleChanges ): void {
    console.log('entraenonchanges', changes );

    // definicion para el componente importado dentro de un selectedObject
    if ( this.selectedObject &&  this.selectedObject.image ) {
      // image es siempre un array
      this.arrImages = this.selectedObject.image;
      console.log('entra en a');
    }
    // definicion para el componente selecionado desde el panel
    if (this.selectedModel === 'Image') {
        this.arrImages = this.selectedData;
        this.editar = true;
        console.log('entra en b', this.selectedData);
    }

    if ( this.selectedObject  && this.selectedModel === 'Image'){
      this.selectedImage = this.selectedObject;
      this.select(this.selectedImage );
    } 


  }


  editarImage(value){
    this.editI = value;
    console.log('editI:', this.editI);
  }

  selectUploadFile(files){
    console.log('uploadFiles: ', files);
    this.inputFile = files.srcElement.files;
  }


  saveImage() {

    if ( !this.writeNew ) {
      this.servImage.putObject(this.selectedImage).subscribe( resp =>{
        console.log('respuesta', resp);
        this.editI = false;
        this.reload();


      });
    } else {
      this.servImage.postObject(this.selectedImage, this.inputFile).subscribe( resp =>{
        console.log('respuesta', resp);
        this.writeNew = false;
        this.editI = false;
        this.reload();

      });
    
    

    }




  }

  newImage(){
    this.selectedImage = new ImageModel();
    this.selectedImage.name = 'introduce un titulo';
    this.selectedImage.alt = 'inserta una descripción (es importante)';
    this.selectedImage.act = true;
    this.selectedFile = {};
    this.editI = true;
    this.writeNew = true;
  }

  deleteImage(){
    this.servImage.killObject(this.selectedImage._id).subscribe( resp =>{
      console.log('respuesta', resp);
      this.reload();
      this.selectedImage = new ImageModel();
      this.selectedFile = {};

    });

  }


  reload() {
    this.notify.emit('reload'); // emite el reload para actualizar la info de BBDD desde el parent 
    this.readDir(); // actualizamos la info de la carpeta upload en el server
  }


  cancelEdit(){
    this.editI = false;
    this.writeNew = false;
    this.reload();
  }


  //////////////////////////
  // drag and drop partial
  //////////////////////////

  drag( ind: number, obj: any ) {
    console.log('coge');

    this.dragI = ind;
    this.dragObject = obj;

    if (obj._id){
      this.selectedImage = obj;
    } else {
      this.selectedFile = obj;
    }


  }

  drop( ind: number) {

    console.log('coge', this.dragI , 'suelta', ind);
    this.dropI = ind;

    this.select(this.dragObject);

    if ( this.dragI < 0) {
      console.log('caso0 obj trasnportado es un file');
      this.arrImages.splice(this.dropI, 0, this.selectedImage ); // insert
    } else if  (this.dragI > this.dropI || this.dropI === this.arrImages.length) {
      console.log('caso1  obj trasnportado es image');
      this.arrImages.splice(this.dragI, 1); // delete
      this.arrImages.splice(this.dropI, 0, this.selectedImage ); // insert
    } else if ( this.dragI < this.dropI && this.dropI < this.arrImages.length) {
      console.log('caso2  obj trasnportado es un image');
      this.arrImages.splice(this.dragI, 1); // delete
      this.arrImages.splice( this.dropI - 1 , 0, this.selectedImage ); // insert
    }
    this.dragI = null;
    this.hoverI = null;
  }


  cleanInd() {
    this.hoverI = null;
    console.log( 'indice del hover', this.hoverI);
  }


  allowDrop(ev, i) {
    if ( i !== this.dragI && i !== this.dragI + 1  ) {
      this.hoverI = i;
      console.log( 'indice del hover', this.hoverI);

      window.addEventListener('dragover', (e) => {
        e = e || ev;
        e.preventDefault();
      },false);
      window.addEventListener('drop', (e) => {
        e = e || ev;
        e.preventDefault();
      }, false);
    }
  }


  //////////////////////////
  // file wiev 
  //////////////////////////

  readDir(  ) {
    this.servImage.readDir().subscribe( resp =>{ 
      if (resp.ok) {
        this.uploadFolder = resp.data;

        // si no hay ningun selecfolderWiev selecionado, se cargar el children con los datos de uploadfoler
        if ( !this.selectedFolderWiev.children ){
        this.selectedFolderWiev.children = this.uploadFolder;
        }
        // si hay un path definido, se busca el valor de selectedfolderwiev
        if (this.selectedPath !== '') {
        this.searchPath(this.uploadFolder);
        }
      }
    });
  }

  getImageByFileName(obj) {

      this.servImage.getImageByFileName(obj.base).subscribe( resp =>{ 
        if (resp.ok) {
          this.selectedImage = resp.data[0];
          console.log('selected image :', this.selectedImage);
        }
      });

  }





  /// DANGER LOOP ////
  select( obj: any ){  // el objeto que recibe puede ser file o image
    // hace foco sobre ese objeto estableciendo todas las variables de la wiev
    // selectedpath, selectedwievfolder, selectedImage, selectedfile

    console.log('entra en selet', obj);
    if (obj.type === 'directory') {   // es file type directory
      this.selectedPath = obj.path;
      this.selectedFile = '';
      this.selectedFolderWiev = obj;
    } else if (obj.type === 'file') { // file tipe file
      this.selectedPath = obj.absDir;
      if (this.selectedPath === this.uploadFolder[0].absDir ){
        this.selectedFolderWiev.children = this.uploadFolder;
      } else {
        this.searchPath(this.uploadFolder);
      }
      this.getImageByFileName(obj); // utiliza la info del disco para localizar el obj BBDD 
      this.selectedFile = obj;
    } else if ( obj._id ) { // obj es image y en el drag ha sido definido como selectedImage
      this.selectedImage = obj;
      if (this.selectedModel === 'Image' ){
        this.selectedObject = this.selectedImage;
        console.log('selectedObject', this.selectedObject);
        this.emitselectedObject.emit(this.selectedObject);
      }
      this.searchFileNameInFolder(this.uploadFolder, obj); // bucamos en update para definir selectedPath, selectedFolderWiev, selectedFile
      // lo volvemos a pasar por
    }
    this.editI = false;


}


  /// DANGER LOOP ////
  searchFileNameInFolder(arr: any[], image): any{

    let message = `no se ha encontrado coincidencia en la busqueda en disco para ${image.name + image.extension}`;
    arr.forEach(element => {
        // console.log(image.name + image.extension + '----' + element.name);
        if ( image.name + image.extension === element.name) {
          this.selectedPath = element.absDir;
          this.selectedFile = element;
          this.searchPath(this.uploadFolder); // seleciona selectedFolderWiev
          console.log(`coincidencia en ${element.name}`);
        } else if (element.children && element.children.length > 0) {

          console.log('busca en : ' , element.name);
          this.searchFileNameInFolder(element.children, image);
        }
    });
  }


  /// DANGER LOOP ////
searchPath(arr: any[]) {
  // otorga valor a selectfolderWiev
  arr.forEach(element => {
    if (this.selectedPath === element.path) {
      this.selectedFolderWiev = element;
    } else if (element.children && element.children.lenght > 0 ) {
      this.searchPath(element.children);
    }
  });

}





}
