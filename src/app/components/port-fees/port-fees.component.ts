import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PORT } from 'src/app/interfaces/port.interface';

@Component({
  selector: 'app-port-fees',
  templateUrl: './port-fees.component.html',
  styleUrls: ['./port-fees.component.css']
})
export class PortFeesComponent implements OnInit {

  public myForm! : FormGroup;
  public data: any;
  public total!: number;
  public isDisable1: boolean = true
  public isDisable2: boolean = true
  public isDisable3: boolean = true
  public status: string = ""
  public port!    : PORT[]


  constructor(private fb: FormBuilder, private dataService: DataService, private notification: NzNotificationService) {}

  ngOnInit(){

   /**
    * Metodo para traer la data
   */
    this.dataService.getPortFees().subscribe((resp) => {
      console.log("DATA", resp);
      this.data = resp
    })

    /**
     * Formulario de tarifas de puerto
    */
   this.myForm = this.fb.group({
     portTerminal   : ["", [Validators.required]],
     useInstalations: ["", [Validators.required]],
     weighing       : ["", [Validators.required]],
     load           : ["", [Validators.required]],
     relocation     : ["", [Validators.required]],
     storage        : ["", [Validators.required]],
     totalUSD       : ["", [Validators.required]],
     inspection     : ["", [Validators.required]]
    })


  }


  /**
   *
   * @param event Metodos para detectar los cambios en los campos del formulario
   */
  onInputChange1(event: any) {
    this.total = this.myForm.get('useInstalations')?.value;
    this.isDisable1 = false
  }

  onInputChange2(event: any) {
    this.total = this.total + this.myForm.get('weighing')?.value;
    this.isDisable2 = false
  }

  onInputChange3(event: any) {
   this.total = this.total + this.myForm.get('load')?.value;
    this.isDisable3 = false
  }

  onInputChange4(event: any) {
   this.total = this.total + this.myForm.get('relocation')?.value;
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


  getPort(port: string) {
    this.dataService.getPortFeesID(port).subscribe((resp: PORT[]) => {
        this.port = resp
        console.log("RESP", this.port);
        this.myForm.patchValue({

          portTerminal: resp[0]?.portTerminal,
          useInstalations: resp[0]?.useInstalations,
          relocation: resp[0]?.relocation,
          storage: resp[0]?.storage,
          weighing: resp[0]?.weighing,
          totalUSD: resp[0]?.totalUSD,
          load: resp[0]?.load,
          inspection: resp[0]?.inspection
        });

    })
  }

  /**
   * La función de envío comprueba si un formulario es válido y muestra un mensaje de error o envía los
   * datos del formulario a un servicio y muestra un mensaje de éxito.
   */
  submit () {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      console.log("No puedes enviar");
      let status = "error"
      this.notificationError(status)
    }else {
      console.log(this.myForm.value);
      this.dataService.createPortFees(this.myForm.value).subscribe()
      this.status = "success"
      this.notificationSuccess(this.status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 2000);
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
