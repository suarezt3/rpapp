import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-material',
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css']
})
export class FormMaterialComponent implements OnInit {


  public formMaterial!: FormGroup

  constructor(private fb: FormBuilder) {}


  ngOnInit() {

    this.formMaterial = this.fb.group({
      materialOrigen    : [""],
      tipo              : [""],
      paisExportador    : [""],
      paisOrigen        : [""],
      proveedor         : [""],
      clasificacion     : [""],
      materialLocal     : [""],
      descripcion       : [""],
      partidaArancelaria: [""],
      upDate            : [new Date()]
    })
  }


  enviar() {
    console.log(this.formMaterial.value);
    this.formMaterial.reset()
  }

}
