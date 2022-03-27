---
to: <%= path %>/<% if (!locals.flat) { %><%= Name %>Provider<% } %>/<%= Name %>Provider.js
---
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import <%= Name %>Context from './<%= Name %>Context';

function <%= Name %>Provider({ children }) {
  const [amount, setAmount] = useState(0);

  return (
    <<%= Name %>Context.Provider
      value={useMemo(
        () => ({
          amount,
          setAmount,
        }),
        [amount, setAmount]
      )}
    >
      {children}
    </<%= Name %>Context.Provider>
  );
}

<%= Name %>Provider.propTypes = {
  children: PropTypes.node,
};

<%= Name %>Provider.defaultProps = {
  children: '',
};

export default <%= Name %>Provider;
