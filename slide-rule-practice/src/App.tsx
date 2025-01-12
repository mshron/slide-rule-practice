import { useEffect, useState } from 'react';
import { Operation, SlideRuleRequirements, Problem } from './types';
import { Controls } from './components/Controls';
import { generateProblem } from './utils/problemGenerator';

declare global {
  interface Window {
    MathJax: any;
  }
}

export default function App() {
  const [requirements, setRequirements] = useState<SlideRuleRequirements>({
    operations: [Operation.Multiplication, Operation.Division],
    steps: 2,
    magnitude: 2,
    significantFigures: 1
  });

  const [problem, setProblem] = useState<Problem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateNewProblem = () => {
    setProblem(generateProblem(requirements));
    setShowAnswer(false);
  };

  useEffect(() => {
    if (problem && window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [problem]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Slide Rule Practice
        </h1>

        <Controls
          requirements={requirements}
          onRequirementsChange={setRequirements}
        />

        <div className="flex justify-center">
          <button
            onClick={generateNewProblem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate Problem
          </button>
        </div>

        {problem && (
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="text-xl text-center" dangerouslySetInnerHTML={{
              __html: problem.getMathJaxEquation()
            }} />

            <div className="flex justify-center">
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={showAnswer}
              >
                Show Answer
              </button>
            </div>

            {showAnswer && (
              <div className="text-center text-xl">
                Answer: {problem.answer.toFixed(3)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}