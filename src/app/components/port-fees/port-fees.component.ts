import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-port-fees',
  templateUrl: './port-fees.component.html',
  styleUrls: ['./port-fees.component.css']
})
export class PortFeesComponent implements OnInit {

  public myForm! : FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(){

    /**
     * Formulario de tarifas de puerto
     */
    this.myForm = this.fb.group({
      portTerminal   : ["", [Validators.required]],
      useInstaltions : ["", [Validators.required]],
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
   * Para validar los campos del formulario
   * @returns
   */
  invalidField( field: string ) {
    return this.myForm.get(field)?.invalid
            && this.myForm.get(field)?.touched;
  }

  submit () {
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) {
      console.log("No puedes enviar");
    }else {
      console.log(this.myForm.value);
      this.myForm.reset()
    }
  }

}
