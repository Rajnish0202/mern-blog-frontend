import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { capitalizeText } from '../../utils/captilizeFirstLetter';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import styles from './Sidebar.module.css';

const Sidebar = ({
  setSearch,
  setFilterCategory,
  sort,
  setSort,
  categories,
  searchToggle,
}) => {
  return (
    <div
      className={
        searchToggle
          ? `${styles.sidebar} ${styles.active}`
          : `${styles.sidebar}`
      }
    >
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Search by title...'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='--btn'>
          <FaSearch size={20} />
        </button>
      </div>
      <div className={styles.filterByCategory}>
        <label>Search by category: </label>
        <select
          name=''
          id=''
          onClick={(e) => setFilterCategory(e.target.value)}
        >
          <option value='All'>All</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option value={category} key={index}>
                  {capitalizeText(category)}
                </option>
              );
            })}
        </select>
      </div>
      <div className={styles.filterBySort}>
        <p>Sort By Date: </p>
        <div>
          {sort?.order === 'desc' && (
            <button
              className='--btn --btn-primary'
              onClick={() => setSort({ order: 'asc' })}
            >
              <BsArrowDown size={15} />
            </button>
          )}
          {sort?.order === 'asc' && (
            <button
              className='--btn --btn-primary'
              onClick={() => setSort({ order: 'desc' })}
            >
              <BsArrowUp size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
