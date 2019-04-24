import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoCuentaContable(){  
    return axios.get(CONFIG.API_URL+'grupocuentacontable')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  