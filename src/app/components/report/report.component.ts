import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MATERIAL } from 'src/app/interfaces/codigoMaterial';
import { INCOTERMS } from 'src/app/interfaces/incoterms';
import { PARTIDASARANCELARIAS } from 'src/app/interfaces/partidasarancelarias';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public data!               : MATERIAL[];
  public dataMaterial!       : MATERIAL[];
  public incoterms!          : INCOTERMS[];
  public partidaArancelaria! : PARTIDASARANCELARIAS[];
  public formSearch!         : FormGroup;
  public formReport!         : FormGroup;
  public materialExiste!     : boolean;
  public material            : string  = '';
  public isVisible           : boolean = false;
  public isOkLoading         : boolean = false;
  public decimalValidator    : string  = "^[0-9]+(\,[0-9]{1,2})?$";



  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {

    /**
     * Trae los datos de los materiales de la base de datos
     */
    this.dataService.getCodigoMaterial().subscribe((resp: MATERIAL[]) => {
      this.data = resp
      console.log(this.data);
    })

    /**
     * Trae la lista de los incoterms de la base de datos
     */
    this.dataService.getIncoterms().subscribe((resp: INCOTERMS[]) => {
      this.incoterms = resp
    })

    this.dataService.getFreight().subscribe((resp) => {
      console.log("FREIGHT", resp);
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
      incoterm          : [""], //!Pendiente por la validacion
      incotermCiudad    : [""], //!Pendiente por la validacion
      puertoOrigen      : [""], //!Pendiente por la validacion
      toneladasContainer: ["", [Validators.pattern(this.decimalValidator)]],
      tipoContenedor    : ["", [Validators.required]],
      agenteDeCarga     : ["", [Validators.required]],
      arancelGeneral    : [""], //!Pendiente por la validacion
      fletePorContenedor: [""]
    })

    /**
     * Formulario con el campo para buscar los materiales
     */
    this.formSearch = this.fb.group({
      search: ["", [Validators.required]]
    })

  }


  /**
   *
   * Para validar los campos del formulario
   * @returns
   */
  invalidField( field: string ) {
    return this.formReport.get(field)?.invalid
            && this.formReport.get(field)?.touched;
  }


  /**
   * Trae los datos asociados al codigo de material que se envia como parametro
   */
  buscarCodigo() {
    let material = this.formSearch.get('search')?.value.toUpperCase()
    this.dataService.getPartidaArancelariaID(material).subscribe((partida: PARTIDASARANCELARIAS[]) => {
      console.log("PARTIDA", partida);
      this.partidaArancelaria = partida
    })
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
          paisOrigen        : resp[0]?.paisOrigen ?? "No registra",
          proveedor         : resp[0]?.proveedor,
          clasificacion     : resp[0]?.clasificacion ?? "No registra",
          materialLocal     : resp[0]?.materialLocal,
          descripcion       : resp[0]?.descripcion,
          partidaArancelaria: this.partidaArancelaria[0]?.partidaArancelaria ?? undefined,
          arancelGeneral    : this.partidaArancelaria[0]?.arancelGeneral ?? undefined,
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
