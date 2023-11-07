// Opciones.jsx
import PropTypes from 'prop-types';

const Opciones = ({ datos, label, tipo, onChange, value }) => {
  return (
    <>
      <label htmlFor={tipo}>{label}</label>
      <select name={tipo} id={tipo} onChange={onChange} value={value}>
        <option value="" disabled>...</option>
        {datos.map((elemento, index) => (
          <option key={index} value={elemento.tipo}>
            {elemento.tipo}
          </option>
        ))}
      </select>
    </>
  );
};

Opciones.propTypes = {
  datos: PropTypes.arrayOf(
    PropTypes.shape({
      tipo: PropTypes.string.isRequired,
      factor: PropTypes.number.isRequired,
      categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Opciones;



