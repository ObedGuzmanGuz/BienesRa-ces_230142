

const formularioLogin =(request,response) => {
    response.render('auth/login',{

    })
  };


  const formularioRegister =(request,response) => {
    response.render('auth/register',{
      page: "Crear cuenta..."

    })
  };



  const formularioPasswordRecovery =(request,response) => {
    response.render('auth/passwordRecovery',{


    })
  };









  export  {
    formularioLogin, 
    formularioRegister, formularioPasswordRecovery
  }






















