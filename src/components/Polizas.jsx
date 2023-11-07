const Polizas = (propiedades) => {
    return (<li>
        {Object.keys(propiedades).map((propiedad,indice) => ( <p key={indice}> {propiedades[propiedad]}</p> 
       ))} 
    </li>
);
   };
   export default Polizas;