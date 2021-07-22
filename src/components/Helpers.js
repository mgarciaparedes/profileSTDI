import Swal from "sweetalert2";

const helpers = {
  /*Con esta propiedad retornamos un swalfire cuando se ca */
  swalOffBackend() {
    Swal.fire({
      title: "Error",
      text: "It's not possible to do this at this time!",
      icon: "error",
      confirmButtonText: "Try again",
    });
  },

  //Convertir espacios en signos de plus
  convertStringWithPlus(value) {
    const newString = value.replace(" ", "+");
    return newString;
  },

  //Función para copiar la url
  copyToClipboard(username) {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = "https://profile.stdicompany.com/"+username;
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
  },

  
};

export default helpers;
