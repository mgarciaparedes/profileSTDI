import React from 'react'

export const SocialMedia = ({socialMedia,
    YoutubeIcon,
    TwitterIcon,
    WhatsappIcon,
    InstagramIcon,
    FacebookIcon,
    EmailIcon,
    PhoneIcon,
    SnapchatIcon,
    SoundcloudIcon,
    LinkedinIcon,
    TiktokIcon,
    SpotifyIcon,
    AppleMusicIcon,
    VenmoIcon,
    CashappIcon,
    WebsiteIcon,
    PaypalIcon,
    TelegramIcon,
    SmsIcon,
    convertStringWithPlus,
    MapPinIcon}) => {
    return (
        <div className="row d-flex justify-content-center h5">
        {socialMedia.map((elemento,
        index) => (

          elemento.socialNetwork != "CustomURL" ? 
          <div key={index} className="border border-link m-2 col-3">
          {
              /*Según la red que responde el servicio,
              condicionamos que red social mostrar*/
              elemento.socialNetwork === "Youtube" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={YoutubeIcon}
                        alt="Youtube"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Youtube</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Twitter" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.twitter.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={TwitterIcon}
                        alt="Twitter"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Twitter</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Whatsapp" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://wa.me/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={WhatsappIcon}
                        alt="Whatsapp"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Whatsapp</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Instagram" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.instagram.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={InstagramIcon}
                        alt="Instagram"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Instagram</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Facebook" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={FacebookIcon}
                        alt="Facebook"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Facebook</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Email" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"mailto:" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={EmailIcon}
                        alt="Email"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Email</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Phone Number" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"tel:" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={PhoneIcon}
                        alt="Phone"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">
                        Phone Number
                      </div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Snapchat" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={
                    "https://www.snapchat.com/add/" + elemento.profile
                  }
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={SnapchatIcon}
                        alt="Snapchat"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Snapchat</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Soundcloud" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.soundcloud.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={SoundcloudIcon}
                        alt="Soundcloud"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Soundcloud</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Linkedin" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={LinkedinIcon}
                        alt="Linkedin"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Linkedin</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "TikTok" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.tiktok.com/@" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={TiktokIcon}
                        alt="Tiktok"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">TikTok</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Spotify" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.spotify.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={SpotifyIcon}
                        alt="Spotify"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Spotify</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Apple Music" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://music.apple.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={AppleMusicIcon}
                        alt="Apple Music"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Apple Music</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Venmo" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://www.venmo.com/" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={VenmoIcon}
                        alt="Venmo"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Venmo</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "CashApp" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"https://cash.app/$" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={CashappIcon}
                        alt="CashApp"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">CashApp</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Website" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={WebsiteIcon}
                        alt="Website"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Website</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Paypal" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={
                    "https://www.paypal.com/paypalme/" + elemento.profile
                  }
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={PaypalIcon}
                        alt="Paypal"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Paypal</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Telegram" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={
                    "https://t.me/" + elemento.profile
                  }
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={TelegramIcon}
                        alt="Telegram"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Telegram</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "SMS" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={"sms:" + elemento.profile}
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={SmsIcon}
                        alt="Sms"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">SMS</div>
                    </div>
                  </div>
                </a>
              ) : elemento.socialNetwork === "Address" ? (
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={
                    "https://google.com/maps/search/" +
                    convertStringWithPlus(elemento.profile)
                  }
                >
                  <div className="pt-3 pb-3">
                    <div className="d-flex justify-content-center">
                      <img
                        width="50"
                        height="50"
                        src={MapPinIcon}
                        alt="Instagram"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className="d-none d-sm-block">Address</div>
                    </div>
                  </div>
                </a>
              ) : (
                <></>
              )
            }                  
          </div>
          : null
        ))}
      </div>
    )
}
