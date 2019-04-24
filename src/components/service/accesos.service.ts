import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllAccesos(){  
    return axios.get(CONFIG.API_URL+'accesos')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRoute(strAcceso_Cod){
    return axios.get(CONFIG.API_URL+'accesos/'+strAcceso_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  