import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCategoria(){ 
    return axios.get(CONFIG.API_URL+'categoriacentrocosto')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCategoria2(company_cod){ 
    return axios.get(CONFIG.API_URL+'categoriacentrocosto/compania/'+company_cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCategoriaCentroCosto(code){
    return axios.get(CONFIG.API_URL+'categoriacentrocosto/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCategoriaCentroCosto(data){  
    return axios.post(CONFIG.API_URL+'categoriacentrocosto',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ModificarCategoriaCentroCosto(data){  
    return axios.post(CONFIG.API_URL+'categoriacentrocosto/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  EliminarCategoriaCentroCosto(data){  
    return axios.post(CONFIG.API_URL+'categoriacentrocosto/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ActivarCategoriaCentroCosto(data){  
    return axios.post(CONFIG.API_URL+'categoriacentrocosto/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  