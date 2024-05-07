import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleButtonProps {
  defaultEnabled?: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ defaultEnabled = false, onChange, disabled = false }) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onChange(newEnabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleToggle}
      className={`${enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
      disabled={disabled}
    >
      <span className="sr-only">Enable</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
};

export default ToggleButton;
