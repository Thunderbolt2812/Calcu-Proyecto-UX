import './BotonClear.css';

export const BotonClear = (props) => (
    <div className='boton-clear'
    onClick={() => props.manejarClear(props.children)}>
        {props.children}
    </div>
);
