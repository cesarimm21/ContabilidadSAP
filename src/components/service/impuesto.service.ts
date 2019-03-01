import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllImpuesto(){    
    return axios.get(CONFIG.API_URL+'impuesto')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneImpuesto(code){
    return axios.get(CONFIG.API_URL+'impuesto/'+code)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  