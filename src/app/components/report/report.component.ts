import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MATERIAL } from 'src/app/interfaces/codigoMaterial';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public data!: MATERIAL[];
  public formSearch!: FormGroup

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);
    })

    this.formSearch = this.fb.group({
      search: ["".toUpperCase()]
    })


  }

  enviar() {
    console.log(this.formSearch.get('search')?.value.toUpperCase());
    console.log(this.formSearch.value);

    this.formSearch.reset()
  }


}
