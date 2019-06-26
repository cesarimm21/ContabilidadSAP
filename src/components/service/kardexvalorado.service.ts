import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
    
  headers : {'Access-Control-Allow-Origin':'*'},
  GetKardexValorado(cod_company,anio,mes){
    return axios.get(CONFIG.API_URL+'kardexvalorizado/'+cod_company+'/'+anio+'/'+mes)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetKardexUnidadFisica(cod_company,anio,mes,mesf){
    return axios.get(CONFIG.API_URL+'kardexunidadfisica/'+cod_company+'/'+anio+'/'+mes+'/'+mesf)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  