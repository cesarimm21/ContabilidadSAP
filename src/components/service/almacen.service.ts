import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllAlmacen(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'almacen/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllAlmacen2(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'almacen2/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAlmacen(code){
    console.log(CONFIG.API_URL+'almacenid/'+code);
    return axios.get(CONFIG.API_URL+'almacenid/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOneAlmacen(code){
    return axios.get(CONFIG.API_URL+'almacenGetId/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getAlmacenCodigo(code){
    return axios.get(CONFIG.API_URL+'almacenCodigo/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  crearAlmacen(data){
    return axios.post(CONFIG.API_URL+'almacen/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateAlmacen(data){
    return axios.post(CONFIG.API_URL+'almacen/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteAlmacen(almacen){    
    return axios.post(CONFIG.API_URL+'almacen/delete',almacen)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DesactivarAlmacen(almacen){
    return axios.post(CONFIG.API_URL+'almacen/activar',almacen)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  