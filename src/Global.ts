//var intCodUsuario;
export default {
    token:'',
    limpiarDatosSession(){
      this.token='';
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
