import calcularResultado from './App'
import cuadrado from './App'
import porcentaje from './App'

describe('test unitarios', () => {
  it('should return the number squared', () => {
    expect(cuadrado(2)).toBe(4);
    expect(cuadrado(9)).toBe(81);
    expect(cuadrado(5)).toBe(25);
  });

  it('should return the percentage of the number', () => {
    expect(porcentaje(50)).toBe(0.5);
    expect(porcentaje(25)).toBe(0.25);
    expect(porcentaje(17)).toBe(0.17);
  });

  it('should calculate the specified operation', () => {
    expect(calcularResultado(17 - 3)).toBe(14);
    expect(calcularResultado(-1 + 1)).toBe(0);
    expect(calcularResultado(5 - 9)).toBe(-4);
  });
});
