import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from 'src/app/services/data.service';
import { ValidatorMaterial } from 'src/app/services/validatorMaterial.service';

@Component({
  selector: 'app-form-material',
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css']
})
export class FormMaterialComponent implements OnInit {


  public formMaterial!: FormGroup

  constructor(private fb: FormBuilder, private dataService: DataService, private notification: NzNotificationService, private validatorMaterial: ValidatorMaterial) {}


  ngOnInit() {

    this.formMaterial = this.fb.group({
      materialOrigen    : ["", [Validators.required], [this.validatorMaterial]],
      tipo              : ["", [Validators.required]],
      paisExportador    : ["", [Validators.required]],
      paisOrigen        : ["", [Validators.required]],
      proveedor         : ["", [Validators.required]],
      clasificacion     : [""],
      materialLocal     : ["", [Validators.required]],
      descripcion       : ["", [Validators.required]],
      partidaArancelaria: ["", [Validators.required]],
      upDate            : [new Date()]
    })
  }

   /**
   *
   * Para validar los campos del formulario
   * @returns
   */
   invalidField( field: string ) {
    return this.formMaterial.get(field)?.invalid
            && this.formMaterial.get(field)?.touched;
  }

  enviar() {
    const form = [{
      materialOrigen    : this.formMaterial.get('materialOrigen')?.value.toUpperCase(),
      tipo              : this.formMaterial.get('tipo')?.value,
      paisExportador    : this.formMaterial.get('paisExportador')?.value,
      paisOrigen        : this.formMaterial.get('paisOrigen')?.value,
      proveedor         : this.formMaterial.get('proveedor')?.value,
      clasificacion     : this.formMaterial.get('clasificacion')?.value,
      materialLocal     : this.formMaterial.get('materialLocal')?.value.toUpperCase(),
      descripcion       : this.formMaterial.get('descripcion')?.value.toUpperCase(),
      partidaArancelaria: this.formMaterial.get('partidaArancelaria')?.value,
      upDate            : new Date()
    }]
    this.formMaterial.markAllAsTouched()
    if(this.formMaterial.invalid){
      let estado = "error"
      this.notificationError(estado)
    }else{
      console.log(this.formMaterial.value);
      this.dataService.createtMaterial(form).subscribe()
      let estado = "success"
      this.notificationSuccess(estado)
      this.formMaterial.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  /**
  * La función `notificationError` crea una notificación con un mensaje de error.
  * @param {string} type - El tipo de notificación a mostrar. Puede ser 'éxito', 'información',
  * 'advertencia' o 'error'.
  */
  notificationError(type: string): void {
    this.notification.create(
      type,
      'Error',
      'No se pudo enviar los datos'
    );
  }

/**
  * La función `notificationError` crea una notificación con un mensaje de error.
  * @param {string} type - El tipo de notificación a mostrar. Puede ser 'éxito', 'información',
  * 'advertencia' o 'error'.
  */
notificationSuccess(type: string): void {
  this.notification.create(
    type,
    'Excelente',
    'Datos enviados con exito'
    );
  }

}
