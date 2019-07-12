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
  deleteAlmacen(intIdWHS_ID){    
    return axios.get(CONFIG.API_URL+'almacen/delete/'+intIdWHS_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DesactivarAlmacen(almacen){
    return axios.post(CONFIG.API_URL+'sucursal/desactivar',almacen)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  