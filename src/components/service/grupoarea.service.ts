import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoArea(){  
    return axios.get(CONFIG.API_URL+'grupoarea')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllGrupoArea2(){  
    return axios.get(CONFIG.API_URL+'grupoarea2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  