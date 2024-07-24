import { Link } from "react-router-dom";

import logo from "../../../assets/images/WeaveCraft.png";
import "./_footer.scss";

function Footer() {
  return(
    <footer>
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo de la boutique WeaveCraft"
          className={"footer-logo"}
        />
      </Link>
      <div className="footer-links">
        <Link to={"/"}>FAQ</Link>
        <Link to={"/"}>Contact</Link>
        <Link to={"/"}>CGV</Link>
        <Link to={"/"}>Mentions légales</Link>
        <Link to={"/"}>Politique de confidentialité</Link>
      </div>
      <span>&copy; 2024 - Alexia Nicoleau - WeaveCraft</span>
    </footer>
  )
}

export default Footer;
