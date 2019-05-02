import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  // headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
 
  crearRequisicion(data){
    return axios.post(CONFIG.API_URL+'requisicion', data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateRequisicion(data){
    return axios.post(CONFIG.API_URL+'requisicion/update', data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaRequisicion(data){
    return axios.get(CONFIG.API_URL+'busqueda/requisicion/'+data.strRequis_NO+'/'+data.desde+'/'+data.hasta+'/'+data.strDesc_Header)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRequisicionByCod(code){
    return axios.get(CONFIG.API_URL+'requisicionByCod/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getUpdateRequisicionStatus(code){
    return axios.get(CONFIG.API_URL+'requisicionUpdate/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getrequisiciondetalle(code){
    return axios.get(CONFIG.API_URL+'requisiciondetallev2/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarRequisicion(data){
    return axios.post(CONFIG.API_URL+'requisicion/aprobar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  rechasarRequisicion(data){
    return axios.post(CONFIG.API_URL+'requisicion/rechasar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRequiDetallById(code){
    return axios.get(CONFIG.API_URL+'requisiciondetalle/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getAllRequisicion(){
    return axios.get(CONFIG.API_URL+'requisicion')
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  eliminarRequisicion(data){
    debugger;
    return axios.post(CONFIG.API_URL+'requisicion/eliminar',data)
    .then(response => {
      return response.data
    })
  }

}