import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoComprador(){  
    return axios.get(CONFIG.API_URL+'grupocomprador')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneGrupoComprador(code){
    return axios.get(CONFIG.API_URL+'grupocomprador/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearGrupoComprador(data){
    return axios.post(CONFIG.API_URL+'grupocomprador',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  UpdateGrupoComprador(data){
    return axios.post(CONFIG.API_URL+'grupocomprador/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  EliminarGrupoComprador(data){
    return axios.get(CONFIG.API_URL+'grupocomprador/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  