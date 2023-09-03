import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ValidatorServices } from 'src/app/services/validator.service';

@Component({
  selector: 'app-agent-fees',
  templateUrl: './agent-fees.component.html',
  styleUrls: ['./agent-fees.component.css']
})
export class AgentFeesComponent implements OnInit {

  public myForm!         : FormGroup;
  public shippingCompany!: any;
  public isInputReadOnly : boolean = false;
  public total!          : number;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(){

    this.dataService.getShipping().subscribe((resp) => {
      this.shippingCompany = resp
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
    console.log("FORMULARIO", this.myForm.value);
    this.dataService.createShippingFees(this.myForm.value).subscribe()
  }


  editForm () {

  }


}
