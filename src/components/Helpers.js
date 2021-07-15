import Swal from "sweetalert2";

const helpers ={

    /*Con esta propiedad retornamos un swalfire cuando se ca */
    swalOffBackend(){
        Swal.fire({
            title: "Error",
            text: "It's not possible to do this at this time!",
            icon: "error",
            confirmButtonText: "Try again",
          });
    },

}

export default helpers;