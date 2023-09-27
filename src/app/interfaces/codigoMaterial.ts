export interface MATERIAL {
  id?:                 string;
  created_at?:         Date;
  materialOrigen?:     string;
  tipo?:               string;
  paisExportador?:     string;
  paisOrigen?:         null | string;
  proveedor?:          string;
  clasificacion?:      null | string;
  materialLocal?:      string;
  descripcion?:        string;
  partidaArancelaria?: number;
  upDate?:             null;
}
