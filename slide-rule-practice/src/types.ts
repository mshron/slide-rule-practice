declare module '*.css';

export enum Operation {
  Multiplication = 'multiplication',
  Division = 'division',
  Square = 'square',
  Cube = 'cube',
  SquareRoot = 'squareRoot',
  CubeRoot = 'cubeRoot',
  Log10 = 'log10',
  Ln = 'ln',
  Exp = 'exp',
  Sin = 'sin',
  Cos = 'cos',
  Tan = 'tan'
}

export interface SlideRuleRequirements {
  operations: Operation[];
  steps: number;
  magnitude: number;
  significantFigures: number;
}

export interface Problem {
  equation: string;
  answer: number;
  getMathJaxEquation: () => string;
}