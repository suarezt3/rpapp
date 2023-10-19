export interface PARTIDASARANCELARIAS {
  id?:                 string;
  created_at?:         Date;
  tipo?:               string;
  origen?:             string;
  paisOrigen?:         string;
  acuerdoComercial?:   string;
  proveedor?:          string;
  materialLocal?:      string;
  materialOrigen?:     string;
  descripcion?:        string;
  incoterm?:           string;
  puertoOrigen?:       string;
  toneladaContainer?:  string;
  tipoContenedor?:     string;
  agenteCarga?:        string;
  partidaArancelaria?: number;
  archivoSidecomex?:   number;
  aplicaAcuerdo?:      boolean;
  arancelGeneral?:     string;
  variables?:          boolean;
  arancelAplicar?:     string;
  DSA?:                boolean;
}
