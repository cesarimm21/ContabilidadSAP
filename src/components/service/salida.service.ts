import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
 
  CrearSalida(data){
    return axios.post(CONFIG.API_URL+'salida', data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaSalida(data){
    return axios.get(CONFIG.API_URL+'busqueda/salida/'+data.strIssueAjust_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getSalidaId(code){
    return axios.get(CONFIG.API_URL+'salidaId/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getSalidaDetalleId(code){
    return axios.get(CONFIG.API_URL+'salidaDetalleId/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarSalida(data){
    return axios.post(CONFIG.API_URL+'salida/aprobar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  inventarioSalida(data){
    return axios.post(CONFIG.API_URL+'salida/aprobar/inventario',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  rechasarSalida(data){
    return axios.post(CONFIG.API_URL+'salida/rechasar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }
}