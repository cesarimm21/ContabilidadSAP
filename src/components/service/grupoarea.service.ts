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
  CreateGrupoArea(documento){
    return axios.post(CONFIG.API_URL+'grupoarea/create', documento)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateGrupoArea(documento){
    return axios.post(CONFIG.API_URL+'grupoarea/update', documento)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  inactivarGrupoArea(documento){
    return axios.post(CONFIG.API_URL+'grupoarea/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarGrupoArea(documento){
    return axios.post(CONFIG.API_URL+'grupoarea/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  