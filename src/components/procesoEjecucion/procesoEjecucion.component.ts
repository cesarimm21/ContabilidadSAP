import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'element-ui/lib/theme-default/index.css';
import router from '../../router';
import ElementUI from 'element-ui';
import ProcesoEjecucion from '@components/ProcesoEjecucion/ProcesoEjecucion.vue';
import * as CONFIG from '../../Config';
import { Notification } from 'element-ui';
import procesoEjecucionService from '@/components/service/procesoEjecucion.service';
@Component({
    name: 'procesoEjecucion',
 
 }) 
 export default class ProcesoEjecucionComponent extends Vue {
    TitleEjecucion:string ="Procesos en ejecución";
    gridData : any;
    loading:boolean=false;
    paginaNumero:number =1;
    RegistersForPage:number = 10;
    ProcesoEjecModel: {CodProceso:number,CodRegistro:string,Tipo:string,Proceso:string,Estado:string,Fecha:string,Total:number}={  
        CodProceso:this.paginaNumero,
        CodRegistro:'',
        Tipo:'',
        Proceso:'',
        Estado:'',
        Fecha:'',
        Total:this.RegistersForPage
    };
    DocumentoModel:{strCodDocumento:string,nombre:string,Codigo:string}={
      strCodDocumento:'',
      nombre:'',
      Codigo:''
    }
    totalRegistros:number;
    dataComplet:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  constructor(){
    super();
    this.ChechAccess();
    this.loadingData(this.ProcesoEjecModel);
  }
  ChechAccess(){
    var lista:any = localStorage.getItem('usuario_accesos');
    if(lista === null){
      this.$router.push('/');
    }
    else{
      var listaAccesos:any = JSON.parse(lista).Data;
      var flag:boolean = false;
      for(var i=0; i<listaAccesos.length; i++){
        if(listaAccesos[i].strNombre === 'Procesos Ejecucion'){
          flag=true;
          break;
        }
      }
      if (flag == false){
        if(listaAccesos.length === 0) {
          this.$router.push('/');
        }
        else{
          Notification.warning('No tiene permisos para acceder a esta página')
          this.$router.push('/barmenu/inicio');
        }
      }
    }
  }
loadingData(ProcesoEjecModel){   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loading=true;
    procesoEjecucionService.loadingData(ProcesoEjecModel)
    .then(response => {
        debugger;
      this.gridData = response;
      this.totalRegistros=response.Count;    
      // this.totalRegistros=this.dataComplet.Count;
      // var data=this.dataComplet.Data;      
      // this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loading=false;
    })
    .catch(e =>{
      console.log('Error: '+e)
    })
  }
  SearchData(){
    console.log(this.ProcesoEjecModel);
    this.ProcesoEjecModel.CodProceso=this.paginaNumero;
    this.ProcesoEjecModel.Total=this.RegistersForPage;
    debugger;
    this.loading=true;
    procesoEjecucionService.loadingData(this.ProcesoEjecModel)
    .then(response => {
        debugger;
      this.gridData = response;    
      // this.totalRegistros=this.dataComplet.Count;
      // var data=this.dataComplet.Data;      
      // this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loading=false;
    })
    .catch(e =>{
      console.log('Error: '+e)
    })
  }
  // cambioPagina(total, prev, pager, next){
  // cambioPagina(total, prev, pager, next){
  //   debugger;
  //   this.ProcesoEjecModel.CodProceso=this.RegistersForPage*(this.paginaNumero-1);
  //   // this.ProcesoEjecModel.Total=
  //   // var data1=this.dataComplet.Data;
  //   // this.gridData = data1.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
  // }
  handleCurrentChange(val) {
    debugger;
    this.ProcesoEjecModel.CodProceso=val;
    this.ProcesoEjecModel.Total=this.RegistersForPage;
    this.loadingData(this.ProcesoEjecModel);
  }
  onChange(event){
    if(event=='ST'){
      this.ProcesoEjecModel.Tipo='';
    }
    if(event=='SP'){
      this.ProcesoEjecModel.Proceso='';
    }
    if(event=='SE'){
      this.ProcesoEjecModel.Estado='';
    } 
    console.log(event);
     
    debugger;
  }
  getDateString(fecha:string){
    var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    return dateString;
  }

  handleEdit(index, row){
    debugger;
    this.DocumentoModel.strCodDocumento=row.CodRegistro;
    this.DocumentoModel.nombre=row.Tipo;
    this.DocumentoModel.Codigo=row.Proceso;
    procesoEjecucionService.reloadProceso(this.DocumentoModel)
    .then(response=>{
      if(response=='bien'){
        this.openMessage("Enviado a re-procesar correctamente")
        this.loadingData(this.ProcesoEjecModel);
      }
      else if(response=='mal'){
        this.openMessage("Enviado a re-procesar incorrecto ")
        this.loadingData(this.ProcesoEjecModel);
      }      
    })
    .catch(e=>{
      console.log('Error: '+e)
    })
  }
  clickable(row){
    debugger;
    if(row.Estado=='I'){
      return false
    }
    else return true;
  }
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  data() {

    return {
      gridData: [],
      formLabelWidth: '120px',
      options: [{
        value: 'ST',
        label: 'Seleccione Tipo'
      },{
        value: 'E',
        label: 'Excel'
      }, {
        value: 'W',
        label: 'Words'
      }],
      procesoItem: [{
        value: 'SP',
        label: 'Seleccione Proceso'
      },{
        value: 'N',
        label: 'Nuevo'
      },
    {
      value: 'A',
      label: 'Aprobación'
    }],
      procesoEstado: [{
        value: 'SE',
        label: 'Seleccione Estado'
      },{
        value: 'N',
        label: 'Nuevo'
      },{
        value: 'P',
        label: 'Procesando'
      }, {
        value: 'A',
        label: 'Aprobado'
      }, {
        value: 'I',
        label: 'Reprocesar'
      }]
    }
  }
}