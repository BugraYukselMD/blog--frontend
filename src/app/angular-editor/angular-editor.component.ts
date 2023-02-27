import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-angular-editor',
  templateUrl: './angular-editor.component.html',
  styleUrls: ['./angular-editor.component.css']
})
export class AngularEditorComponent implements OnInit {

  constructor() { }

  @Input() blogBody:any;
  @Output() blogBodyOut:any = new EventEmitter();

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '400px',
    minHeight: '100px',
    maxHeight: 'auto',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Buradan başlayın...",
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '',
    toolbarHiddenButtons: [
      ['insertVideo']
      ],
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    sanitize: false,
    toolbarPosition: 'top',
  };
  
  ngOnInit() {
    
  }

  onChange(value:any){
    this.blogBodyOut.emit(value)
  }

}
