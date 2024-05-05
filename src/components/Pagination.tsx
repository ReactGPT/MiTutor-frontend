import React from 'react';
import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  if (startPage <= 1) {
    startPage = 1;
    endPage = Math.min(3, totalPages);
  } else if (endPage >= totalPages) {
    startPage = Math.max(1, totalPages - 2);
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="m-5 flex justify-center items-center space-x-4 font-roboto">
      <Button variant="primario" text="Ant." onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`shadow-custom px-3 py-2 border-custom ${number === currentPage ? 'bg-primary text-white' : 'bg-white'} hover:bg-primary hover:text-white`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <Button variant="primario" text="Sig." onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
    </div>
  );
};

export default Pagination;
