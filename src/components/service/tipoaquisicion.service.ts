import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
 
  busquedaTipoAquisicion(){
    return axios.get(CONFIG.API_URL+'tipoadquisicion')
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateTipoAdquisicion(adquisicion){
    return axios.post(CONFIG.API_URL+'tipoadquisicion/create', adquisicion)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateTipoAdquisicion(adquisicion){
    return axios.post(CONFIG.API_URL+'tipoadquisicion/update', adquisicion)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
  
}