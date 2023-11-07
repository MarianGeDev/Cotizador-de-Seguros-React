import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import logo from "C:/Users/DELL/Cotizador-Proyecto final/public/logo.png";

const Header = ({ titulo }) => {
  return (
    <header className="header">
      <nav>
        <Link to="/historial">
          <FaClipboardList />
        </Link>
      </nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1>{titulo}</h1>
    </header>
  );
};

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;



