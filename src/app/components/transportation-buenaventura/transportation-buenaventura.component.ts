import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TRANSPORTER } from 'src/app/interfaces/port.interface';
import { DataService } from 'src/app/services/data.service';
import { ValidatorTransporterServices } from 'src/app/services/transporters.service';

@Component({
  selector: 'app-transportation-buenaventura',
  templateUrl: './transportation-buenaventura.component.html',
  styleUrls: ['./transportation-buenaventura.component.css']
})
export class TransportationBuenaventuraComponent implements OnInit {

  public dataTransporters!: any[];
  public data!            : any[]
  public myForm!          : FormGroup;
  public isInputReadOnly  : boolean = false;
  public transporterName!  : string


  constructor( private fb: FormBuilder, private dataService: DataService, private validatorTransporterServices: ValidatorTransporterServices,  private notification: NzNotificationService) {}

  ngOnInit() {


    /* El código `this.dataService.getTransportersBuenaventura().subscribe((resp) => { this.data = resp
    })` está realizando una solicitud HTTP al método `getTransportersBuenaventura()` del servicio
    `dataService`. Se suscribe a la respuesta de la solicitud HTTP y asigna los datos de respuesta a
    la variable "datos". Esto permite que el componente recupere los datos de los transportadores
    del servidor y los utilice en la plantilla u otras partes del componente. */
    this.dataService.getTransportersBuenaventura().subscribe((resp) => {
      this.data = resp
    })


    /* El código `this.dataService.getBuenaventuraTransporters().subscribe((resp) => {
    this.dataTransporters = resp })` está realizando una solicitud HTTP al método
    `getBuenaventuraTransporters()` del servicio `dataService`. Se suscribe a la respuesta de la
    solicitud HTTP y asigna los datos de respuesta a la variable `dataTransporters`. Esto permite
    que el componente recupere los datos de los transportadores del servidor y los utilice en la
    plantilla u otras partes del componente. */
    this.dataService.getBuenaventuraTransporters().subscribe((resp) => {
      this.dataTransporters = resp
    })

    /* El código `this.myForm = this.fb.group({... })` está creando un grupo de formularios utilizando
    el servicio FormBuilder. El grupo de formularios se utiliza para crear un formulario en Angular,
    que permite el enlace, la validación y el envío de datos. */
    this.myForm = this.fb.group({
      buenaventuraCali: ["",[Validators.required], [this.validatorTransporterServices]],
      yard            : ["",[Validators.required]],
      return          : ["",[Validators.required]],
      download        : ["",[Validators.required]],
      aguadulce       : ["",[Validators.required]],
      standBy         : ["",[Validators.required]],
      upDate          : [new Date()]
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
   * La función de envío comprueba si un formulario no es válido, muestra una notificación de error si
   * lo es; de lo contrario, envía los datos del formulario a un servicio, muestra una notificación de
   * éxito, restablece el formulario y recarga la página.
   */
  submit() {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    }else {
      let form = this.myForm.value
      this.dataService.createtBuenaventuraTransporters(form).subscribe()
      let status = "success"
      this.notificationSuccess(status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  /**
   * La función `editForm()` se utiliza para manejar el envío de un formulario, marcando todos los
   * campos como tocados, validando el formulario y luego mostrando una notificación de error o
   * enviando los datos del formulario al servidor, mostrando una notificación de éxito, restableciendo
   * el formulario y actualizar la página.
   */
  editForm() {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    } else {
      let form = this.myForm.value
      this.dataService.editTransporter(this.transporterName, form).subscribe()
      let status = "success"
      this.notificationSuccess(status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

 /**
  * La función `getTransporters` recupera información del transportador del servicio de datos y
  * actualiza los campos del formulario en consecuencia.
  * @param {string} transporter - El parámetro "transportador" es una cadena que representa el nombre
  * de un transportador.
  */
  getTransporters(transporter: string) {
    this.myForm.get('buenaventuraCali')?.setAsyncValidators(null)
    this.dataService.getTransporterID(transporter).subscribe((resp: TRANSPORTER[]) => {
      this.transporterName = transporter
      this.myForm.patchValue({
        buenaventuraCali :resp[0]?.buenaventuraCali,
        yard             :resp[0]?.yard,
        return           :resp[0]?.return,
        download         :resp[0]?.download,
        aguadulce        :resp[0]?.aguadulce,
        standBy          :resp[0]?.standBy,
        upDate           :new Date()
      })
    })
    this.isInputReadOnly = true
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
