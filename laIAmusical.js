function registrarUsuario(email, password) {
  // Obtiene la instancia de Auth
  const auth = firebase.auth(); 

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // El usuario se registró con éxito y está logueado
      const user = userCredential.user;
      console.log("¡Registro exitoso!", user.email);
      alert("¡Registro exitoso!");
      // Aquí puedes redirigir al usuario a la página de bienvenida
    })
    .catch((error) => {
      // Si hay un error (ej: contraseña débil o email ya usado)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error de registro:", errorMessage);
      alert("Error: " + errorMessage);
    });
}

// Ejemplo: Llama a esta función cuando se envíe el formulario de registro
// (Necesitas obtener email y password de los campos del formulario antes de llamar a esta función)

function iniciarSesion(email, password) {
  const auth = firebase.auth();

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // El usuario ha iniciado sesión con éxito
      const user = userCredential.user;
      console.log("¡Inicio de sesión exitoso!", user.email);
      alert("¡Bienvenido!");
      // Aquí puedes redirigir al usuario a la página privada
    })
    .catch((error) => {
      // Si las credenciales son incorrectas
      const errorMessage = error.message;
      console.error("Error de login:", errorMessage);
      alert("Error: Credenciales incorrectas.");
    });
}

// Este código se ejecuta cada vez que el estado de autenticación cambia (login, logout, recarga)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // El usuario está logueado. 
    console.log("Usuario actual:", user.email, user.uid);
    // Oculta el formulario de login y muestra el contenido privado.
  } else {
    // El usuario ha cerrado sesión o no está logueado.
    console.log("No hay usuario logueado.");
    // Muestra el formulario de login y oculta el contenido privado.
  }
});

function cerrarSesion() {
   firebase.auth().signOut();
}
