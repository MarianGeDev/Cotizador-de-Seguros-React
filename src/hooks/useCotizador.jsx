import { useState } from 'react';

const useCotizador = () => {
  const [elementos, setElementos] = useState({});

  return { elementos, setElementos };
};

export default useCotizador;
