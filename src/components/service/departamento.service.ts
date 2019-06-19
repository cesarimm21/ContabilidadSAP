import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllDepartamento(){ 
    return axios.get(CONFIG.API_URL+'departamento')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllDepartamentoByPais(cod){ 
    return axios.get(CONFIG.API_URL+'pais/departamento/'+cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneDepartamento(code){
    return axios.get(CONFIG.API_URL+'departamento/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  searchDepartamento(data){
    return axios.post(CONFIG.API_URL+'departamento/search',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateDepartamento(data){
    return axios.post(CONFIG.API_URL+'departamento',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateDepartamento(data){
    return axios.post(CONFIG.API_URL+'departamento/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarDepartamento(data){
    return axios.post(CONFIG.API_URL+'departamento/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  