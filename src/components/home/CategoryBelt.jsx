import React from 'react';
import { MOCK_CATEGORIES } from '../../server/mockData';

const CategoryBelt = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="categories-belt">
      {MOCK_CATEGORIES.map((cat, idx) => (
        <div className="cat-belt-item scale-hover" key={idx} onClick={() => setActiveCategory(cat.name)}>
          <div className={`cat-icon-circle ${activeCategory === cat.name ? 'active-cat-circle' : ''}`}>
            <img src={cat.bg} alt={cat.name} className="cat-thumbnail" />
          </div>
          <span>{cat.name}</span>
        </div>
      ))}
      <div className="cat-belt-item scale-hover" onClick={() => setActiveCategory('All')}>
        <div className="cat-icon-circle view-all-circle">
          <span>›</span>
        </div>
        <span>View All</span>
      </div>
    </div>
  );
};

export default CategoryBelt;
