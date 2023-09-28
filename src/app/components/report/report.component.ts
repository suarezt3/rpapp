import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MATERIAL } from 'src/app/interfaces/codigoMaterial';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public data!: MATERIAL[];
  public formSearch!: FormGroup;
  public materialExiste: boolean = true;
  public material: string = '';
  public isVisible: boolean = false;
  public isOkLoading: boolean = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);
    })

    this.formSearch = this.fb.group({
      search: ["", [Validators.required]]
    })

  }



  enviar() {
    let material = this.formSearch.get('search')?.value.toUpperCase()
    this.dataService.getMaterialID(material).subscribe((resp: MATERIAL[]) => {
      console.log("MATERIAL",resp);
      if(resp.length === 0) {
        this.materialExiste = false
        this.material = material

      }
      else{
        this.materialExiste = true
      }
    })

    this.formSearch.reset()
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
