import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import Checkbox from './Checkbox';

const CheckboxCellRenderer: React.FC<ICellRendererParams> = ({ value, data, node, colDef, context }) => {
  const handleCheckboxChange = () => {
    // Puedes manejar el cambio de estado del checkbox aquí
    console.log('Checkbox changed for row:', data);
  };

  return (
    <Checkbox value={value} onChange={handleCheckboxChange} />
  );
};

export default CheckboxCellRenderer;
