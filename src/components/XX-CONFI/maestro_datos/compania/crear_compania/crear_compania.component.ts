import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import departamentoService from '@/components/service/departamento.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
//***Modelos */
import {CompaniaModel} from '@/modelo/maestro/compania';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import companiaService from '@/components/service/compania.service';
import {PaisModel} from '@/modelo/maestro/pais';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
@Component({
  name: 'crear-compania',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class CrearCorrelativoComponent extends Vue {
    nameComponent:string;
    fecha_actual:string;
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public compania:CompaniaModel=new CompaniaModel();
    //**Pais */
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    public DepartamentoGrid:Array<DepartamentoModel>[];
    btnactivardepartamento:boolean=false;
    departVisible:Boolean=false;
    departEnabled:boolean=true;
    public selectDepartamento:DepartamentoModel=new DepartamentoModel();
    public searchDepartamento:DepartamentoModel=new DepartamentoModel();
    clickColumn:string='';
    Column:string='';
    inputAtributo:any;
    blnilterstrRegion_Cod:boolean=true;
    blnilterstrRegion_Desc:boolean=false;

    public Moneda:MonedaModel=new MonedaModel();
    monedaVisible:boolean=false;
    btnactivarmonedaA:boolean=false;
    btnactivarmonedaB:boolean=false;
    btnactivarmonedaC:boolean=false;
    btnactivarmonedaD:boolean=false;
    public selectMonedaA:MonedaModel=new MonedaModel();
    public selectMonedaB:MonedaModel=new MonedaModel();
    public selectMonedaC:MonedaModel=new MonedaModel();
    public selectMonedaD:MonedaModel=new MonedaModel();
    FLAGMONEDA:String;
    //**Moneda */
    dialogMonedaL:boolean=false;
    btnactivarMonedaL:boolean=false;
    dialogMonedaC:boolean=false;
    btnactivarMonedaC:boolean=false;
    dialogMonedaG:boolean=false;
    btnactivarMonedaG:boolean=false;

    strCurr_Loc:string='';
    strCurr_Funct:string='';
    strCurr_Grp:string='';

    dataMoneda:any[];
    public moneda:MonedaModel=new MonedaModel();

    constructor(){    
        super();
        Global.nameComponent='crear-correlativo';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
    }
    guardarTodo(){
        if(this.compania.strCompany_Cod==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.compania.strCompany_Desc==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.compania.strAddress==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.compania.strCountry==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.compania.strRegion==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.compania.strRUC==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.strCurr_Funct==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.strCurr_Grp==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.strCurr_Loc==''){ this.$message('Complete los campos obligatorios'); return false;}
        else{

            this.compania.strCurr_Loc=this.strCurr_Loc;
            this.compania.strCurr_Grp=this.strCurr_Grp;
            this.compania.strCurr_Funct=this.strCurr_Funct;

            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.compania.chrStatus='A';
            this.compania.strCreation_User=this.nameuser;
            companiaService.CrearCompania(this.compania)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCompany_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCompany_Cod;
                this.compania=new CompaniaModel();
                loadingInstance.close();
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo guardar'
                  });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
                loadingInstance.close();
            })
        }
        
    } 
    fnOcultar(){

    }
    handleChange(value) {
        console.log(value);
      }
      backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
      paisDialog(){
        this.paisVisible=true;
      }
      activar_Pais(){
        setTimeout(() => {
          this.btnactivarpais=true;
          this.btnactivardepartamento=false;
        }, 120)
        
      }
      desactivar_Pais(){
        if(this.paisVisible){
          this.btnactivarpais=false;
        }
      }
      handleClosePais(){
        this.paisVisible=false;
      }
      paisSelect(val:PaisModel){
        this.compania.strRegion='';
        this.gridSelectPais=val;
        this.compania.strCountry=this.gridSelectPais.strCountry_Cod;
        this.departEnabled=false;
        this.paisVisible=false;
      }

      GetAllDepartamento(val){
        departamentoService.GetAllDepartamentoByPais(val)
        .then(response=>{
          this.DepartamentoGrid=[];
          this.DepartamentoGrid=response;
          this.departVisible=true;
          
        }).catch(error=>{
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se puede cargar lista de departamento'
          });
          this.departVisible=false;
        })
      }
      activar_Departamento(){
        setTimeout(() => {
          this.btnactivardepartamento=true;
          this.btnactivarpais=false;
        }, 120)
      }
      desactivar_Departamento(){
        if(this.departVisible){
          this.btnactivardepartamento=false;
        }
      }
      handleCloseDepart(){
        this.departVisible=false;
        this.selectDepartamento=new DepartamentoModel();
      }
      departSelect(val:DepartamentoModel){
        this.selectDepartamento=val;
        this.compania.strRegion=this.selectDepartamento.strRegion_Cod;
      }
      departChosseCheck(){
        this.departVisible=false;
      }
      departChosseClose(){
        this.departVisible=false;
        this.selectDepartamento=new DepartamentoModel();
      }
      departDialog(){

        this.GetAllDepartamento(this.gridSelectPais.strCountry_Cod);
      }
      headerclick(val){
        this.Column=val.label;
        if(val.property=="strRegion_Cod"){
          this.clickColumn=val.property;  
          this.searchDepartamento=new DepartamentoModel();  
          this.inputAtributo='';  
          this.blnilterstrRegion_Cod=true;
          this.blnilterstrRegion_Desc=false;
        }
        if(val.property=="strRegion_Desc"){
          this.clickColumn=val.property;
          this.searchDepartamento=new DepartamentoModel();
          this.inputAtributo='';
          this.blnilterstrRegion_Cod=false;
          this.blnilterstrRegion_Desc=true;
        }
      }
      filterstrRegion_Cod(h,{column,$index}){
        debugger;
        var column1 = column.label; 
        if(this.blnilterstrRegion_Cod){
          this.Column=column1;
          this.clickColumn=column.property;
          this.searchDepartamento=new DepartamentoModel();
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
            h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label),
           ])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrRegion_Desc(h,{column,$index}){
        debugger;
        
        if(this.blnilterstrRegion_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
            h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label),
           ])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      searchDepa(){
        this.searchDepartamento.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
        if(this.clickColumn=="strRegion_Cod"){  this.searchDepartamento.strRegion_Cod=this.inputAtributo; }
        if(this.clickColumn=="strRegion_Desc"){ this.searchDepartamento.strRegion_Desc=this.inputAtributo; }
            
        departamentoService.searchDepartamento(this.searchDepartamento)
        .then(resp=>{
          this.DepartamentoGrid=[];
          this.DepartamentoGrid=resp; 
        })
    
    }
    //#region [MONEDA]
  loadMonedaL(){
    this.dialogMonedaL=true;
  }
  
  closeDialogMonedaL(){
    this.btnactivarMonedaL=false;
    this.dialogMonedaL=false;
  }
  activar_MonedaL(){
    setTimeout(() => {
      this.btnactivarMonedaL=true;
    }, 120)
  }
  desactivar_MonedaL(){
    if(this.dialogMonedaL){
      this.btnactivarMonedaL=false;
    }
  }
  
  MonedaSeleccionadoL(val:MonedaModel){
      debugger;
    this.strCurr_Loc=val.strCurrency_Cod;
    this.dialogMonedaL=false;
  }

  loadMonedaC(){
    this.dialogMonedaC=true;
  }
  
  closeDialogMonedaC(){
    this.btnactivarMonedaC=false;
    this.dialogMonedaC=false;
  }
  activar_MonedaC(){
    setTimeout(() => {
      this.btnactivarMonedaC=true;
    }, 120)
  }
  desactivar_MonedaC(){
    if(this.dialogMonedaC){
      this.btnactivarMonedaC=false;
    }
  }
  
  MonedaSeleccionadoC(val:MonedaModel){
    this.strCurr_Funct=val.strCurrency_Cod;
    this.dialogMonedaC=false;
  }

  loadMonedaG(){
    this.dialogMonedaG=true;
  }
  
  closeDialogMonedaG(){
    this.btnactivarMonedaG=false;
    this.dialogMonedaG=false;
  }
  activar_MonedaG(){
    setTimeout(() => {
      this.btnactivarMonedaG=true;
    }, 120)
  }
  desactivar_MonedaG(){
    if(this.dialogMonedaG){
      this.btnactivarMonedaG=false;
    }
  }
  
  MonedaSeleccionadoG(val:MonedaModel){
    this.strCurr_Grp=val.strCurrency_Cod;
    this.dialogMonedaG=false;
  }
  //#endregion
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
