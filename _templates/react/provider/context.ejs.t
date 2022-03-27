---
to: <%= path %>/<% if (!locals.flat) { %><%= Name %>Provider<% } %>/<%= Name %>Context.js
---
import React from 'react';

export default React.createContext({});
