import React, { useState } from "react";

interface PriorityOptionProps {
  priority: string;
  onPriorityChange: (newPriority: string) => void;
}

const PriorityOption: React.FC<PriorityOptionProps> = ({
  priority,
  onPriorityChange,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string>(
    priority || "Low"
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setSelectedPriority(newPriority);
    onPriorityChange(newPriority);
  };

  return (
    <div className="priority-option">
      <label>Priority: </label>
      <select value={selectedPriority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default PriorityOption;
