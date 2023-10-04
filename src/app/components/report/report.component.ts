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

  public data!         : MATERIAL[];
  public dataMaterial! : MATERIAL[];
  public formSearch!   : FormGroup;
  public formReport!   : FormGroup;
  public materialExiste!: boolean;
  public material      : string = '';
  public isVisible     : boolean = false;
  public isOkLoading   : boolean = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);
    })

    this.formReport = this.fb.group({
      materialOrigen    : ["", [Validators.required]],
      tipo              : ["", [Validators.required]],
      paisExportador    : ["", [Validators.required]],
      paisOrigen        : ["", [Validators.required]],
      proveedor         : ["", [Validators.required]],
      clasificacion     : [""],
      materialLocal     : ["", [Validators.required]],
      descripcion       : ["", [Validators.required]],
      partidaArancelaria: ["", [Validators.required]],
    })

    /**
     * Formulario con el campo para buscar los materiales
     */
    this.formSearch = this.fb.group({
      search: ["", [Validators.required]]
    })

  }



  enviar() {
    let material = this.formSearch.get('search')?.value.toUpperCase()
    this.dataService.getMaterialID(material).subscribe((resp: MATERIAL[]) => {
      this.dataMaterial = resp;
      console.log("MATERIAL",resp);
      if(resp.length === 0) {
        this.materialExiste = false
        this.material = material
      }
      else{
        console.log("Estoy aqui");
        this.materialExiste = true
        this.formReport.patchValue({
          materialOrigen    : resp[0]?.materialOrigen,
          tipo              : resp[0]?.tipo,
          paisExportador    : resp[0]?.paisExportador,
          paisOrigen        : resp[0]?.paisOrigen,
          proveedor         : resp[0]?.proveedor,
          clasificacion     : resp[0]?.clasificacion,
          materialLocal     : resp[0]?.materialLocal,
          descripcion       : resp[0]?.descripcion,
          partidaArancelaria: resp[0]?.partidaArancelaria
        })
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
