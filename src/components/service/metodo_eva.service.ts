import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  getMetodoValuacions(){    
    return axios.get(CONFIG.API_URL+'metodovaluacion')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deletetblMetodoValuacion(intIdValMeth_ID){    
    return axios.get(CONFIG.API_URL+'metodovaluacion/delete/'+intIdValMeth_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  eliminarMetoValuacion(data){
    return axios.post(CONFIG.API_URL+'metodovaluacion/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarMetoValuacion(data){
    return axios.post(CONFIG.API_URL+'metodovaluacion/activar',data)
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
  createtblMetodoValuacion(data){
    return axios.post(CONFIG.API_URL+'metodovaluacion',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblMetodoValuacion(data){
    return axios.post(CONFIG.API_URL+'metodovaluacion/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getMetodoValuacionsOne(company,strValMeth_Cod){    
    return axios.get(CONFIG.API_URL+'metodovaluacion/'+company+'/'+strValMeth_Cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
