import Swal from "sweetalert2";
import TwitterIcon from "../assets/svg/twitter.svg";
import FacebookIcon from "../assets/svg/facebook.svg";
import WhatsappIcon from "../assets/svg/whatsapp.svg";
import TelegramIcon from "../assets/svg/telegram.svg";

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

  shareLink(profileUsername) {
    const usernameURL = "https://profile.stdicompany.com/" + profileUsername;
    Swal.fire({
      title: "Share Link",
      text: "Click in the icon",
      html:
        '<a target="_blank" class="mr-2" href="https://api.whatsapp.com/send/?phone&text=' +
        usernameURL +
        '&app_absent=0" data-action="share/whatsapp/share"><img width="50" height="50" src=' +
        WhatsappIcon +
        " /></a> " +
        '<a target="_blank" class="mr-2" href="https://www.facebook.com/sharer.php?u=' +
        usernameURL +
        '"><img width="50" height="50" src=' +
        FacebookIcon +
        " /></a> " + 
        '<a target="_blank" class="mr-2" href="https://twitter.com/intent/tweet?url=' +
        usernameURL +
        '"><img width="50" height="50" src=' +
        TwitterIcon +
        " /></a> " + 
        '<a target="_blank" href="https://telegram.me/share/url?url=' +
        usernameURL +
        '"><img width="50" height="50" src=' +
        TelegramIcon +
        " /></a> ",
      // icon: "info",
      confirmButtonText: "Close",
    });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     history.push("/login");
    //   } else {
    //     history.push("/login");
    //   }
    // });
  },

  
};

export default helpers;
