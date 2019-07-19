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
  GetCorrelativoAll(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'correlativo/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCorrelativo(data){  
    return axios.post(CONFIG.API_URL+'correlativo/create',data)
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
  inactivarCorrelativo(documento){
    return axios.post(CONFIG.API_URL+'correlativo/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarCorrelativo(documento){
    return axios.post(CONFIG.API_URL+'correlativo/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  