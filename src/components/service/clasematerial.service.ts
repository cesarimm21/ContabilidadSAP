import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllClaseMaterial(){  
    return axios.get(CONFIG.API_URL+'clasematerial')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllClaseMaterial2(company_cod){  
    return axios.get(CONFIG.API_URL+'clasematerial2/'+company_cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaProducto(strCodClaseMaterial,desde,hasta){
    return axios.get(CONFIG.API_URL+'busqueda/clasematerial/'+strCodClaseMaterial+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getClassProductoServicio(strCompany_Cod){ 
    return axios.get(CONFIG.API_URL+'cmaterial/servicio/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneClaseMaterial(code){
    return axios.get(CONFIG.API_URL+'clasematerial/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

  GetTypeClaseMaterial(code){
    return axios.get(CONFIG.API_URL+'clasematerial/type/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetClaseMaterialServicio(strCompany_Cod){
    return axios.get(CONFIG.API_URL+'clasematerial/type/service/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteClaseMaterial(data){
    return axios.post(CONFIG.API_URL+'clasematerial/delete',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateClaseMaterial(data){
    return axios.post(CONFIG.API_URL+'clasematerial',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  update(data)
  {
    return axios.post(CONFIG.API_URL+'update/clasematerial',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data)
  {
    return axios.post(CONFIG.API_URL+'clasematerial/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarClaseServicio(documento){
    return axios.post(CONFIG.API_URL+'clasematerial/servicio/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarClaseServicio(documento){
    return axios.post(CONFIG.API_URL+'clasematerial/servicio/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  