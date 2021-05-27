import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = (selector, eqFn) => {
  const store = useContext(StoreContext);
  const values = store(selector, eqFn);

  return values;
};

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
  store: PropTypes.object
};
