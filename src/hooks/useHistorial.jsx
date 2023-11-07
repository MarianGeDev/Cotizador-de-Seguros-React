import { useState } from 'react';

const useHistorial = () => {
  const [historial, setHistorial] = useState([]);

  const guardarCotizacion = (cotizacion) => {
    setHistorial([...historial, cotizacion]);
  };

  return {
    historial,
    guardarCotizacion
  };
};

export default useHistorial;