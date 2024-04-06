// ---------- FOOTER Component ----------
// Assets Imports
import Logo from "../assets/img/favicon-marvel.png";
import Facebook from "../assets/img/facebook-logo.svg";
import Twitter from "../assets/img/twitter-logo.svg";
import Instagram from "../assets/img/instagram-logo.svg";
import Youtube from "../assets/img/youtube-logo.svg";
import Tiktok from "../assets/img/tiktok-logo.svg";
import Pinterest from "../assets/img/pinterest-logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <img
          src={Logo}
          alt="logo marvel"
          style={{ width: "100px", height: "100px" }}
        />

        <p>FOLLOW MARVEL</p>
        <div>
          <a
            href="https://www.facebook.com/MarvelFR/?brand_redir=6883542487"
            target="_blank"
          >
            <img
              src={Facebook}
              alt="logo facebook"
              style={{ width: "30px", height: "30px" }}
            />
          </a>
          <a href="https://twitter.com/marvel" target="_blank">
            <img
              src={Twitter}
              alt="logo twitter"
              style={{ width: "30px", height: "30px" }}
            />
          </a>

          <a href="https://www.instagram.com/marvel/" target="_blank">
            <img
              src={Instagram}
              alt="logo facebook"
              style={{ width: "30px", height: "30px" }}
            />
          </a>

          <a href="https://www.youtube.com/marvel" target="_blank">
            <img
              src={Youtube}
              alt="logo youtube"
              style={{ width: "30px", height: "30px" }}
            />
          </a>
          <a href="https://www.tiktok.com/@marvel" target="_blank">
            <img
              src={Tiktok}
              alt="logo snapchat"
              style={{ width: "30px", height: "30px" }}
            />
          </a>
          <a href="https://www.pinterest.fr/marvelofficial/" target="_blank">
            <img
              src={Pinterest}
              alt="logo pinterest"
              style={{ width: "30px", height: "30px" }}
            />
          </a>
        </div>

        <p>
          Made by{" "}
          <a href="https://github.com/LucileBch" target="_blank">
            Lucile
          </a>{" "}
          at{" "}
          <a href="https://www.lereacteur.io/" target="_blank">
            Le Reacteur
          </a>
        </p>
      </div>
    </footer>
  );
};

// Export component
export default Footer;
