import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Log from '@components/log/log.vue';
import '../../assets/css/log.scss';
import axios from 'axios'
import { Notification } from 'element-ui';
import msmsendService from '@/components/service/msnSend.service';
import versionesService from '@/components/service/versiones.service';
import VueChart from 'vue-chart-js';

@Component({
    name:'statistics',
    components:{VueChart}
})
export default class StatisticsComponent extends Vue{
  gridDataGraphic:any=[];
  chartData:any;
  datacollection:any;
  dataGrafic:any;
  gridDataGraphicCounts:any=[];
  FormImput:any;
  FormSearchUsu:any;
  butondisable:any;
  FormSearch:any;
  FormImputDATES:any;
  options = {year: 'numeric' };
  options1 = {day: '2-digit',month: '2-digit', year: 'numeric' };
  ViewStadistic:any=false;
  ViewStadisticGrafic:any=false;
  dataUsuarioPagina:any;
  modalVisualizar:any;
  pagina:number=1;
  rowSelectedEdit:any;
  RegistersForPage2:number=5;
  totalRegistros1:number=(this.RegistersForPage2);
  DataUsuario:any;
    constructor(){
        super();
        this.ChechAccess();
        this.statisticsGraphic();
        this.loadingData();
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
            if(listaAccesos[i].strNombre === 'Estadisticas'){
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
      loadingData(){
        versionesService.loadingData()
        .then(response => {
          this.dataUsuarioPagina = response;
          this.totalRegistros1=this.dataUsuarioPagina.Count;
          var data=this.dataUsuarioPagina.Data;      
          this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
          
        })
        .catch(e =>{
          this.openMessageError('Error al cargar Usuarios');
          console.log(e);
        })
      }
      getDateString(fecha:string){
        var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
        return dateString;
    }
    cambioPaginaUsuario(){
      var data2=this.dataUsuarioPagina.Data;
        this.DataUsuario = data2.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      }
      statisticsGraphic(){
        debugger;
        msmsendService.statisticsGraphic()
        .then(response=>{
          this.gridDataGraphic[1]=response.Data["0"].NUEVOS;
          this.gridDataGraphic[2]=response.Data["0"].APROBADOS;
          this.gridDataGraphic[3]=response.Data["0"].ELIMINADOS;
         
          // for(let j=1;j<this.gridDataGraphic.length;j++){
            this.chartData.datasets.push(
              {
                label:'Cantidad de Documentos',
                backgroundColor: '#f87979',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',                
                data:[this.gridDataGraphic[1],this.gridDataGraphic[2],this.gridDataGraphic[3]]          
            })
          // }
        })
      }
      color(j){
        if(j==1){
          this.chartData.labels[j-1]='Doc. Nuevos';
          return '#249EBF';
        }
        if(j==2){
          this.chartData.labels[j-1]='Doc. Aprobados';
          return '#35ae5b';
        }
        if(j==3){
          this.chartData.labels[j-1]='Doc. Eliminados';
          return '#f87979';
        }
      }
      documentsCountsGraphic(FormImput){
        if(this.FormImput.YEAR==""){
          this.openMessageInfor('Es necesario que seleccione año');
        }
        else{
          this.FormImput.YEAR=this.FormImput.YEAR.toLocaleDateString('es-PE', this.options)

          msmsendService.documentsCountsGraphic(this.FormImput)
          .then(response=>{
          this.ViewStadistic=true;
          this.datacollection.datasets.push({
            label: 'Cantidad de Movimiento de documentos '+ 'año:'+this.FormImput.YEAR +' Total:'+response.Data["0"].ALLDATE,
                    backgroundColor: '#f87979',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: [response.Data["0"].ENERO,response.Data["0"].FEBRERO,
                           response.Data["0"].MARZO,response.Data["0"].ABRIL,
                           response.Data["0"].MAYO,response.Data["0"].JUNIO,
                           response.Data["0"].JULIO,response.Data["0"].AGOSTO,
                           response.Data["0"].SETIEMBRE,response.Data["0"].OCTUBRE,
                           response.Data["0"].NOVIEMBRE,response.Data["0"].DICIEMBRE]
          })
        })
        }
        
      }
      clearData(){
        this.ViewStadistic=false;
        this.datacollection.datasets=[];
        this.FormImput.YEAR='';
      }      
      buttonChange(){
        return this.butondisable=false;
      }
      SearchUsuarios(FormSearchUsu){
        versionesService.SearchUsuarios(FormSearchUsu)
        .then(response=>{
          this.dataUsuarioPagina = response;
          this.totalRegistros1=this.dataUsuarioPagina.Count;
          var data=this.dataUsuarioPagina.Data;      
          this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));

        })
      }
      GetRowData(index,row,FormSearch){
        this.rowSelectedEdit = row;
        this.FormSearch=row;
        this.FormSearch.intCodUsuario=row.intCodUsuario;
        this.FormSearch.strUsuario=row.strUsuario;
        this.FormSearch.strNombres=row.Nombres;
        // this.FormSearch.dtmYear='';
        // this.FormSearch.dtmInic='';
        // this.FormSearch.dtmFin='';
        this.modalVisualizar=false;
      }
      DocumentsByUser(FormSearch){
        debugger;
        if(this.FormSearch.intCodUsuario==''||this.FormSearch.strUsuario==''||this.FormSearch.strNombres==''||this.FormSearch.dtmInic==''||this.FormSearch.dtmFin==''){
          this.openMessageInfor('Debe llenar todo los campos del formulario');
        }
        else{
          var datetemp=this.FormImputDATES.dtmFin;
          this.FormImputDATES.dtmInic=this.FormImputDATES.dtmInic.toLocaleDateString('es-PE', this.options1)
          this.FormImputDATES.dtmFin=this.FormImputDATES.dtmFin.toLocaleDateString('es-PE', this.options1)
          this.FormSearch.dtmYear=datetemp.toLocaleDateString('es-PE', this.options)
          this.FormSearch.dtmInic=this.FormImputDATES.dtmInic;
          this.FormSearch.dtmFin=this.FormImputDATES.dtmFin;

          msmsendService.DocumentsByUser(this.FormSearch)
          .then(response=>{
            this.ViewStadisticGrafic=true;
            this.dataGrafic.datasets.push({
              label: 'Documentos creados por '+this.FormSearch.strUsuario+ '  año: '+this.FormSearch.dtmYear +' Total: ',
                      
                      backgroundColor: '',
                      pointBackgroundColor: 'white',
                      borderWidth: 1,
                      pointBorderColor: '#249EBF',
                      //Data to be represented on y-axis
                      data: [response.Data["0"].ENERO,response.Data["0"].FEBRERO,
                             response.Data["0"].MARZO,response.Data["0"].ABRIL,
                             response.Data["0"].MAYO,response.Data["0"].JUNIO,
                             response.Data["0"].JULIO,response.Data["0"].AGOSTO,
                             response.Data["0"].SETEIMBRE,response.Data["0"].OCTUBRE,
                             response.Data["0"].NOVIEMBRE,response.Data["0"].DICIEMBRE]
            })
          })
        }        
      }
    
      clearDataUsuario(){
        this.FormSearchUsu.strDominio='';
        this.FormSearchUsu.strUsuario='';
        this.FormSearchUsu.Nombres='';
        this.FormSearchUsu.ApellidoPaterno='';
        this.FormSearchUsu.ApellidoMaterno='';
        this.FormSearchUsu.strTitle='';
        this.FormSearchUsu.Codigo='';
        this.loadingData();
      }
      clearDataUser(){
        this.ViewStadisticGrafic=false;
        this.dataGrafic.datasets=[];
        this.FormSearch.intCodUsuario='';
        this.FormSearch.strNombres='';
        this.FormSearch.strUsuario=''; 
        this.FormSearch.dtmYear='';
        this.FormSearch.dtmInic='';
        this.FormSearch.dtmFin='';
        this.FormImputDATES.dtmYear='';
        this.FormImputDATES.dtmInic='';
        this.FormImputDATES.dtmFin='';
        this.loadingData();
      }      
      openMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'success'
        });
      }
      openMessageInfor(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'info'
        });
      }
    
      openMessageError(strMessage:string){
        this.$message({
          showClose: true,
          type: 'error',
          message: strMessage
        });
      }
      data(){
          return{
              gridData:[], 
              gridDataGraphic:[],
              gridDataGraphicCounts:[],   
              butondisable:true, 
              modalVisualizar:false,
              rowSelectedEdit:[],  
              chartData:{
                labels: ['Doc. Nuevos','Doc. Aprobados','Doc. Eliminados'],
                datasets:[]
              },
              FormImput:{
                YEAR:''
              },  
              formLabelWidth:"120px",
              value5:'',
              ViewStadistic:false,
              ViewStadisticGrafic:false,
              datacollection: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [ ]
              } ,
              FormSearchUsu:{
                intCodUsuario:'',
                strDominio : '',
                strUsuario: '',
                Nombres:'',
                ApellidoPaterno:'',
                ApellidoMaterno:'',
                strTitle:'',
                Codigo:''
              } ,
              DataUsuario:[],
              FormSearch:{
                intCodUsuario:'',
                strNombres:'',
                strUsuario: '',
                dtmYear:'',
                dtmInic:'',
                dtmFin:''       
              },
              FormImputDATES:{
                dtmInic:'',
                dtmFin:''
              },
              dataGrafic: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [ ]
              }   
          }
      }
}
