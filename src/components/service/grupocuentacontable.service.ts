import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoCuentaContable(){  
    return axios.get(CONFIG.API_URL+'grupocuentacontable')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearGrupoCuenta(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateGrupoCuenta(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminar(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getBusqueda(strCompany_Cod,strGrpAcctCont_Cod){
    return axios.get(CONFIG.API_URL+'grupocuentacontable/'+strGrpAcctCont_Cod+'/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  