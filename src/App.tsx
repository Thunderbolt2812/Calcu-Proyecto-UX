import { IonApp, setupIonicReact, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonModal, IonLabel, IonItem, IonList, IonIcon, IonMenu, IonMenuToggle } from '@ionic/react';
import './App.css';
import Pantalla from './components/Pantalla';
import { Boton, BotonIgual} from './components/Boton';
import React, { useState, useRef, useEffect } from 'react';
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
  const [input, setInput] = useState('');
  const [historial, setHistorial] = useState<string[]>([]);
  const [menuType, setMenuType] = useState('overlay');
  const [numeros, setNumeros] = useState<number[]>([]);

  const addNumeroToArray = () => {
    const regex = /-?\d+(\.\d+)?/;
    const match = regex.exec(input);
    if (match) {
      const numero = parseFloat(match[0]);
      setNumeros([...numeros, numero]);
    } else if (input.trim() === '') {
      setNumeros([...numeros, 0]);
    }
  };

  const mplus = () => {
    const regex = /-?\d+(\.\d+)?/;
    const match = regex.exec(input);
    if (match) {
      const numero = parseFloat(match[0]);
      numeros[numeros.length - 1] += numero; 
      setNumeros([...numeros]);
    }
  }

  const menos = () => {
    const regex = /-?\d+(\.\d+)?/;
    const match = regex.exec(input);
    if (match) {
      const numero = parseFloat(match[0]);
      numeros[numeros.length - 1] -= numero; 
      setNumeros([...numeros]);
    }
  }

  const recall = () => {
    if (numeros.length === 0) {
      setInput('0');
    }
    setInput(numeros[numeros.length - 1].toString());
  };

  const clearMemory = () => {
    setNumeros([]);
  }

  const addToHistorial = (valor: string) => {
    setHistorial(prevHistorial => [...prevHistorial, valor]);
  }

  const agregarInput = (val: string) => {
    setInput('');
    if (val === "⌫") {
      setInput(input.slice(0, -1));
    } else if (val === "1/𝒙") {
      setInput(evaluate("1/" + input));
    } else if (val === "+/-") {
      setInput(evaluate(input + "*(-1)"));
      console.log("Estoy en el cambio de signo: " + input);
    } else if (val === "C") {
      setInput('');
      setInput(evaluate(input + "*" + input));
    } else if (val === "CE") {
      setInput('');
    } else if (val === "²√𝒙") {
      if (input.includes("-")) {
        val = input.replace("-", "+");
        setInput(evaluate("sqrt(" + val + ")"));
        console.log("hay signo -");
      } else if (!input.includes("-")) {
        setInput(evaluate("sqrt(" + input + ")"));
        console.log("No hay signo -");
      }
    } else {
      setInput(input + val);
    }
  };

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
      addToHistorial(input);
      addToHistorial(evaluate(valor));
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

  const memoria = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const historialM = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    memoria.current?.dismiss();
  }
  function dismiss1() {
    historialM.current?.dismiss();
  }


  return (
    <IonApp>
      <IonPage id="main-content">
        <IonContent fullscreen >
          <IonMenu type={menuType} contentId="main-content">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Acerca De</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            </IonContent>
          </IonMenu>
          <IonModal ref={historialM} trigger="open-modal" initialBreakpoint={0.75} presentingElement={presentingElement!}>
            <IonHeader >
              <IonToolbar color="#1f1f1">
                <IonTitle >Historial</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss1()}>Cerrar</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent color="#1f1f1">
              <IonList>
                {historial.map((item, index) => {
                  if (index % 2 === 0) {
                    const nextItem = historial[index + 1];
                    return (
                      <IonItem key={index}>
                        <IonLabel>
                          <p>{`${item} = `}</p>
                          <h2>{nextItem}</h2>
                        </IonLabel>
                      </IonItem>
                    );
                  }
                  return null;
                })}
                <IonItem>
                  <IonLabel>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
          <IonModal ref={memoria} trigger="open-memory" initialBreakpoint={0.75} presentingElement={presentingElement!}>
            <IonHeader >
              <IonToolbar color="#1f1f1">
                <IonTitle >Memoria</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss()}>Cerrar</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent color="#1f1f1">
              <IonList>
                {numeros.map((numero, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h2>{numero}</h2>
                    </IonLabel>
                  </IonItem>
                ))}
                <IonItem>
                  <IonLabel>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
          <div className="App">
            <div className="calculadora">
              <div className='fila'>
                <IonMenuToggle>
                  <IonButton><IonIcon src="/components/menu-outline.svg"></IonIcon></IonButton>
                </IonMenuToggle>
                <IonButtons slot="end">
                  <IonButton id="open-modal" expand="block">
                    historial
                  </IonButton>
                </IonButtons>

              </div>
              <Pantalla input={input} />
              <div className='fila'>
                <IonButton fill="clear" onClick={clearMemory}>MC</IonButton>
                <IonButton fill="clear" onClick={recall}>MR</IonButton>
                <IonButton fill="clear" onClick={mplus}>M+</IonButton>
                <IonButton fill="clear" onClick={menos}>M-</IonButton>
                <IonButton fill="clear" onClick={addNumeroToArray}>MS</IonButton>
                <IonButton id="open-memory" fill="clear" expand="block">
                  M
                </IonButton>
              </div>
              <div className='fila'>
                <Boton manejarClic={porcentaje}>%</Boton>
                <Boton manejarClic={agregarInput}>CE</Boton>
                <BotonClear manejarClear={() => setInput('')}>
                  C</BotonClear>
                <Boton manejarClic={agregarInput}>⌫</Boton>
              </div>
              <div className='fila'>
                <Boton manejarClic={agregarInput}>1/𝒙</Boton>
                <Boton manejarClic={cuadrado}>𝒙²</Boton>
                <Boton manejarClic={agregarInput}>²√𝒙</Boton>
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

