import React from 'react';
import classnames from 'classnames';
import NavCard from './NavCard';

const layoutData = data => {
  const offset = 2;
  const rows = [];
  for (let i = 0; i < data.length; i += offset) {
    rows.push(data.slice(i, i + offset));
  }
  return rows;
};

const CardLayout = ({ data }) => {
  const rowCols = layoutData(data);
  return rowCols.map((row, x) => {
    return (
      <div
        className={classnames(
          'vads-l-row',
          'vads-u-justify-content--space-between',
          'vads-u-margin-bottom--0',
          'medium-screen:vads-u-margin-bottom--2',
        )}
        key={`row-${x}`}
      >
        {row.map((col, y) => (
          <div
            className={classnames(
              'vads-l-col--12',
              'medium-screen:vads-l-col',
              'mhv-u-grid-gap',
              'vads-u-margin-bottom--2',
              'medium-screen:vads-u-margin-bottom--0',
            )}
            data-testid={`mhv-link-group-card-${x * rowCols.length + y}`}
            key={`col-${y}`}
          >
            <NavCard title={col.title} icon={col.icon} links={col.links} />
          </div>
        ))}
      </div>
    );
  });
};

export default CardLayout;
