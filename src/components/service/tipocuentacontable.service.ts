import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoCuentaContable(){    
    return axios.get(CONFIG.API_URL+'tipocuentacontable')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoCuentaContable2(){    
    return axios.get(CONFIG.API_URL+'tipocuentacontable2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
