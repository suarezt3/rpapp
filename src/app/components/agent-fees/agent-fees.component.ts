import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from 'src/app/services/data.service';
import { ValidatorServices } from 'src/app/services/validator.service';

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
  public status         : string = "";

  constructor(private fb: FormBuilder, private dataService: DataService, private notification: NzNotificationService) {}

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
      shippingCompany : ["", [Validators.required]],
      container       : ["", [Validators.required]],
      process         : ["", [Validators.required]],
      total           : ["", [Validators.required]],
      daysPerContainer: ["", [Validators.required]],
      drop            : ["", [Validators.required]],
      upDate          : [new Date()]
    })
  }

  getShipping (shipping: string) {

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


  submit() {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      let status = "error"
      this.notificationError(status)
    }else {
      this.dataService.createShippingFees(this.myForm.value).subscribe()
      this.status = "success"
      this.notificationSuccess(this.status)
      this.myForm.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }


  editForm () {

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
