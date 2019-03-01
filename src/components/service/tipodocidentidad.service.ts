import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoDocumento(){  
    return axios.get(CONFIG.API_URL+'tipodocidentidad')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  