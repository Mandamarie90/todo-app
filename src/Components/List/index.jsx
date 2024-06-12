import React from 'react';
import { useSettings } from '../../Context/Settings';
import { Pagination } from '@mantine/core';

const List = ({ items }) => {
  const { settings } = useSettings();
  const [activePage, setActivePage] = React.useState(1);

  
  const visibleItems = settings.showCompleted ? items : items.filter(item => !item.complete);
  

  const paginatedItems = visibleItems.slice((activePage - 1) * settings.itemsPerPage, activePage * settings.itemsPerPage);
  

  return (
    <>
      {paginatedItems.map(item => (
        <div key={item.id}>
          {/* Item rendering logic */}
        </div>
      ))}
      <Pagination
        page={activePage}
        onChange={setActivePage}
        total={Math.ceil(visibleItems.length / settings.itemsPerPage)}
      />
    </>
  );
};

export default List;
