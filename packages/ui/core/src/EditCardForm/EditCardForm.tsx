import { Input } from 'theme-ui';
import React, { useEffect, useState } from 'react';
import { Card } from '@mse/types';
export const EditCardForm: React.FC<{
  onCardChange: (card: Partial<Card>) => void;
}> = ({ onCardChange }) => {
  const [formData, setFormData] = useState<Partial<Card>>({});

  useEffect(() => {
    onCardChange(formData);
  }, [formData]);

  return (
    <>
      <Input value={formData.name} />
      <Input value={formData.types} />

      <Input value={formData.name} />
      <Input value={formData.name} />
    </>
  );
};
