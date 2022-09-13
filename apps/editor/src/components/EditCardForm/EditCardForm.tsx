import { TextField } from '@mui/material';
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
      <TextField value={formData.name} />
      <TextField value={formData.types} />

      <TextField value={formData.name} />
      <TextField value={formData.name} />
    </>
  );
};
