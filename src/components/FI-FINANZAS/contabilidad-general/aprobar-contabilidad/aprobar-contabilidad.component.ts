import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
// import { VueAdsTable } from 'vue-ads-table-tree';

import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';

//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import centrocostosService from '@/components/service/centrocostos.service';
import proveedorService from '@/components/service/proveedor.service';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import {CentroCostosModel } from '@/modelo/maestro/centrocostos';
import ordencompraService from '@/components/service/ordencompra.service';
import diariogeneralService from '@/components/service/diariogeneral.service';
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})

var EditableColumn = {
  template: '#editable-column-content',
  props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
}
@Component({
  name: 'al-crear',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bproveedor':BProveedorComponent,
  } ,
 
})
export default class AprobarContabilidadComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  /*dialog*/
  dialogCompania:boolean=false;
 
  /*input*/
  btnactivarcompania:boolean=false;
   
  /*Model*/
  public productoModel:ProductoModel=new ProductoModel();

  descompania:string='';
  code_compania:string='';

  fecha_actual:string;
  selectrow:any;
  currentRow:any;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  
  formBusqueda:any={
    'strPO_NO':'',
    'desde':new Date(),
    'hasta':new Date(),
    'strVendor_NO':''
  }
  public tableData:Array<CentroCostosModel>=[]; 
  valuem=0;
  btnbuscarb:boolean=false;
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  strPO_NO:string='';
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;
  strVendor_NO:string='';
  strVendor_Desc:string='';
  vifprogress:boolean=true;
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    debugger;
    var cop:any=localStorage.getItem('compania_cod');
    var des:any=localStorage.getItem('compania_name');
    this.productoModel.strCompany_Cod=cop;
    this.productoModel.strCompany_Desc=des;
    this.cargarList();
  }
  async cargarList(){
    debugger;
    var data:any=this.formBusqueda;
    if(this.strPO_NO==''){
      data.strPO_NO='*'
    }
    else{
      data.strPO_NO=this.strPO_NO
    }
    var hdate=new Date(this.fechaHasta);
    hdate.setDate(hdate.getDate()+1)
    // if(this.btnbuscarb){
    //   data.desde=await Global.getDateString(this.fechaDesde)
    //   data.hasta= await Global.getDateString(hdate)
    // }
    // else{
      data.desde="*";
      data.hasta="*";
    // }
    
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    debugger;
    await diariogeneralService.getBusquedaAll(this.productoModel.strCompany_Cod,data.strPO_NO,data.desde,data.hasta)
    .then(res=>{
      debugger;
      for(var i=0;i<50;i++){
        this.valuem++; 
      }
      console.log(res);
      if(this.valuem>=100){
        setTimeout(() => {
          console.log('/****************Busqueda***************/')
          console.log(res)
          this.tableData=res;
          this.vifprogress=false;
        }, 600)
      }
    })
    .catch(error=>{
      
    })
  }
  async Buscar(){
    debugger;
    this.btnbuscarb=true;
    this.cargarList();
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
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    router.push('/')
  }
  confirmaraceptar(){
    this.SendDocument=false;
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(route){
    router.push(route)
  }
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    router.push('/')
  }
  loadCompania(){
    this.dialogCompania=true;
  }
  handleCurrentChange(val) {
    debugger;
    if(val!=null){
      this.selectrow=val;
      this.currentRow = val;
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcompania=true;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }
 
  
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  companiaSeleccionado(val){
    debugger;
    console.log('traer',val);
    this.productoModel.strCompany_Cod=val.strCompany_Cod
    this.descompania=val.strCompany_Desc;
   
    this.dialogCompania=false;
  }
  companiaClose(val){
    this.dialogCompania=false;
  }
  borrarCompania(){
    this.descompania='';
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  enterCompania(code){
    //alert('Bien'+code);
    debugger;
    console.log('compania_enter_1',code);
    companiaService.GetOnlyOneCompania(code)
    .then(response=>{
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strCompany_Cod=response[0].strCompany_Cod
          this.descompania=response[0].strCompany_Desc;
          this.dialogCompania=false;
          this.btnactivarcompania=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar compañia'
      });
    })
  }
  // validarView(){
  //   debugger;
  //   Global.codematerial=this.productoModel.strStock_Cod;
  //   router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_salida_modificar`, query: { vista: 'modificar' }  })
  
  // }
  created() {
    debugger;
    if(typeof window != 'undefined') {
      // this.getAccesos();
      debugger;
      this.vmaterial=Global.vmmaterial;
    }
  }
  async validarView(){
    debugger;
    if(this.selectrow!=undefined && this.selectrow!=null ){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        debugger;
        console.log('----,,,',this.selectrow);
        if(this.selectrow!=undefined && this.selectrow!=null ){
         
          router.push({ path: `/barmenu/FI-FINANZAS/contabilidad-general/modificar-contabilidad`, query: { vista: 'aprobar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione alguna salida. ';
    }
  }
  evaluarMas(numero){
    return numero>0?numero:0

  }
  evaluarMenos(numero){
    return numero<0?numero:0
  }
  desactivar_proveedor(){
    debugger;
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  activar_proveedor(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarproveedor=true;
    }, 120)
  }
  limpiarBotones(){
    this.btnactivarproveedor=false;
  }
  closeProveedor(){
    debugger;
    this.btnactivarproveedor=false;
    return false;
  }
  SeleccionadoProveedor(val){
    debugger;

    this.strVendor_NO=val.strVendor_NO;
    this.strVendor_Desc=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  enterProveedor(code){
    //alert('Bien'+code);
    debugger;
    proveedorService.GetOnlyOneProveedor(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.strVendor_NO=response[0].strVendor_NO;
          this.strVendor_Desc=response[0].strVendor_Desc;
          this.dialogProveedor=false;
          this.btnactivarproveedor=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedor'
      });
    })
  }
  borrarProveedor(){
    this.strVendor_Desc='';
    this.dialogProveedor=false;
    this.btnactivarproveedor=false;
  }
  LoadProveedor(){
    this.dialogProveedor=true;      
  }
  loadT(tree, treeNode, resolve) {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }, {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }
    ])
  }
  filterChanged (filter) {
   
  }
  propList() {
    // return Object.keys(this.props).map(item => ({
    //   name: item,
    // }));
  }

  pageChanged (page) {
     
  }
  onRowClick(row, rowIndex, $event) { 
  //  console.log('row',row);
    console.log('rowIndex',row, rowIndex, $event);
  //  console.log('event',event);
  }
  aa(){
    alert('asdhbhasd');
  }
  handleRowClick(){
    console.log('row clicked');
  }
  rowclick(params){
    alert('.----')
    console.log('-----',params);
  }
  data(){
    let rowss = [
        {
            firstName: 'Josephine',
            lastName: 'Astrid',
        },
        {
            firstName: 'Boudewijn',
            lastName: 'Van Brabandt',
        },
        {
            firstName: 'Albert II',
            lastName: 'Van Belgie',
            _showChildren: true,

            _children: [
                {
                    firstName: 'Filip',
                    lastName: 'Van Belgie',
                    _showChildren: true,

                    _children: [
                        {
                            firstName: 'Elisabeth',
                            lastName: 'Van Brabant',
                        },
                        {
                            firstName: 'Gabriel',
                            lastName: 'Boudwijn',
                        },
                        {
                            firstName: 'Emmanuel',
                            lastName: 'Van Belgie',
                        },
                        {
                            firstName: 'Eleonore',
                            lastName: 'Boudwijn',
                            _showChildren: true,

                            _children: [
                        {
                            firstName: 'dd1',
                            lastName: 'dd1',
                        },
                        {
                            firstName: 'dd2',
                            lastName: 'dd2',
                        },
                        {
                            firstName: 'dd3',
                            lastName: 'dd3',
                        }]
                        },
                    ],
                },
                {
                    firstName: 'Astrid',
                    lastName: 'Van Belgie',
                },
                {
                    firstName: 'Laurent',
                    lastName: 'Van Belgie',
                },

            ],
        },
        {
            firstName: 'Alexander',
            lastName: 'Van Belgie',
        },
        {
            firstName: 'Marie-Christine',
            lastName: 'Leopoldine',
        },
        {
            firstName: 'Marie-Esmeralda',
            lastName: 'Leopoldine',
        },
        {
            firstName: 'Alexander',
            lastName: 'Van Belgie',
        },
        {
            firstName: 'Marie-Christine',
            lastName: 'Leopoldine',
        },
        {
            firstName: 'Marie-Esmeralda',
            lastName: 'Leopoldine',
        },
        {
            firstName: 'Alexander',
            lastName: 'Van Belgie',
        },
        {
            firstName: 'Marie-Christine',
            lastName: 'Leopoldine',
        },
        {
            firstName: 'Marie-Esmeralda',
            lastName: 'Leopoldine',
        },
    ];
    rowss.length = 4;
    let columnss= [
      
      {
          property: 'lastName',
          title: 'Last Name',
          direction: null,
          filterable: true,
          collapseIcon: true,
      },
      {
          property: 'firstName',
          title: 'First Name',
          direction: null,
          filterable: true,
      },
  ];

    return{
      page: 0,
      filter: '',
      rowss,
      columnss,
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType:false,
        selectionType: true,
      },
      data: [
        {
          name: 'Jack',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 10,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20,
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10,
                  children: [
                    {
                      name: 'Ashley',
                      sex: 'female',
                      likes: ['football', 'basketball'],
                      score: 20,
                    },
                    {
                      name: 'Taki',
                      sex: 'male',
                      likes: ['football', 'basketball'],
                      score: 10,
                      children: [
                        {
                          name: 'Ashley',
                          sex: 'female',
                          likes: ['football', 'basketball'],
                          score: 20,
                        },
                        {
                          name: 'Taki',
                          sex: 'male',
                          likes: ['football', 'basketball'],
                          score: 10,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10,
            },
          ],
        },
        {
          name: 'Tom',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 20,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20,
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10,
                },
              ],
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20,
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10,
                },
              ],
            },
          ],
        },
        {
          name: 'Tom',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 20,
        },
        {
          name: 'Tom',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 20,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20,
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10,
            },
          ],
        },
      ],
      columns: [
        {
          label: 'name',
          prop: 'name',
          width: '400px',
        },
        {
          label: 'sex',
          prop: 'sex',
          minWidth: '50px',
        },
        {
          label: 'score',
          prop: 'score',
        },
        {
          label: 'likes',
          prop: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'likes',
        },
      ],
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu'
      }, {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu'
      }, {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu'
      }],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu'
      }, {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu'
      }, {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        children: [{
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu'
          }, {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu'
      }],
    }
  }
  
}
