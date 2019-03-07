import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllHes(){      
    return axios.get(CONFIG.API_URL+'hes')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateHes(hesModel){    
    return axios.post(CONFIG.API_URL+'hes',hesModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}