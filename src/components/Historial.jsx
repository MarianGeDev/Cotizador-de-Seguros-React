import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Historial = () => {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    setHistorialCotizaciones(historial);
  }, []);

  return (
    <>
      <nav>
        <Link to={"/"} >
          <FaHome/>
        </Link>
      </nav>
      <div>
        <h1>Historial de Cotizaciones</h1>
        <ul>
          {historialCotizaciones.map((cotizacion, index) => (
            <li key={index}>
              <p>
                <strong>Fecha de cotización:</strong> {cotizacion.fechaCotizacion}
              </p>
              <p>
                <strong>Propiedad:</strong> {cotizacion.propiedad}
              </p>
              <p>
                <strong>Ubicación:</strong> {cotizacion.ubicacion}
              </p>
              <p>
                <strong>Metros cuadrados:</strong> {cotizacion.metros2}
              </p>
              <p>
                <strong>Póliza mensual $:</strong> {cotizacion.calculatedQuote}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Historial;

