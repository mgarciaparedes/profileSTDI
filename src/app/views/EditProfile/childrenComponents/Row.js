import React from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import YoutubeIcon from "../../../../assets/svg/youtube.svg";
import InstagramIcon from "../../../../assets/svg/instagram.svg";
import TwitterIcon from "../../../../assets/svg/twitter.svg";
import FacebookIcon from "../../../../assets/svg/facebook.svg";
import LinkedinIcon from "../../../../assets/svg/linkedin.svg";
import SnapchatIcon from "../../../../assets/svg/snapchat.svg";
import AppleMusicIcon from "../../../../assets/svg/apple-music.svg";
import CashappIcon from "../../../../assets/svg/cashapp.svg";
import SoundcloudIcon from "../../../../assets/svg/soundcloud.svg";
import SpotifyIcon from "../../../../assets/svg/spotify.svg";
import TiktokIcon from "../../../../assets/svg/tiktok.svg";
import VenmoIcon from "../../../../assets/svg/venmo.svg";
import PaypalIcon from "../../../../assets/svg/paypal.svg";
import MapPinIcon from "../../../../assets/svg/locationmap.svg";
import EmailIcon from "../../../../assets/svg/mail.svg";
import PhoneIcon from "../../../../assets/svg/phone.svg";
import WhatsappIcon from "../../../../assets/svg/whatsapp.svg";
import TelegramIcon from "../../../../assets/svg/telegram.svg";
import GoFundMeIcon from "../../../../assets/svg/gofundme.svg";
import TwitchIcon from "../../../../assets/svg/twitch.svg";
import OnlyFansIcon from "../../../../assets/svg/onlyfans.svg";
import DiscordIcon from "../../../../assets/svg/discord.svg";
import HousePartyIcon from "../../../../assets/svg/houseparty.svg";
import SmsIcon from "../../../../assets/svg/sms.svg";
import WebsiteIcon from "../../../../assets/svg/website.svg";

//Está función está fuera del render porque si la dejo dentro de la func principal
//se vuelve a renderizar y no funciona.
//Es la función que me devuelve el html de las redes sociales => RRSS
//seleccionadas. Si te fijas yo decido como se está viendo con el valor de view,
//si view===1 me devuelve la vista de los campos que puedo editar
//si view===2 me devuelve la vista de las redes sociales en columna derecha
function Row({
  onChange,
  onRemove,
  view,
  profile,
  socialNetwork,
  linkName,
  convertStringWithPlus,
  //socialNetworkIcon,
  //socialNetworkURL,
}) {
  return (
    <>
      {view === 1 ? (
        <div className="row mb-2">
          <div className="col-12 col-sm-12">
            <label className="text-white">{socialNetwork}</label>
            {socialNetwork !== "CustomURL" && socialNetwork !== "CustomText" ? (
              <InputGroup>
                <Form.Control
                  name="profile"
                  value={profile}
                  onChange={(e) => onChange("profile", e.target.value)}
                  placeholder={
                    socialNetwork === "Instagram"
                      ? "Instagram username"
                      : socialNetwork === "Snapchat"
                      ? "Snapchat username"
                      : socialNetwork === "Whatsapp"
                      ? "Country code and phone number"
                      : socialNetwork === "Youtube"
                      ? "Type the full link"
                      : socialNetwork === "Facebook"
                      ? "Type the full link"
                      : socialNetwork === "Soundcloud"
                      ? "Souncloud username"
                      : socialNetwork === "Linkedin"
                      ? "Type the full link"
                      : socialNetwork === "TikTok"
                      ? "Type the full link"
                      : socialNetwork === "Twitter"
                      ? "Twitter username"
                      : socialNetwork === "Spotify"
                      ? "Spotify username"
                      : socialNetwork === "Apple Music"
                      ? "Apple Music username"
                      : socialNetwork === "Venmo"
                      ? "Venmo username"
                      : socialNetwork === "CashApp"
                      ? "Cashapp username"
                      : socialNetwork === "Address"
                      ? "Type the full address"
                      : socialNetwork === "Phone Number"
                      ? "Country code and phone number"
                      : socialNetwork === "Email"
                      ? "Type the email address"
                      : socialNetwork === "SMS"
                      ? "Country code and phone number"
                      : socialNetwork === "Paypal"
                      ? "Paypal username"
                      : socialNetwork === "OnlyFans"
                      ? "OnlyFans username"
                      : socialNetwork === "GoFundMe"
                      ? "Type the full link"
                      : socialNetwork === "Telegram"
                      ? "Telegram username"
                      : socialNetwork === "Twitch"
                      ? "Twitch username"
                      : socialNetwork === "Discord"
                      ? "Type the full link"
                      : socialNetwork === "HouseParty"
                      ? "HouseParty username"
                      : socialNetwork === "Embed Youtube Video"
                      ? "Type Embed Youtube ID"
                      : "Type the full link"
                  }
                />
                <InputGroup.Append>
                  <Button variant="danger" onClick={onRemove}>
                    <Icon.XCircleFill />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            ) : socialNetwork === "CustomURL" ? (
              <>
                <InputGroup>
                  <FormControl
                    placeholder="Description"
                    name="linkName"
                    value={linkName}
                    onChange={(e) => onChange("linkName", e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <FormControl
                    placeholder="Type the full link"
                    name="profile"
                    value={profile}
                    onChange={(e) => onChange("profile", e.target.value)}
                  />
                  <InputGroup.Append>
                    <Button variant="danger" onClick={onRemove}>
                      <Icon.XCircleFill />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </>
            ) : (
              <>
                <InputGroup>
                  <FormControl
                    placeholder="Description"
                    name="linkName"
                    value={linkName}
                    onChange={(e) => onChange("linkName", e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <FormControl
                    as="textarea"
                    placeholder="Type your text"
                    name="profile"
                    value={profile}
                    onChange={(e) => onChange("profile", e.target.value)}
                  />
                  <InputGroup.Append>
                    <Button variant="danger" onClick={onRemove}>
                      <Icon.XCircleFill />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </>
            )}
          </div>
        </div>
      ) : view === 2 &&
        socialNetwork !== "CustomURL" &&
        socialNetwork !== "Embed Youtube Video"  && 
        socialNetwork !== "CustomText"
        ? (
        <>
          <div className="border border-link m-2 col-3">
            <a
              className="btn-no-style"
              target="_blank"
              href={
                socialNetwork === "Instagram"
                  ? "https://www.instagram.com/" + profile
                  : socialNetwork === "Snapchat"
                  ? "https://www.snapchat.com/add/" + profile
                  : socialNetwork === "Whatsapp"
                  ? "https://wa.me/" + profile
                  : socialNetwork === "Youtube"
                  ? profile
                  : socialNetwork === "Facebook"
                  ? profile
                  : socialNetwork === "Soundcloud"
                  ? "https://www.soundcloud.com/add/" + profile
                  : socialNetwork === "Linkedin"
                  ? profile
                  : socialNetwork === "TikTok"
                  ? profile
                  : socialNetwork === "Twitter"
                  ? "https://www.twitter.com/" + profile
                  : socialNetwork === "Spotify"
                  ? "https://www.spotify.com/" + profile
                  : socialNetwork === "Apple Music"
                  ? "https://music.apple.com/" + profile
                  : socialNetwork === "Venmo"
                  ? "https://www.venmo.com/" + profile
                  : socialNetwork === "CashApp"
                  ? "https://cash.app/$" + profile
                  : socialNetwork === "Address"
                  ? "https://www.google.com/maps/search/" +
                    convertStringWithPlus(profile)
                  : socialNetwork === "Phone Number"
                  ? "tel:" + profile
                  : socialNetwork === "Email"
                  ? "mailto:" + profile
                  : socialNetwork === "SMS"
                  ? "sms:" + profile
                  : socialNetwork === "Paypal"
                  ? "https://paypal.com/" + profile
                  : socialNetwork === "Telegram"
                  ? "https://t.me/" + profile
                  : socialNetwork === "OnlyFans"
                  ? "https://onlyfans.com/" + profile
                  : socialNetwork === "GoFundMe"
                  ? profile
                  : socialNetwork === "Twitch"
                  ? "https://twitch.tv/" + profile
                  : socialNetwork === "Discord"
                  ? profile
                  : socialNetwork === "HouseParty"
                  ? "https://houseparty.com/add/" + profile
                  : profile
              }
            >
              <div className="pt-3 pb-3">
                <div className="d-flex justify-content-center">
                  {socialNetwork === "Instagram" ? (
                    <img
                      width="50"
                      height="50"
                      src={InstagramIcon}
                      alt="Instagram"
                    />
                  ) : socialNetwork === "Whatsapp" ? (
                    <img
                      width="50"
                      height="50"
                      src={WhatsappIcon}
                      alt="Whatsapp"
                    />
                  ) : socialNetwork === "Snapchat" ? (
                    <img
                      width="50"
                      height="50"
                      src={SnapchatIcon}
                      alt="Snapchat"
                    />
                  ) : socialNetwork === "Youtube" ? (
                    <img
                      width="50"
                      height="50"
                      src={YoutubeIcon}
                      alt="Youtube"
                    />
                  ) : socialNetwork === "Facebook" ? (
                    <img
                      width="50"
                      height="50"
                      src={FacebookIcon}
                      alt="Facebook"
                    />
                  ) : socialNetwork === "Soundcloud" ? (
                    <img
                      width="50"
                      height="50"
                      src={SoundcloudIcon}
                      alt="Soundcloud"
                    />
                  ) : socialNetwork === "Linkedin" ? (
                    <img
                      width="50"
                      height="50"
                      src={LinkedinIcon}
                      alt="Linkedin"
                    />
                  ) : socialNetwork === "TikTok" ? (
                    <img width="50" height="50" src={TiktokIcon} alt="TikTok" />
                  ) : socialNetwork === "Twitter" ? (
                    <img
                      width="50"
                      height="50"
                      src={TwitterIcon}
                      alt="Twitter"
                    />
                  ) : socialNetwork === "Spotify" ? (
                    <img
                      width="50"
                      height="50"
                      src={SpotifyIcon}
                      alt="Spotify"
                    />
                  ) : socialNetwork === "Apple Music" ? (
                    <img
                      width="50"
                      height="50"
                      src={AppleMusicIcon}
                      alt="Apple Music"
                    />
                  ) : socialNetwork === "Venmo" ? (
                    <img width="50" height="50" src={VenmoIcon} alt="Venmo" />
                  ) : socialNetwork === "CashApp" ? (
                    <img
                      width="50"
                      height="50"
                      src={CashappIcon}
                      alt="CashApp"
                    />
                  ) : socialNetwork === "Phone Number" ? (
                    <img width="50" height="50" src={PhoneIcon} alt="Phone" />
                  ) : socialNetwork === "Email" ? (
                    <img width="50" height="50" src={EmailIcon} alt="Email" />
                  ) : socialNetwork === "Website" ? (
                    <img
                      width="50"
                      height="50"
                      src={WebsiteIcon}
                      alt="Website"
                    />
                  ) : socialNetwork === "Address" ? (
                    <img
                      width="50"
                      height="50"
                      src={MapPinIcon}
                      alt="Google Maps"
                    />
                  ) : socialNetwork === "SMS" ? (
                    <img width="50" height="50" src={SmsIcon} alt="SMS" />
                  ) : socialNetwork === "Paypal" ? (
                    <img width="50" height="50" src={PaypalIcon} alt="Paypal" />
                  ) : socialNetwork === "Telegram" ? (
                    <img
                      width="50"
                      height="50"
                      src={TelegramIcon}
                      alt="Telegram"
                    />
                  ) : socialNetwork === "OnlyFans" ? (
                    <img
                      width="50"
                      height="50"
                      src={OnlyFansIcon}
                      alt="OnlyFans"
                    />
                  ) : socialNetwork === "GoFundMe" ? (
                    <img
                      width="50"
                      height="50"
                      src={GoFundMeIcon}
                      alt="GoFundMe"
                    />
                  ) : socialNetwork === "Twitch" ? (
                    <img width="50" height="50" src={TwitchIcon} alt="Twitch" />
                  ) : socialNetwork === "Discord" ? (
                    <img
                      width="50"
                      height="50"
                      src={DiscordIcon}
                      alt="Discord"
                    />
                  ) : socialNetwork === "HouseParty" ? (
                    <img
                      width="50"
                      height="50"
                      src={HousePartyIcon}
                      alt="HouseParty"
                    />
                  ) : null}
                </div>
                <div className="d-flex justify-content-center">
                  <div className="d-none d-sm-block">{socialNetwork}</div>
                </div>
              </div>
            </a>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Row;
