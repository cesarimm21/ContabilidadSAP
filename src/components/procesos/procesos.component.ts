import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.css';
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Notification } from 'element-ui';
import procesosService from '@/components/service/procesos.service';
@Component({
    name: 'procesos'
  })
  export default class Procesos extends Vue {
      gridData:any;
      gridPlantilla:any;
      gridDataProceso:any;
      gridDataJerarquia:any;
      gridJerarquia:any;
      modalAgregar:any;
      modalProceso:boolean = false;
      modalColado:boolean=false;
      addTipe:any;
      addProceso:any;
      addColado:any;
      jerarquiaForm:any;
      deleteTipApro:any;
      CodTipoAprobacion:any;
      CodPlantillaAprobacionSelect:any;
      AntesORDespues:any;
      paginaNumero:number =1;
      RegistersForPage:number = 6;
      totalRegistros:number = this.RegistersForPage;
      multipleSelection:any;
      multiplePlantillaSelection:any;
      showButtonCol:boolean=false;
      showButtonPro:boolean=false;
      defaultSelectAdd:any=[];
      loadingTable:boolean=false;
      loadingTable1:boolean=true;
      loadingTable2:boolean=false;
      viewCard:boolean=false;
    constructor(){
        super();
        this.GetAllTipoAprobacion();        
    }
    GetAllTipoAprobacion()
    {
    debugger;
        procesosService.GetAllTipoAprobacion()
        .then(response => {
            this.gridData = response;
          })
          .catch(e =>{
            this.openMessageError('Error al cargar tipo de aprobaciones');
            console.log(e);
          })
    }
    GetAllPlantilla()
    {
    debugger;
        procesosService.GetAllPlantilla()
        .then(response => {
            this.gridPlantilla = response;
            this.loadingTable1=false;
          })
          .catch(e =>{
            this.openMessageError('Error al cargar plantillas');
            console.log(e);
          })
    }
    handleAgregar(){
        debugger;
        this.modalProceso=true;
        this.GetAllPlantilla();
    }
    handleAgregarColado(){
        debugger;
        this.modalColado=true;
        this.GetAllPlantilla();

    }
     handleDeleteTipoAprobacion(deleteTipApro) {
         debugger;
        this.$confirm('Desea eliminar el tipo de aprobación actual? ', 'Eliminar', {
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            type: 'warning'
          }).then(() => {
            this.DeleteTipoAprobacion(deleteTipApro);
          })
      }
        DeleteTipoAprobacion(deleteTipApro){
        debugger;
        
        procesosService.DeleteTipoAprobacion(deleteTipApro)
        .then(response => {
          this.openMessage('Tipo de aprobacion eliminado correctamente: '+response);
          this.CodTipoAprobacion='';
          this.gridDataProceso=[];
          this.viewCard=false;
          this.loadingTable2=false;
          this.gridData=[];
          this.ChangeData(this.CodTipoAprobacion);
            this.showButtonCol=false;
            this.showButtonPro=false;
            this.loadingTable2=false;
            this.GetAllTipoAprobacion();
        })
        .catch(e =>{
          this.openMessageError('Error al eliminar tipo de aprobacion');
          console.log(e);
        })
      }
    GetProceso(CodTipoAprobacion)
    {
    debugger;
        procesosService.GetProceso(CodTipoAprobacion)
        .then(response => {
            this.gridDataProceso = response;
            this.loadingTable2=false;
          })
          .catch(e =>{
            this.openMessageError('Error al cargar los procesos');
            console.log(e);
          })
    }
    ChangeData(CodTipoAprobacion){
        debugger;
        this.viewCard=true;
        this.loadingTable2=false;
        debugger;
        if(this.CodTipoAprobacion==''){

        }
        else{

        this.showButtonCol=true;
        this.showButtonPro=true;
        this.addColado.CodTipoAprobacion=CodTipoAprobacion;
        this.addProceso.CodTipoAprobacion=CodTipoAprobacion;
        this.deleteTipApro.CodTipoAprobacion=CodTipoAprobacion;
        // this.$refs.handleAgregarButton.enabled
        this.GetProceso(CodTipoAprobacion);  
        }
           
      }
      handleEdit(index, row) {
        console.log(index, row);
      }
      handleDelete(index, row) {
        this.$confirm('Desea eliminar el proceso: '+row.Descripcion +' ?', 'Eliminar', {
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            type: 'warning'
          }).then(() => {
            this.EliminarProceso(row);
          }).catch(() => {
          });
        console.log(index, row);
      }
      EliminarProceso(row){
        debugger;
        procesosService.EliminarProceso(row)
        .then(response => {
          this.openMessage('Proceso eliminado correctamente: '+row.Descripcion);
          this.ChangeData(this.CodTipoAprobacion);
        })
        .catch(e =>{
          this.openMessageError('Error al eliminar proceso');
          console.log(e);
        })
      }
    AgregarTipoApro(addTipe){
        debugger;
        if(this.addTipe.TipoDescripcion==''){
            this.openMessageAlert('Por favor ingrese descripcion ');
        }
        else{
            procesosService.AgregarTipoApro(this.addTipe)
            .then(response =>{
                this.openMessage('Mensaje: '+ response)
                this.GetAllTipoAprobacion();
                this.modalAgregar=false;
                this.addTipe.TipoDescripcion='';
    
            })
            .catch(e =>{
                this.openMessageError('Error al agregar tipo de aprobacion');
            })
        }
        
    }
    ChangeDataJerarquia(jerarquiaForm){
        this.loadingTable=true;
        debugger; 
        this.GetJerarquia(this.jerarquiaForm);
    }
    searchJerarquia(jerarquiaForm){
        this.loadingTable=true;
        debugger; 
        this.GetJerarquia(this.jerarquiaForm);
    }
    GetJerarquia(jerarquiaForm){
        procesosService.GetJerarquia(this.jerarquiaForm)
        .then(response => {
            this.gridDataJerarquia = response;  
            this.totalRegistros=this.gridDataJerarquia.Count;
            var data=this.gridDataJerarquia.Data;      
            this.gridJerarquia = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
            this.loadingTable=false;
          })
          .catch(e =>{
            this.openMessageError('Error al cargar los jerarquia');
            console.log(e);
          })
    }
    cambioPagina(){
        var data1=this.gridDataJerarquia.Data;
        this.gridJerarquia = data1.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      }
    AgregarProceso(addProceso){
        if( this.addProceso.Descripcion==''){
            this.openMessageAlert('Ingrese descripcion de proceso');
        }
        else{
            debugger;
            procesosService.AgregarProceso(this.addProceso)
            .then(response =>{
                this.openMessage('Mensaje: '+ response)
                this.defaultSelectAdd=[0],
                this.addProceso.Descripcion='';
                this.addProceso.lstPlantilla = [];
                this.modalProceso=false;
                this.gridDataProceso=[];
                this.GetAllTipoAprobacion();
                this.loadingTable2=false;
                
                
                
            })
            .catch(e =>{
                this.openMessageError('Error al agregar proceso');
                console.log(e)
            })
        }
        
    }
    CancelProceso(){
        this.modalProceso=false;
        this.defaultSelectAdd=[0];
        this.addProceso.Descripcion='';
        this.addProceso.lstPlantilla = [];

    }
    CancelColado(){
        this.modalColado=false;

    }
    AgregarColado(addColado){
        debugger;       
        if(this.addColado.CodProceso==''){
            this.openMessageAlert('Seleccione proceso');
        }
        else if(this.addColado.CodTipoAprobacion==''){
            this.openMessageAlert('Seleccione tipo de aprobacion');
        }
        else if(this.addColado.CodPosicion==''){
            this.openMessageAlert('Seleccione posicion de colado');
        }
        else{
            procesosService.AgregarColado(addColado)
            .then(response =>{
                this.openMessage('Mensaje: '+ response)
                this.GetJerarquia(this.jerarquiaForm);
                this.addColado.CodProceso='';
                this.modalColado=false;
                this.ChangeData(this.CodTipoAprobacion);
                console.log("NEXT NEXT"+this.CodTipoAprobacion);
            })
            .catch(e =>{
                this.openMessageError('Error al agregar colado');
            })
        }
       
    }
    handleSelectionChange(val) {
        debugger;
        if(val.length==0 || val.length==1){
            this.multipleSelection = val;
            this.addColado.CodPosicion=val[0].CodPosicion;
        }
        else{
            this.openMessageAlert('Seleccione solo 1 de la tabla');
        }  
      }
      handlePlantilla(val){
        debugger;
        this.addProceso.lstPlantilla = [];
        for (let i = 0; i < val.length; i++) {
            this.addProceso.lstPlantilla.push({
              CodPlantillaAprobacion: val[i].CodPlantillaAprobacion,
              Tipo:val[i].Tipo,
              Descripcion: val[i].Descripcion
            });
          }
      }
    openMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'success'
        });
      }
      openMessageError(strMessage:string){
        this.$message({
            showClose: true,
            type: 'error',
            message: strMessage
          });
      }
      openMessageAlert(strMessage:string){
        this.$message({
            showClose: true,
            type: 'warning',
            message: strMessage
          });
      }
    data(){
        return{
            value: '',
            gridData:[],
            gridPlantilla:[],
            gridDataProceso:[],
            viewCard:false,
            // gridDataJerarquia:[],
            gridJerarquia:[],
            modalAgregar:false,
            // modalProceso:false,
            formLabelWidth:'120px',
            LabelWidth:'100px',
            addTipe:{
                TipoDescripcion:'',
                UsuCreacion:localStorage.getItem('User_Usuario')
            },
            addProceso:{
                Descripcion:'',
                UsuarioCrea:localStorage.getItem('User_Usuario'),
                lstPlantilla:[],
            },
            addColado:{
                CodProceso:'',
                CodTipoAprobacion:'',
                CodPosicion:'',
                UsuarioCrea:localStorage.getItem('User_Usuario'),
                Nivel:'-1',
                TablaReferencia:'C',
                TipoOpcion:''
            },
            jerarquiaForm:{
                Tipo:'',
                Descripcion:''
            },
            deleteTipApro:{
                CodTipoAprobacion:'',
                UsuarioModif:localStorage.getItem('User_Usuario')
            },
            CodTipoAprobacion:'',
            CodPlantillaAprobacionSelect:'',
            rowSelectedEdit:'',
            options: [{
                value: 'A',
                label: 'Antes del proceso'
              }, {
                value: 'D',
                label: 'Despues del proceso'
              }],
            AntesORDespues:'',
            defaultSelectAdd:[0]
        }
    }
  }