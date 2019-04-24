import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  createDiarioGeneral(data){   
    return axios.post(CONFIG.API_URL+'diariogeneral',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetLastCodCorrelativo(){
    return axios.get(CONFIG.API_URL+'correlativo')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  