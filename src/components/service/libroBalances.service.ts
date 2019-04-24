import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
    
  headers : {'Access-Control-Allow-Origin':'*'},
  GetLibroDiario(datar){
    return axios.get(CONFIG.API_URL+'libro/'+datar.cod_company+'/'+datar.feci+'/'+datar.fecf)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  