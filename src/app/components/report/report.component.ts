import { Component, OnInit } from '@angular/core';
import { MATERIAL } from 'src/app/interfaces/codigoMaterial';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public data!: MATERIAL[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);

    })
  }

}
