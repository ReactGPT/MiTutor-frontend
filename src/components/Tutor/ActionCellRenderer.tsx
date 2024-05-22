import React from 'react';
import Button from '../Button';
import IconPencil from '../../assets/svg/IconPencil';
import IconDelete from '../../assets/svg/IconDelete';
import { Commintment } from '../../store/types/Commintment';

type ActionCellRendererProps = {
  data: Commintment;
  openModalEdit: (data: Commintment) => void;
  handleConfirmDeleteCommit: (data: Commintment) => void;
};

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ data, openModalEdit, handleConfirmDeleteCommit }) => {
  return (
    <div className="flex">
      <div className="mr-2">
        <Button variant="secundario" icon={IconPencil} onClick={() => openModalEdit(data)} />
      </div>
      <Button variant="warning" icon={IconDelete} onClick={() => handleConfirmDeleteCommit(data)} />
    </div>
  );
};

export default ActionCellRenderer;
