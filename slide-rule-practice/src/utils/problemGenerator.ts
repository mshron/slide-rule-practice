import { generateNumber } from './numberGenerator';
import { Operation, Problem, SlideRuleRequirements } from '../types';

interface EquationNode {
  type: 'operation' | 'number';
  value: Operation | number;
  children?: EquationNode[];
}

export class SlideRuleProblem implements Problem {
  public equation: string;
  public answer: number;
  private equationTree: EquationNode;

  constructor(requirements: SlideRuleRequirements) {
    this.equationTree = this.generateEquationTree(requirements);
    this.answer = this.calculateAnswer(this.equationTree);
    this.equation = this.generateLatexEquation(this.equationTree);
  }

  private generateEquationTree(requirements: SlideRuleRequirements): EquationNode {
    const generateSubtree = (depth: number, nodesCreated: number): EquationNode => {
      // Force operation if we haven't created enough nodes yet
      const needMoreNodes = nodesCreated < 2;
      const shouldCreateOperation = needMoreNodes || (depth > 0 && Math.random() < 0.5);

      if (!shouldCreateOperation) {
        return {
          type: 'number',
          value: generateNumber(requirements.magnitude, requirements.significantFigures)
        };
      }

      const operation = requirements.operations[
        Math.floor(Math.random() * requirements.operations.length)
      ];

      // Handle unary operations
      if ([Operation.Square, Operation.Cube, Operation.SquareRoot, Operation.CubeRoot, Operation.Log10, Operation.Ln].includes(operation)) {
        const child = generateSubtree(depth - 1, nodesCreated + 1);
        return {
          type: 'operation',
          value: operation,
          children: [child]
        };
      }

      // Handle binary operations
      const leftChild = generateSubtree(depth - 1, nodesCreated + 1);
      const rightChild = generateSubtree(depth - 1, nodesCreated + 1 + countNodes(leftChild));
      return {
        type: 'operation',
        value: operation,
        children: [leftChild, rightChild]
      };
    };

    // Helper function to count nodes in a subtree
    const countNodes = (node: EquationNode): number => {
      if (node.type === 'number') return 1;
      return 1 + (node.children?.reduce((sum, child) => sum + countNodes(child), 0) ?? 0);
    };

    return generateSubtree(requirements.steps - 1, 0);
  }

  private calculateAnswer(node: EquationNode): number {
    if (node.type === 'number') return node.value as number;

    const operation = node.value as Operation;
    const childValues = node.children!.map(child => this.calculateAnswer(child));

    switch (operation) {
      case Operation.Multiplication:
        return childValues[0] * childValues[1];
      case Operation.Division:
        return childValues[0] / childValues[1];
      case Operation.Square:
        return Math.pow(childValues[0], 2);
      case Operation.Cube:
        return Math.pow(childValues[0], 3);
      case Operation.SquareRoot:
        return Math.sqrt(childValues[0]);
      case Operation.CubeRoot:
        return Math.pow(childValues[0], 1/3);
      case Operation.Log10:
        return Math.log10(childValues[0]);
      case Operation.Ln:
        return Math.log(childValues[0]);
      case Operation.Exp:
        return Math.exp(childValues[0]);
      default:
        return 0;
    }
  }

  private generateLatexEquation(node: EquationNode): string {
    if (node.type === 'number') {
      return (node.value as number).toString();
    }

    const operation = node.value as Operation;
    const childLatex = node.children!.map(child => this.generateLatexEquation(child));

    switch (operation) {
      case Operation.Multiplication:
        return `(${childLatex[0]} \\times ${childLatex[1]})`;
      case Operation.Division:
        return `\\frac{${childLatex[0]}}{${childLatex[1]}}`;
      case Operation.Square:
        return `{(${childLatex[0]})}^2`;
      case Operation.Cube:
        return `{(${childLatex[0]})}^3`;
      case Operation.SquareRoot:
        return `\\sqrt{${childLatex[0]}}`;
      case Operation.CubeRoot:
        return `\\sqrt[3]{${childLatex[0]}}`;
      case Operation.Log10:
        return `\\log_{10}{${childLatex[0]}}`;
      case Operation.Ln:
        return `\\ln{${childLatex[0]}}`;
      case Operation.Exp:
        return `e^{${childLatex[0]}}`;
      default:
        return '?';
    }
  }

  public getMathJaxEquation(): string {
    return `\\[${this.equation} = ?\\]`;
  }
}

export function generateProblem(requirements: SlideRuleRequirements): Problem {
  return new SlideRuleProblem(requirements);
}