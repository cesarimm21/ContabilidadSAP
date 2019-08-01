import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoProceso(){  
    return axios.get(CONFIG.API_URL+'grupoproceso')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllGrupoProcesoView(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'grupoproceso/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllGrupoProceso2(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'grupoproceso2/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneGrupoProceso(code){
    return axios.get(CONFIG.API_URL+'grupoproceso/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearGrupoProceso(data){  
    return axios.post(CONFIG.API_URL+'grupoproceso/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ModificarGrupoProceso(data){  
    return axios.post(CONFIG.API_URL+'grupoproceso/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  EliminarGrupoProceso(data){  
    return axios.post(CONFIG.API_URL+'grupoproceso/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ActivarGrupoProceso(data){  
    return axios.post(CONFIG.API_URL+'grupoproceso/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  