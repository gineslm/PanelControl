import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() selectedModel: string;
  @Input() selectedObject: UserModel;
  @Input() editar: boolean;


  enviado: boolean;


  constructor() { }

  ngOnInit() {
  }




}
