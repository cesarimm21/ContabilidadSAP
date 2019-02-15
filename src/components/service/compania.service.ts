import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCompania(){  
    return axios.get(CONFIG.API_URL+'compania')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  