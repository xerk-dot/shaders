'use client';

import * as React from 'react';
import styles from '@components/RadioButtonGroup.module.scss';
import RadioButton from '@components/RadioButton';

interface RadioOption {
  value: string;
  label: string;
  feedback?: string | React.ReactNode;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  defaultValue?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, defaultValue = '' }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option.value} className={styles.radioWrapper}>
          <RadioButton 
            name="example" 
            value={option.value} 
            selected={selectedValue === option.value} 
            onSelect={handleSelect}
          >
            {option.label}
          </RadioButton>
          {selectedValue === option.value && option.feedback && (
            <div className={styles.feedback}>
              {option.feedback}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
