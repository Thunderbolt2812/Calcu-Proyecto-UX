
import { IonApp, setupIonicReact, IonContent, IonPage } from '@ionic/react';

import './App.css';
import Pantalla from './components/Pantalla';
import { Boton, BotonIgual, BotonMem } from './components/Boton';
import { useState } from 'react';
import { evaluate } from 'mathjs';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { BotonClear } from './components/BotonClear';

setupIonicReact();

const App: React.FC = () => {
  const [input, setInput] = useState('0');
  const agregarInput = (val: string) => {
    setInput('');
    if (val === "⌫") {
      setInput(input.slice(0, -1));
    } else if (val === "1/x") {
      setInput(evaluate("1/" + input));
    } else if (val === "+/-") {
      setInput(evaluate(input + "*(-1)"));
      console.log("Estoy en el cambio de signo: " + input);
    } else if (val === "C") {
      setInput('');
      setInput(evaluate(input + "*" + input));
    } else if (val === "2sqrt(x)") {

      if (input.includes("-")) {
        val = input.replace("-", "+");
        setInput(evaluate("sqrt(" + val + ")"));

        console.log("hay signo -");
      } if (!input.includes("-")) {
        setInput(evaluate("sqrt(" + input + ")"));
        console.log("No hay signo -");
      }

    } else {
      setInput(input + val);
    }

  }
  const calcularResultado = (valor: string) => {
    if (input) {
      valor = input;
      console.log(valor);
      console.log("Soy input: " + input);
      if (input.includes("X")) {

        valor = valor.replace("X", "*")
        console.log("Debería cambiar: " + valor);
        setInput(valor);

      }
      if (input.includes("÷")) {
        valor = valor.replace("÷", "/")
        console.log("Debería cambiar: " + valor);
        setInput(valor);
      }
      setInput(evaluate(valor));
    }
  }
  const porcentaje = () => {
    const numero = evaluate(input);
    const calculo = numero / 100;
    setInput(`${calculo}`);
  }
  const cuadrado = () => {
    const numero = evaluate(input);
    const result = numero ** 2;
    setInput(`${result}`);
  }

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <div className="App">
            <div className="calculadora">
              <div className='fila'>
                <BotonMem manejarClic={agregarInput}>---</BotonMem>
                <BotonMem manejarClic={agregarInput}>Historial</BotonMem>
              </div>
              <Pantalla input={input} />
              <div className='fila'>
                <BotonMem manejarClic={agregarInput}>MC</BotonMem>
                <BotonMem manejarClic={agregarInput}>MR</BotonMem>
                <BotonMem manejarClic={agregarInput}>M+</BotonMem>
                <BotonMem manejarClic={agregarInput}>M-</BotonMem>
                <BotonMem manejarClic={agregarInput}>MS</BotonMem>
                <BotonMem manejarClic={agregarInput}>M</BotonMem>
              </div>
              <div className='fila'>
                <Boton manejarClic={porcentaje}>%</Boton>
                <Boton manejarClic={agregarInput}>CE</Boton>
                <BotonClear manejarClear={() => setInput('0')}>
                  C</BotonClear>
                <Boton manejarClic={agregarInput}>⌫</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>1/x</Boton>
                <Boton manejarClic={cuadrado}>x^2</Boton>
                <Boton manejarClic={agregarInput}>2sqrt(x)</Boton>
                <Boton manejarClic={agregarInput}>÷</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>7</Boton>
                <Boton manejarClic={agregarInput}>8</Boton>
                <Boton manejarClic={agregarInput}>9</Boton>
                <Boton manejarClic={agregarInput}>X</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>4</Boton>
                <Boton manejarClic={agregarInput}>5</Boton>
                <Boton manejarClic={agregarInput}>6</Boton>
                <Boton manejarClic={agregarInput}>-</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>1</Boton>
                <Boton manejarClic={agregarInput}>2</Boton>
                <Boton manejarClic={agregarInput}>3</Boton>
                <Boton manejarClic={agregarInput}>+</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>+/-</Boton>
                <Boton manejarClic={agregarInput}>0</Boton>
                <Boton manejarClic={agregarInput}>.</Boton>
                <BotonIgual manejarClic={calcularResultado}>=</BotonIgual>
              </div>

            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  )
};
export default App;

