// ---------- FOOTER Component ----------
// Assets Imports
import Logo from "../assets/img/favicon-marvel.png";
import Facebook from "../assets/img/facebook-logo.svg";
import Twitter from "../assets/img/twitter-logo.svg";
import Instagram from "../assets/img/instagram-logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="wrapper__links">
          <a href="#">
            <img src={Logo} alt="logo marvel" />
          </a>

          <div className="footer__links">
            <p>FOLLOW MARVEL</p>
            <a
              href="https://www.facebook.com/MarvelFR/?brand_redir=6883542487"
              target="_blank"
            >
              <img src={Facebook} alt="logo facebook" />
            </a>
            <a href="https://twitter.com/marvel" target="_blank">
              <img src={Twitter} alt="logo twitter" />
            </a>

            <a href="https://www.instagram.com/marvel/" target="_blank">
              <img src={Instagram} alt="logo facebook" />
            </a>
          </div>
        </div>

        <div className="footer__by">
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
      </div>
    </footer>
  );
};

// Export component
export default Footer;
