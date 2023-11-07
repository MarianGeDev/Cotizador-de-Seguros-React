import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Opciones from "./Opciones";
import Swal from "sweetalert2";

const Cotizador = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [propiedad, setPropiedad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [metros2, setMetros2] = useState(20);
  const [calculatedQuote, setCalculatedQuote] = useState(0);

  const handlePropiedadChange = (event) => {
    setPropiedad(event.target.value);
  };

  const handleUbicacionChange = (event) => {
    setUbicacion(event.target.value);
  };

  const realizarCotizacion = () => {
    console.log("propiedad:", propiedad);
    console.log("ubicacion:", ubicacion);
    console.log("metros2:", metros2);

    if (propiedad !== "" && ubicacion !== "" && metros2 >= 20) {
      const costoM2 = 35.86;
      const Poliza = calcularCotizacion(costoM2, propiedad, ubicacion, metros2);
      const roundedQuote = Math.round(Poliza);
      console.log("calculatedQuote (rounded):", roundedQuote);
      setCalculatedQuote(roundedQuote);
    } else {
      Swal.fire("Error", "Por favor, ingrese los datos solicitados", "error");
    }
  };

  const guardarEnHistorial = () => {
    const historialCotizaciones =
      JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    const cotizacion = {
      propiedad,
      ubicacion,
      metros2,
      calculatedQuote: calculatedQuote,
      fechaCotizacion: new Date().toDateString(),
    };

    historialCotizaciones.push(cotizacion);
    localStorage.setItem(
      "historialCotizaciones",
      JSON.stringify(historialCotizaciones)
    );
    navigate("/historial");
  };

  const calcularCotizacion = (costoM2, propiedad, ubicacion, metros2) => {
    let factorPropiedad = 1.0;
    let factorUbicacion = 1.0;

    if (propiedad === "Casa") {
      factorPropiedad = 1.09;
    } else if (propiedad === "P.H.") {
      factorPropiedad = 1.05;
    }

    if (ubicacion === "CABA") {
      factorUbicacion = 1.13;
    } else if (ubicacion === "Tandil") {
      factorUbicacion = 1.04;
    }

    return costoM2 * metros2 * factorPropiedad * factorUbicacion;
  };

  useEffect(() => {
    const leer = async () => {
      try {
        const data = await (await fetch("/data.json")).json();
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    leer();
  }, []);

  return (
    <>
      <div>
        <Header titulo="Cotizador Online de Seguros para el Hogar" />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <Opciones
          datos={datos.filter(({ categoria }) => categoria === "propiedad")}
          label={"Selecciona el tipo de Propiedad"}
          tipo={"propiedad"}
          onChange={handlePropiedadChange}
          value={propiedad}
        />
        <Opciones
          datos={datos.filter(({ categoria }) => categoria === "ubicacion")}
          label={"Selecciona su Ubicación"}
          tipo={"ubicacion"}
          onChange={handleUbicacionChange}
          value={ubicacion}
        />
        <label htmlFor="metros2">Ingresa los Metros Cuadrados:</label>
        <input
          type="number"
          id="metros2"
          min="20"
          max="500"
          required
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            const newMetros2 = !isNaN(newValue) ? newValue : 0;
            setMetros2(newMetros2);
          }}
          value={metros2}
        />

        <button type="button" onClick={realizarCotizacion}>
          Cotizar
        </button>
      </form>
      {calculatedQuote !== 0 && (
        <>
          <p className="highlighted-text">
            {" "}
            El precio estimado es de ${calculatedQuote.toFixed(2)}{" "}
          </p>
          <button
            type="button"
            onClick={guardarEnHistorial}
            className="centered-button"
          >
            Guardar
          </button>
        </>
      )}
    </>
  );
};

export default Cotizador;
