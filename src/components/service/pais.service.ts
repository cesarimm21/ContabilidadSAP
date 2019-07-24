import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPais(){    
    return axios.get(CONFIG.API_URL+'pais')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPais2(){    
    return axios.get(CONFIG.API_URL+'pais2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deletePais(intIdCountry_ID){    
    return axios.get(CONFIG.API_URL+'pais/delete/'+intIdCountry_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnePais(code){
    return axios.get(CONFIG.API_URL+'pais/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  searchPais(data){
    return axios.post(CONFIG.API_URL+'pais/search',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblPais(data){
    return axios.post(CONFIG.API_URL+'pais',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblPais(data){
    return axios.post(CONFIG.API_URL+'pais/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarPais(documento){
    return axios.post(CONFIG.API_URL+'pais/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarPais(documento){
    return axios.post(CONFIG.API_URL+'pais/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
