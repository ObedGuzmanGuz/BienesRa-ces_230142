import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });



  const { email, nombre, token } = datos;

  // enviar el email
  await transport.sendMail({
    from: "Bienesraices.com",
    to: email,
    subject: "Confirma tu cuenta en bienes raices",
    text: "Confrima tu cuenta en BienesRaices.com",
    html: `<div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    
    

    
    <h1 style="font-size: 24px; font-weight: bold; color: black; text-align: center; margin-bottom: 20px;">Hola ${nombre}, ¡Bienvenid@ a Bienes Raíces!</h1>

    
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
      Es un placer darte la bienvenida a nuestra plataforma, diseñada especialmente para facilitar 
      la gestión y promoción de propiedades inmobiliarias de manera eficiente y profesional. 
      Aquí encontrarás herramientas intuitivas que te permitirán administrar información, explorar 
      oportunidades y conectarte con el mercado de bienes raíces de forma dinámica y segura.
    </p>
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
      Nuestro compromiso es ofrecerte una experiencia confiable y optimizada para que puedas centrarte 
      en lo más importante: alcanzar tus objetivos y brindar un excelente servicio a tus clientes. 
      Estamos aquí para apoyarte en cada paso del camino, con recursos y soporte que te ayudarán 
      a aprovechar al máximo todas las funcionalidades de nuestra aplicación.
    </p>

    <div style="text-align: center; margin-bottom: 20px;">
      <img 
        src="https://i.ibb.co/V2pDTbC/Bienes-Raices-AWOS.jpg" 
        alt="Bienes Raíces Logo" 
        style="width: 300px; height: auto; border-radius: 8px;"
      />
    </div>

   
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/usuario/confirmar/${token}" 
         style="background-color: #10b981; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; box-shadow: 0 3px 8px rgba(16, 185, 129, 0.4);">
        Confirmar Cuenta
      </a>
    </div>

    
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
      Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos. Nuestro equipo estará encantado de asistirte.
    </p>

    <!-- Firma del CEO -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; gap: 15px;">
        <!-- Imagen del CEO -->
        <img 
          src="https://avatars.githubusercontent.com/u/171043964?v=4&size=64" 
          alt="CEO" 
          style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #10b981;"
        />
        <!-- Detalles del CEO -->
        <div style="text-align: left;">
          <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0;">Obed Guzman</h2>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">CEO & Fundador, Bienes Raíces</p>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">Email: <a href="mailto:bienesraices@gmail.com" style="color: #2563eb;">bienesraices@gmail.com</a></p>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">Teléfono: 764-110-2521</p>
        </div>
      </div>

      <!-- Firma del CEO -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img 
          src="https://i.ibb.co/0tnNwyJ/Firma-awos.jpg" 
          alt="Firma del CEO" 
          style="width: 150px; height: auto; margin: auto;"
        />
      </div>
    </div>

    <!-- Redes sociales -->
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://facebook.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="https://twitter.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      <a href="https://instagram.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
    </div>

    <!-- Nota -->
    <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 20px;">
      Si tú no creaste esta cuenta, puedes ignorar este mensaje.
    </p>
  </div>
</div>

                `,
  });
};






const emailChangePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });



  const { email, nombre, token } = datos;

  // enviar el email
  await transport.sendMail({
    from: "Bienesraices.com",
    to: email,
    subject: "Solicitud de actualizacion de contraseña en BienesRaices.com",
    text: "Por favor actualiza tu contraseña para ingresar a la plataforma",
    html: `<div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    
    

    
    <h1 style="font-size: 24px; font-weight: bold; color: black; text-align: center; margin-bottom: 20px;">Hola ${nombre}</h1>

    
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
     Haz reportado el olvido o perdido de tu contraseña para acceder a tu cuenta de Bienes Raices.
    </p>
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
    Por lo que necesitamos  que hagas clikc al siguiente boton 
    </p>

    <div style="text-align: center; margin-bottom: 20px;">
      <img 
        src="https://i.ibb.co/V2pDTbC/Bienes-Raices-AWOS.jpg" 
        alt="Bienes Raíces Logo" 
        style="width: 300px; height: auto; border-radius: 8px;"
      />
    </div>

   
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/usuario/passwordRecovery/${token}" 
         style="background-color: #10b981; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; box-shadow: 0 3px 8px rgba(16, 185, 129, 0.4);">
        Restablecer contraseña
      </a>
    </div>

    
    <p style="font-size: 16px; color: black; text-align: justify; margin-bottom: 16px;">
      Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos. Nuestro equipo estará encantado de asistirte.
    </p>

    <!-- Firma del CEO -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; gap: 15px;">
        <!-- Imagen del CEO -->
        <img 
          src="https://avatars.githubusercontent.com/u/171043964?v=4&size=64" 
          alt="CEO" 
          style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #10b981;"
        />
        <!-- Detalles del CEO -->
        <div style="text-align: left;">
          <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0;">Obed Guzman</h2>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">CEO & Fundador, Bienes Raíces</p>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">Email: <a href="mailto:bienesraices@gmail.com" style="color: #2563eb;">bienesraices@gmail.com</a></p>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">Teléfono: 764-110-2521</p>
        </div>
      </div>

      <!-- Firma del CEO -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img 
          src="https://i.ibb.co/0tnNwyJ/Firma-awos.jpg" 
          alt="Firma del CEO" 
          style="width: 150px; height: auto; margin: auto;"
        />
      </div>
    </div>

    <!-- Redes sociales -->
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://facebook.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="https://twitter.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      <a href="https://instagram.com" target="_blank" style="margin: 0 10px;">
        <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
    </div>

    <!-- Nota -->
    <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 20px;">
      Si tú no creaste esta cuenta, puedes ignorar este mensaje.
    </p>
  </div>
</div>

                `,
  });
};



























export { emailRegistro,emailChangePassword };
