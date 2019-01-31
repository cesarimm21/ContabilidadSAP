import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import 'font-awesome/css/font-awesome.css';
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Notification } from 'element-ui';
@Component({
  name: 'permission'
})
export default class Permission extends Vue {
  gridData:any;
  DocumentosData:any;
  FormAgregar : any;
  dataTree:any;  
  RolJerarquiaSelected:any;
  defaultSelectEdit:any = [];
  defaultCheckedKeys:any=[];
  rowSelectedEdit :any;
  dialogEditarVisible:any;
  dialogVisible:boolean = false;
  defaultProps:any;
  constructor(){
    super();
    this.ChechAccess();
    this.GetDocumentos();
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
        if(listaAccesos[i].strNombre === 'Permisos'){
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
  GetDocumentos(){
    axios.get(CONFIG.API_URL+'documentos/get/all')
    .then(response => {
      this.DocumentosData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Documentos');
      console.log(e);
    })
  }
   //#region getJerarquiaData
  getJerarquiaData(codPosition){
    axios.get(CONFIG.API_URL+'jerarquia/get/-')
    .then(response => {
      this.gridData = JSON.parse(JSON.stringify(response.data));    
      for(var i=0 ; i<this.gridData.Data.length ; i++){
        if(i==0){
          this.dataTree.push({
            "id":this.gridData.Data[0].CodPosicion,
            "label":this.gridData.Data[0].Descripcion,
            children:[{
              "id":this.gridData.Data[2].CodPosicion,
              "label":this.gridData.Data[2].Descripcion,
              children:[{
                "id":this.gridData.Data[11].CodPosicion,
                "label":this.gridData.Data[11].Descripcion,
              }]
            }]
          })
        }
        if(i==3){
          this.dataTree.push({
            id:this.gridData.Data[3].CodPosicion,
            label:this.gridData.Data[3].Descripcion,
            children:[
              {
                id:this.gridData.Data[1].CodPosicion,
                label:this.gridData.Data[1].Descripcion
              },{
                id:this.gridData.Data[8].CodPosicion,
                label:this.gridData.Data[8].Descripcion
              },{
              id:this.gridData.Data[12].CodPosicion,
              label:this.gridData.Data[12].Descripcion
            },
            {
            id:this.gridData.Data[13].CodPosicion,
            label:this.gridData.Data[13].Descripcion
            },
            {
            id:this.gridData.Data[14].CodPosicion,
            label:this.gridData.Data[14].Descripcion,
            children:[{
              id:this.gridData.Data[7].CodPosicion,
              label:this.gridData.Data[7].Descripcion
            },{
              id:this.gridData.Data[10].CodPosicion,
              label:this.gridData.Data[10].Descripcion
            }
          ]
            },
            {
            id:this.gridData.Data[15].CodPosicion,
            label:this.gridData.Data[15].Descripcion
            },
            {
            id:this.gridData.Data[16].CodPosicion,
            label:this.gridData.Data[16].Descripcion
            },
            {
            id:this.gridData.Data[17].CodPosicion,
            label:this.gridData.Data[17].Descripcion
            },
            {
            id:this.gridData.Data[18].CodPosicion,
            label:this.gridData.Data[18].Descripcion
            },
            {
            id:this.gridData.Data[19].CodPosicion,
            label:this.gridData.Data[19].Descripcion
            },
            {
            id:this.gridData.Data[20].CodPosicion,
            label:this.gridData.Data[20].Descripcion,
            children:[{
              id:this.gridData.Data[4].CodPosicion,
              label:this.gridData.Data[4].Descripcion
            },{
              id:this.gridData.Data[5].CodPosicion,
              label:this.gridData.Data[5].Descripcion
            },{
              id:this.gridData.Data[6].CodPosicion,
              label:this.gridData.Data[6].Descripcion
            },
            {
              id:this.gridData.Data[9].CodPosicion,
              label:this.gridData.Data[9].Descripcion
            }
            ]
            }]
          })
        }
        // this.dataTree.push({
        //   id:this.gridData.Data[i].CodPosicion,
        //   label:this.gridData.Data[i].Descripcion,
        //   children:[{
        //     id:this.gridData.Data[i+1].CodPosicion,
        //     label:this.gridData.Data[i+1].Descripcion,
        //     children:[{
        //       id:this.gridData.Data[i+2].CodPosicion,
        //       label:this.gridData.Data[i+2].Descripcion,
        //     }]
        //   }]
        // })
      }
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Jerarquias');
      console.log(e);
    })
  }
  //#endregion
  
  getDocJerarquia(intCodDoc){
    axios.get(CONFIG.API_URL+'docjerarquia/get/'+intCodDoc)
    .then(response => {
      this.RolJerarquiaSelected = [];
      this.RolJerarquiaSelected = JSON.parse(JSON.stringify(response.data));
      
      this.defaultSelectEdit = [];
      for (let i = 0; i < this.RolJerarquiaSelected.Count; i++) {
        this.defaultSelectEdit.push(this.RolJerarquiaSelected.Data[i].CodPosicion);
      }

    })
    .catch(e =>{
      this.openMessageError('Error al cargar Rol-Acceso');
      console.log(e);
    })
  }
  UpdateDocJerarquia(intDocJer){
    if(this.rowSelectedEdit.lstAccesos == null){
      this.rowSelectedEdit.lstAccesos = this.RolJerarquiaSelected.Data;
    }
    this.rowSelectedEdit.strUsuarioModif = CONFIG.USUARIO_LOGED;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    axios.post(CONFIG.API_URL+'docjerarquia/update'+intDocJer, this.rowSelectedEdit)
    .then(response =>{
      this.openMessage('Permisos guardado correctamente: '+response.data)
      this.getJerarquiaData('-');
    })
    .catch(e =>{
      this.openMessageError('Error al Actualizar Permisos');
      console.log(e)
    })
    this.dialogVisible = false;
  }
  handleEdit(index,id,row){
    if(id==undefined){
      this.getJerarquiaData('-');
    }
    this.getDocJerarquia(row.intCodDocumento); 
    this.setCheckedKeys();
    this.rowSelectedEdit = [];
    this.rowSelectedEdit = row;
    this.dialogVisible=true
  }
  handleCheckChange(data, checked, indeterminate) {
    this.FormAgregar.lstJerarquia = [];
    for (let i = 0; i < data.length; i++) {
      this.FormAgregar.lstJerarquia.push({
        CodPosicion: data[i].id,
        Descripcion: data[i].label
      });
    }
  }
  setCheckedKeys() {
        // this.$refs.tree.dataTree[{
      
    // }]
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  openMessage(strMessage : string) {
    this.$message({
      showClose: true,
      message: strMessage,
      type: 'success'
    });
  }
  data(){
    return{
      formLabelWidth: '120px',
      defaultCheckedKeys: [14],
      dialogEditarVisible:'',
      gridDataJerar:[],
      rowSelectedEdit:[],
      defaultSelectEdit:[],
      lstJerarquia:[],
      defaultProps: {
        key: 'id',
        children: 'children',
        label: 'label'
      },
      FormAgregar: {
        intCodDocumento:'',
        lstJerarquia:[],
        strUsuarioCrea : CONFIG.USUARIO_LOGED
      },
      dataTree:[],
      DocumentosData:[],
      value3:'',
      value2:'',
      gridData: [],
      dialogVisible: false
    }
  }
}
