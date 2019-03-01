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
  }

}