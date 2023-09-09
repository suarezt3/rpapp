import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidecomex-rates',
  templateUrl: './sidecomex-rates.component.html',
  styleUrls: ['./sidecomex-rates.component.css']
})
export class SidecomexRatesComponent implements OnInit {

  public myForm!: FormGroup;
  public concepts!  : any;
  public isInputReadOnly: boolean = false

  constructor (private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.getConcepts().subscribe((resp) => {
      this.concepts = resp
      console.log(this.concepts);
    })

    this.myForm = this.fb.group({
      concept: ["",[]],
      value  : ["",[]]
    })
  }

  submit(){
    console.log(this.myForm.value);
  }

}
