import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-port-fees',
  templateUrl: './port-fees.component.html',
  styleUrls: ['./port-fees.component.css']
})
export class PortFeesComponent implements OnInit {

  public myForm! : FormGroup;
  public data: any;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(){

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
      this.dataService.createPortFees(this.myForm.value).subscribe()
      this.myForm.reset()
    }
  }


  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

}
