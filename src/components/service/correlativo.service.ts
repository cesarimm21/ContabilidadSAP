import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetCorrelativoId(id){  
    return axios.get(CONFIG.API_URL+'correlativoID/'+id)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetCorrelativoAll(){  
    return axios.get(CONFIG.API_URL+'correlativo')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCorrelativo(data){  
    return axios.post(CONFIG.API_URL+'correlativo',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCorrelativo(data){  
    return axios.post(CONFIG.API_URL+'correlativo/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarCorrelativo(data){  
    return axios.post(CONFIG.API_URL+'correlativo/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  