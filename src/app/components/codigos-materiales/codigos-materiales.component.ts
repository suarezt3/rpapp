import { Component, OnInit } from '@angular/core';
import { MATERIAL } from 'src/app/interfaces/codigoMaterial';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-codigos-materiales',
  templateUrl: './codigos-materiales.component.html',
  styleUrls: ['./codigos-materiales.component.css']
})
export class CodigosMaterialesComponent implements OnInit {

  public data!: MATERIAL[];
  public isVisible: boolean = false;
  public isOkLoading: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);

    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
