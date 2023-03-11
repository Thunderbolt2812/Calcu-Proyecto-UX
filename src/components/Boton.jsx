import './Boton.css';
function Boton(props) {
    function esOperador() {
        const valor = props.children;
        return isNaN(valor) && (valor !== '.') && (valor !== '=');
    }
    return (
        <div className={`boton ${esOperador() ? 'operador' : ''}`}
            //onClick={props.manejarClic(props.children)}
            onClick={() => props.manejarClic(props.children)}>
            {props.children}
        </div>
    )
}

export default Boton;