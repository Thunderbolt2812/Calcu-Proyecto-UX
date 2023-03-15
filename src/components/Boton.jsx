import './Boton.css';

export function Boton(props) {
    function esOperador() {
        const valor = props.children;
        return isNaN(valor) && (valor !== '.') && (valor !== '+/-');
    }
    return (
        
        <div className={`boton ${esOperador() ? 'operador': ''}`}
            onClick={() => props.manejarClic(props.children)}>
            {props.children}
        </div>
    )

}
export function BotonIgual(props) {
    function esIgual() {
        const valor = props.children;
        return (valor === '=');
    }
    return (
        <div className={`boton ${esIgual() ? 'igual': ''}`}
            onClick={() => props.manejarClic(props.children)}>
            {props.children}
        </div>
    )

}
export function BotonMem(props) {
    function esOperador() {
        const valor = props.children;
        return (valor === '=');
    }
    return (
        <div className={`botonMem ${esOperador() ? 'botonMem': ''}`}
            onClick={() => props.manejarClic(props.children)}>
            {props.children}
        </div>
    )
}
