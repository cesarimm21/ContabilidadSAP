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
  getRequiDetallById(cod){
    return axios.get(CONFIG.API_URL+'requisiciondetalle/'+cod)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRequisicionByCod(cod){
    return axios.get(CONFIG.API_URL+'requisicionByCod/'+cod)
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }
}