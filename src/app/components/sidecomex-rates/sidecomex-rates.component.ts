import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidecomex-rates',
  templateUrl: './sidecomex-rates.component.html',
  styleUrls: ['./sidecomex-rates.component.css']
})
export class SidecomexRatesComponent implements OnInit {

  public myForm!: FormGroup;

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      concept: ["",[]],
      value  : ["",[]]
    })
  }

}
