import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';

const List = ({ items }) => {
  const { itemsToShow, hideCompleted } = useContext(SettingsContext);
  const filteredItems = items.filter(item => !hideCompleted || !item.completed);
  const paginatedItems = filteredItems.slice(0, itemsToShow);

  return (
    <div>
      {paginatedItems.map(item => (
        <div key={item.id}>{item.text}</div>
      ))}
      {/* Pagination component to be added */}
    </div>
  );
};

export default List;
