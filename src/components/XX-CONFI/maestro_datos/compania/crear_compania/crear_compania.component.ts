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
import paisService from '@/components/service/pais.service';
import monedaService from '@/components/service/moneda.service';
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
    strCountry_desc:string='';
    strRegion_desc:string='';

    dataMoneda:MonedaModel[];
    gridPais:PaisModel[]
    public moneda:MonedaModel=new MonedaModel();
    loading1:boolean=false;
    constructor(){    
        super();
        Global.nameComponent='crear-compania';
        setTimeout(() => {
            this.load();
            this.loadPais();
            this.loadMoneda();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
    }
    guardarTodo(){
        
        //this.compania.strCompany_Cod=this.companyCod;
        this.compania.strCountry_desc=this.strCountry_desc;
        this.compania.strRegion_desc=this.strRegion_desc;

        if(this.compania.strCompany_Cod==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.compania.strCompany_Desc==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.compania.strAddress==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.compania.strCountry==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.compania.strRegion==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.compania.strRUC==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.strCurr_Funct==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.strCurr_Grp==''){ this.$message('Complete los campos obligatorios '); return false;}
        if(this.strCurr_Loc==''){ this.$message('Complete los campos obligatorios '); return false;}
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
                this.selectMonedaA=new MonedaModel();
                this.selectMonedaB=new MonedaModel();
                this.selectMonedaC=new MonedaModel();
                this.gridSelectPais=new PaisModel();
                this.selectDepartamento=new DepartamentoModel();
                this.strCurr_Loc='';
                this.strCurr_Grp='';
                this.strCurr_Funct='';
                this.textosave = 'Se guardo correctamente. '+resp.strCompany_Cod;
                this.compania=new CompaniaModel();
                this.strRegion_desc='';
                this.strCountry_desc='';
                this.strCountry_desc='';
                this.strCurr_Loc='';
                this.strCurr_Grp='';
                this.strCurr_Funct='';
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

      loadPais(){
        paisService.GetAllPais()
        .then(response=>{        
          this.gridPais=response;   
        })
      }
      loadMoneda(){
        monedaService.GetAllMoneda()
        .then(response=>{
          this.dataMoneda=response;  
        })
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
        this.buscarPais();
        if(this.paisVisible){
          this.btnactivarpais=false;
        }
      }
      handleClosePais(){
        this.paisVisible=false;
      }
      paisSelect(val:PaisModel){
        debugger;
        this.compania.strRegion='';
        this.gridSelectPais=val;
        this.compania.strCountry=this.gridSelectPais.strCountry_Cod;
        this.strCountry_desc=val.strCountry_Name.toString();
        this.departEnabled=false;
        this.paisVisible=false;
      }
      buscarPais(){
        var data=Global.like(this.gridPais,'strCountry_Cod',this.compania.strCountry)
        if(data.length>0&&this.compania.strCountry!=""){
          this.gridSelectPais=data[0];
          this.departEnabled=false;
          this.compania.strCountry=this.gridSelectPais.strCountry_Cod;
          this.GetAllDepartamento(this.gridSelectPais.strCountry_Cod);
        }
        else{
          this.gridSelectPais=new PaisModel();
          this.compania.strCountry="";
        }
      }
      buscarDepartamento(){
        var data=Global.like(this.DepartamentoGrid,'strRegion_Cod',this.compania.strRegion)
        if(data.length>0&&this.compania.strRegion!=""){
          this.selectDepartamento=data[0];
          this.compania.strRegion=this.selectDepartamento.strRegion_Cod
        }
        else{
          this.selectDepartamento=new DepartamentoModel();
          this.compania.strRegion="";
        }
      }
      buscarMonedaLocal(){
        var data=Global.like(this.dataMoneda,'strCurrency_Cod',this.strCurr_Loc)
        if(data.length>0&&this.strCurr_Loc!=""){
          this.selectMonedaA=data[0];
          this.strCurr_Loc=this.selectMonedaA.strCurrency_Cod
        }
        else{
          this.selectMonedaA=new MonedaModel();
          this.strCurr_Loc="";
        }
      }
      buscarMonedaCor(){
        var data=Global.like(this.dataMoneda,'strCurrency_Cod',this.strCurr_Funct)
        if(data.length>0&&this.strCurr_Funct!=""){
          this.selectMonedaB=data[0];
          this.strCurr_Funct=this.selectMonedaB.strCurrency_Cod
        }
        else{
          this.selectMonedaB=new MonedaModel();
          this.strCurr_Funct="";
        }
      }
      buscarMonedaGrupo(){
        var data=Global.like(this.dataMoneda,'strCurrency_Cod',this.strCurr_Grp)
        if(data.length>0&&this.strCurr_Grp!=""){
          this.selectMonedaC=data[0];
          this.strCurr_Grp=this.selectMonedaC.strCurrency_Cod
        }
        else{
          this.selectMonedaC=new MonedaModel();
          this.strCurr_Grp="";
        }
      }

      GetAllDepartamento(val){
        departamentoService.GetAllDepartamentoByPais(val)
        .then(response=>{
          this.DepartamentoGrid=[];
          this.DepartamentoGrid=response;       
          this.loading1=false;
        }).catch(error=>{
          this.loading1=false;
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se puede cargar lista de departamento'
          });
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
        this.strRegion_desc=this.selectDepartamento.strRegion_Desc;
      }
      departChosseCheck(){
        this.departVisible=false;
      }
      departChosseClose(){
        this.departVisible=false;
        this.selectDepartamento=new DepartamentoModel();
      }
      departDialog(){
        this.loading1=true;
        this.departVisible=true;
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
        //debugger;
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
        //debugger;
        
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
    this.buscarMonedaLocal();
    if(this.dialogMonedaL){
      this.btnactivarMonedaL=false;
    }
  }
  
  MonedaSeleccionadoL(val:MonedaModel){
      //debugger;
    this.strCurr_Loc=val.strCurrency_Cod;
    this.selectMonedaA=val;
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
    this.buscarMonedaCor();
    if(this.dialogMonedaC){
      this.btnactivarMonedaC=false;
    }
  }
  
  MonedaSeleccionadoC(val:MonedaModel){
    this.strCurr_Funct=val.strCurrency_Cod;
    this.selectMonedaB=val;
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
    this.buscarMonedaGrupo();
    if(this.dialogMonedaG){
      this.btnactivarMonedaG=false;
    }
  }
  
  MonedaSeleccionadoG(val:MonedaModel){
    this.strCurr_Grp=val.strCurrency_Cod;
    this.selectMonedaC=val;
    this.dialogMonedaG=false;
  }
  //#endregion
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridPais:[],
            dataMoneda:[],
            DepartamentoGrid:[],
            inputAtributo:'',
            loading1:false
        }
    }
  
}
