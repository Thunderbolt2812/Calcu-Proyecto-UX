
import { IonApp, setupIonicReact, IonContent, IonHeader, IonPage, IonTitle, IonFooter, IonToolbar} from '@ionic/react';

import './App.css';
import Pantalla from './components/Pantalla';
import Boton from './components/Boton';
import BotonClear from './components/BotonClear';
import {useState} from 'react';
import {evaluate} from 'mathjs';

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

setupIonicReact();

const App: React.FC = () => {
  const [input, setInput] = useState('22318.60');
  const agregarInput = (val:string) => {
    setInput(input + val);
  }
  const calcularResultado = () => {
    if(input)
    setInput(evaluate(input));
  }

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <div className="App">
            <div className="calculadora">
              <Pantalla input={input}/>
              <div className='fila'>
              <Boton manejarClic={agregarInput}>%</Boton>
              <Boton manejarClic={agregarInput}>CE</Boton>
              <Boton manejarClic={agregarInput}>C</Boton>
              <Boton manejarClic={agregarInput}>x</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={agregarInput}>1/x</Boton>
              <Boton manejarClic={agregarInput}>x2</Boton>
              <Boton manejarClic={agregarInput}>2/-x</Boton>
              <Boton manejarClic={agregarInput}>/</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={agregarInput}>7</Boton>
              <Boton manejarClic={agregarInput}>8</Boton>
              <Boton manejarClic={agregarInput}>9</Boton>
              <Boton manejarClic={agregarInput}>*</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={calcularResultado}>=</Boton>
              <Boton manejarClic={agregarInput}>0</Boton>
              <Boton manejarClic={agregarInput}>.</Boton>
              <Boton manejarClic={agregarInput}>/</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={calcularResultado}>=</Boton>
              <Boton manejarClic={agregarInput}>0</Boton>
              <Boton manejarClic={agregarInput}>.</Boton>
              <Boton manejarClic={agregarInput}>/</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={calcularResultado}>=</Boton>
              <Boton manejarClic={agregarInput}>0</Boton>
              <Boton manejarClic={agregarInput}>.</Boton>
              <Boton manejarClic={agregarInput}>/</Boton>
            </div>
            <div className='fila'>
              <BotonClear manejarClear={() => setInput('')}>
                Limpiar
              </BotonClear>
            </div>
          </div>
        </div>
      </IonContent>      
    </IonPage>  
  </IonApp>
  )
  };
export default App;

