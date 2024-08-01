import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@store/store';
import { fetchTypes } from '@store/slices';

import { StyledTypeSelector } from './TypeSelectorStyles';

interface TypeSelectorProps {
  selectedType: string | null;
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  handleTypeChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { types } = useSelector((state: RootState) => state.types);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <StyledTypeSelector
      onChange={handleTypeChange}
      value={selectedType || 'All'}
    >
      {types.map((type) => (
        <option key={type.id} value={type.type_name}>
          {type.type_name}
        </option>
      ))}
    </StyledTypeSelector>
  );
};

export default TypeSelector;
