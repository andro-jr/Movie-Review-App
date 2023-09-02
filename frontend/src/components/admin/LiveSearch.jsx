import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { commonInputClasses } from '../../utils/Theme';

export const results = [
  {
    id: '1',
    avatar:
      'https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'John Doe',
  },
  {
    id: '2',
    avatar:
      'https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'Chandri Anggara',
  },
  {
    id: '3',
    avatar:
      'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'Amin RK',
  },
  {
    id: '4',
    avatar:
      'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'Edward Howell',
  },
  {
    id: '5',
    avatar:
      'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'Amin RK',
  },
  {
    id: '6',
    avatar:
      'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    name: 'Edward Howell',
  },
];

const LiveSearch = () => {
  const [displaySearch, setDisplaySearch] = useState();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  console.log(
    '🚀 ~ file: LiveSearch.jsx:46 ~ LiveSearch ~ focusedIndex:',
    focusedIndex
  );

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const handleOnBlur = () => {
    if (results.length) setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleSelection = (selectedItem) => {
    console.log(
      '🚀 ~ file: LiveSearch.jsx:61 ~ LiveSearch ~ selectedItem:',
      selectedItem
    );
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;

    const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
    if (!keys.includes(key)) return;

    //movie selection up and down
    if (key === 'ArrowDown') {
      focusedIndex === results.length - 1
        ? (nextCount = 0)
        : (nextCount = focusedIndex + 1);
    }

    if (key === 'ArrowUp') {
      if (focusedIndex === -1) return;
      nextCount = focusedIndex - 1;
    }

    if (key === 'Enter') {
      return handleSelection(results[focusedIndex]);
    }

    setFocusedIndex(nextCount);
  };

  return (
    <div className='relative'>
      <input
        type='text'
        className={commonInputClasses + 'rounded border-2 p-1 text-lg'}
        placeholder='Search Profile'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
      />
      <SearchResults
        visible={displaySearch}
        results={results}
        focusedIndex={focusedIndex}
        handleSelection={handleSelection}
        renderItem={renderItem}
      />
    </div>
  );
};

const renderItem = ({ id, name, avatar }) => {
  <div className='flex'>
    <img src={avatar} alt='' />
    <p>{name}</p>
  </div>;
};

const SearchResults = ({
  results = [],
  visible,
  focusedIndex,
  handleSelection,
  renderItem,
  resultCotainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [focusedIndex]);

  if (!visible) return null;

  const getSelectedClass = () => {
    return selectedResultStyle
      ? selectedResultStyle
      : 'dark:bg-dark-subtle bg-light-subtle';
  };

  return (
    <div className='absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 overflow-auto mt-1 custom-scroll-bar'>
      {results.map((result, i) => {
        const { id, name, avatar } = result;
        return (
          <ResultCard
            ref={i === focusedIndex ? resultContainer : null}
            key={id}
            item={result}
            renderItem={renderItem}
            resultCotainerStyle={resultCotainerStyle}
            selectedResultStyle={i === focusedIndex ? getSelectedClass() : ''}
            onClick={() => handleSelection(result)}
          />
        );
      })}
    </div>
  );
};

export default LiveSearch;

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultCotainerStyle,
    selectedResultStyle,
    onClick,
  } = props;

  const getClasses = () => {
    if (resultCotainerStyle)
      return resultCotainerStyle + ' ' + selectedResultStyle;

    return (
      selectedResultStyle +
      'cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition'
    );
  };
  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
