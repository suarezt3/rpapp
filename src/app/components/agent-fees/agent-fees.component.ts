import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SHIPPING } from 'src/app/interfaces/port.interface';
import { DataService } from 'src/app/services/data.service';
import { ValidatorServices } from 'src/app/services/validator.service';
import { ValidatorShippingServices } from 'src/app/services/validatorSipphing.service';

@Component({
  selector: 'app-agent-fees',
  templateUrl: './agent-fees.component.html',
  styleUrls: ['./agent-fees.component.css']
})
export class AgentFeesComponent implements OnInit {

  public myForm!         : FormGroup;
  public data!           : any;
  public shippingCompany!: any;
  public isInputReadOnly : boolean = false;
  public total!          : number;
  public isDisable1      : boolean = true;
  public shippingName!    : string;
  //public shipping!       : SHIPPING[];


  constructor(private fb: FormBuilder, private dataService: DataService, private notification: NzNotificationService, private validatorShippingService: ValidatorShippingServices) {}

  ngOnInit(){

    /**
     * Trae la lista de las navieras
     */
    this.dataService.getShipping().subscribe((resp) => {
      this.shippingCompany = resp
    })

     /**
     * Trae la lista de las navieras
     */
    this.dataService.getAgentFees().subscribe((resp) => {
      this.data = resp
    })

    this.myForm = this.fb.group({
      shippingCompany : ["", [Validators.required],[this.validatorShippingService]],
      container       : ["", [Validators.required]],
      process         : ["", [Validators.required]],
      total           : ["", [Validators.required]],
      daysPerContainer: ["", [Validators.required]],
      drop            : ["", [Validators.required]],
      upDate          : [new Date()]
    })
  }



  /**
   *
   * @param event Metodos para detectar los cambios en los campos del formulario
   */
  onInputChange1(event: any) {
    this.total = this.myForm.get('container')?.value;
    this.isDisable1 = false
  }

  onInputChange2(event: any) {
    this.total = this.total + this.myForm.get('process')?.value;
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

  clearForm () {
    window.location.reload()
}



/**
 * La función de envío verifica si el formulario es válido, crea tarifas de envío si lo es y muestra
 * notificaciones de éxito o error en consecuencia.
 */
  submit() {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    }else {
      this.dataService.createShippingFees(this.myForm.value).subscribe()
      let status = "success"
      this.notificationSuccess(status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  /**
   * La función `getShipping` recupera información de envío según un ID de envío determinado y
   * actualiza los campos del formulario en consecuencia.
   * @param {string} shipping - El parámetro "envío" es una cadena que representa el método u opción de
   * envío seleccionado por el usuario.
   */
  getShipphing (shipping: string) {
    this.myForm.get('shippingCompany')?.setAsyncValidators(null)
    this.dataService.getShipphingFeesID(shipping).subscribe((resp: SHIPPING[]) => {
     // this.shipping = resp
      this.shippingName = shipping
      this.myForm.patchValue({
        shippingCompany : resp[0]?.shippingCompany,
        container       : resp[0]?.container,
        process         : resp[0]?.process,
        total           : resp[0]?.total,
        daysPerContainer: resp[0]?.daysPerContainer,
        drop            : resp[0]?.drop,
        upDate          : new Date()
      })
    })
    this.isInputReadOnly = true
  }


  /**
   * La función editForm verifica si el formulario es válido y, de ser así, envía los datos del
   * formulario al servidor, muestra una notificación de éxito, restablece el formulario y recarga la
   * página después de un retraso.
   */
  editForm () {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    } else {
      let form = this.myForm.value
      console.log("FORMULARIO", form);
      this.dataService.editShippingFees(this.shippingName, form).subscribe()
      let status = "success"
      this.notificationSuccess(status)
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
