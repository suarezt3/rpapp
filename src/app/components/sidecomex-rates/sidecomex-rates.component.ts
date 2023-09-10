import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CONCEPT } from 'src/app/interfaces/port.interface';
import { DataService } from 'src/app/services/data.service';
import { ValidatorConceptServices } from 'src/app/services/validatorSidecomex.service';

@Component({
  selector: 'app-sidecomex-rates',
  templateUrl: './sidecomex-rates.component.html',
  styleUrls: ['./sidecomex-rates.component.css']
})
export class SidecomexRatesComponent implements OnInit {

  public myForm!         : FormGroup;
  public data!           : any;
  public concepts!       : any;
  public isInputReadOnly : boolean = false;
  public status          : string = "";
  public conceptName!    : string;
  public totalValue!     : number;
  public newData        : any[] = [];
  //public concept!        : CONCEPT[]

  constructor (private fb: FormBuilder, private dataService: DataService, private validatorConceptService: ValidatorConceptServices, private notification: NzNotificationService) {}

  ngOnInit(): void {

    /**
     * Trae la lista de los conceptos de tarifas de sidecomex
     */
    this.dataService.getConcepts().subscribe((resp) => {
      this.concepts = resp
    });

    /**
     * Trae todas las tarifas de sidecomex
     */
    this.dataService.getSidecomexRates().subscribe((resp) => {
      this.data = resp
      const newArray = resp.filter((objeto: { ADDS: boolean; }) => objeto.ADDS === true);
      this.totalValue = newArray.reduce((acumulador: number, objeto: any) => acumulador + objeto.value, 0);
    })

    /**
     * Formulario
     */
    this.myForm = this.fb.group({
      concept: ["",[Validators.required], [this.validatorConceptService]],
      value  : ["",[Validators.required]],
      upDate : [new Date()]
    })
  }

   /**
   *
   * Para validar los campos del formulario
   * @returns
   */
   invalidField( field: string ) {
    return this.myForm.get(field)?.invalid
            && this.myForm.get(field)?.touched;
  }


  /**
   *
   * @param concept Metodo que obtiene el nombre del concepto para editar su valor
   */
  getConcept(concept: string) {
    this.myForm.get('concept')?.setAsyncValidators(null)
    this.dataService.getConceptID(concept).subscribe((resp: CONCEPT[]) => {
      //this.concept = resp
      this.conceptName = concept
      this.myForm.patchValue({
        concept :resp[0]?.concept,
        value   :resp[0]?.value,
        upDate  :new Date()
      })
    })
    this.isInputReadOnly = true
  }


  /**
   * Metodo para enviar el formulario
   */
  submit(){
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    }else {
      this.dataService.createSidecomexRates(this.myForm.value).subscribe()
      this.status = "success"
      this.notificationSuccess(this.status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  /**
   * Metodo para editar los datos
   */
  editForm () {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    } else {
      let form = this.myForm.value
      this.dataService.editConcept(this.conceptName, form).subscribe()
      this.status = "success"
      this.notificationSuccess(this.status)
      this.myForm.reset()
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
