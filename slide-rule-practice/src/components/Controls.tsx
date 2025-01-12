import { Operation, SlideRuleRequirements } from '../types';

interface ControlsProps {
  requirements: SlideRuleRequirements;
  onRequirementsChange: (requirements: SlideRuleRequirements) => void;
}

export function Controls({ requirements, onRequirementsChange }: ControlsProps) {
  const handleOperationToggle = (operation: Operation) => {
    const newOperations = requirements.operations.includes(operation)
      ? requirements.operations.filter(op => op !== operation)
      : [...requirements.operations, operation];

    // Ensure at least one operation is selected
    if (newOperations.length > 0) {
      onRequirementsChange({ ...requirements, operations: newOperations });
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Operations</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(Operation).map(operation => (
              <label key={operation} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={requirements.operations.includes(operation)}
                  onChange={() => handleOperationToggle(operation)}
                  className="rounded"
                />
                <span className="text-sm">{operation}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Depth</h3>
          <input
            type="range"
            min={2}
            max={5}
            value={requirements.steps}
            onChange={(e) => onRequirementsChange({
              ...requirements,
              steps: parseInt(e.target.value)
            })}
            className="w-full"
            list="depth-stops"
          />
          <datalist id="depth-stops">
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
          </datalist>
          <div className="text-sm text-gray-600">
            Depth: {requirements.steps}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Magnitude</h3>
          <input
            type="range"
            min={1}
            max={5}
            value={requirements.magnitude}
            onChange={(e) => onRequirementsChange({
              ...requirements,
              magnitude: parseInt(e.target.value)
            })}
            className="w-full"
            list="magnitude-stops"
          />
          <datalist id="magnitude-stops">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
          </datalist>
          <div className="text-sm text-gray-600">
            Magnitude: {requirements.magnitude}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Significant Figures</h3>
          <input
            type="range"
            min={1}
            max={3}
            value={requirements.significantFigures}
            onChange={(e) => onRequirementsChange({
              ...requirements,
              significantFigures: parseInt(e.target.value)
            })}
            className="w-full"
            list="sig-fig-stops"
          />
          <datalist id="sig-fig-stops">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </datalist>
          <div className="text-sm text-gray-600">
            Significant Figures: {requirements.significantFigures}
          </div>
        </div>
      </div>
    </div>
  );
}