
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
  const [input, setInput] = useState('0');

  const agregarInput = (val:string) => {
     if(val=="⌫"){
      setInput(input.slice(0,-1));
    }else if(val=="1/x"){
        setInput(evaluate("1/"+input));
    }else if(val=="+/-"){
      setInput(evaluate(input+"*(-1)"));
      console.log("Estoy en el cambio de signo: "+input);
    }else if(val=="C"){
      setInput('');
      setInput(evaluate(input+"*"+input));
    }else if(val=="2sqrt(x)"){
      
      if(input.includes("-")){
        val=input.replace("-","+");
        setInput(evaluate("sqrt("+val+")"));
        
        console.log("hay signo -");
      }if(!input.includes("-")){
        setInput(evaluate("sqrt("+input+")"));
        console.log("No hay signo -");
      }
        
    }else{
      setInput(input + val);
    }
    
  }
  const calcularResultado = (val:string) => {
    if(input){
      var val = input;
      console.log(val);
      console.log("Soy input: "+input);
        if(input.includes("X")){
         
          val=val.replace("X","*")
          console.log("Debería cambiar: "+val);
          setInput(val);
          
        }
        if(input.includes("÷")){
          val=val.replace("÷","/")
          console.log("Debería cambiar: "+val);
          setInput(val);
        }
        
      
      
      setInput(evaluate(val));
      
    }
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
              <Boton manejarClic={agregarInput}>⌫</Boton>
            </div>
            <div className='fila'>
              <Boton manejarClic={agregarInput}>1/x</Boton>
              <Boton manejarClic={agregarInput}>x^2</Boton>
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
              <Boton manejarClic={calcularResultado}>=</Boton>
            </div>
            
          </div>
        </div>
      </IonContent>      
    </IonPage>  
  </IonApp>
  )
  };
export default App;

