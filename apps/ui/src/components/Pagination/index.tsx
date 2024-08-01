import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={page === currentPage + 1}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </PaginationButton>
      ))}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: 1px solid #007bff;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #007bff;
    color: #fff;
  }
`;
