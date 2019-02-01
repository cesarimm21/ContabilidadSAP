//var intCodUsuario;
export default {
    token:'',
    isActive:false,
    isCollapse:false,

    limpiarDatosSession(){
      this.token='';
    },
    getActive(){
      return this.isActive;
    },
    setActive(isActive){
      return this.isActive=isActive;
    },
    getCollapse(){
      return this.isCollapse;
    },
    setCollapse(isCollapse){
      this.isCollapse=isCollapse;
    },
    setToken(token){
      debugger;
      this.token=token;
      window.sessionStorage.setItem('usuario_token',token);
    },
    getToken(){
      if(this.token ===''){
        return window.sessionStorage.getItem('usuario_token');
      }
      else{
        return this.token;
      }
    }
}
