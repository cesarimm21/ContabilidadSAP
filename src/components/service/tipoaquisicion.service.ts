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
  
}