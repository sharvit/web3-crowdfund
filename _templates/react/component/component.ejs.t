---
to: <%= path %>/<% if (!locals.flat) { %><%= Name %><% } %>/<%= Name %>.js
---
<% if (locals.useState) { -%>
import React, { useState } from 'react';
<% } else { -%>
import React from 'react';
<% } -%>
<% if (locals.useProps) { -%>
import PropTypes from 'prop-types';
<% } -%>

<% if (locals.useCss) { -%>
import styles from './<%= Name %>.module.css';

<% } -%>
<% if (locals.useProps) { -%>
function <%= Name %>({ children, message }) {
<% } else { -%>
function <%= Name %>() {
<% } -%>
  <%_ if (locals.useState) { -%>
  const [amount, setAmount] = useState(1);

  <%_ } -%>
  return (
    <%_ if (locals.useCss) { -%>
    <div className={styles.container}>
    <%_ } else { -%>
    <div>
    <%_ } -%>
      <h1>Hello</h1>
      <%_ if (locals.useState) { -%>
      <div>
        {amount}
        <button type="button" onClick={() => setAmount(amount + 1)}>
          +1
        </button>
      </div>
      <%_ } -%>
      <%_ if (locals.useProps) { -%>
      <div>{message}</div>
      <div>{children}</div>
      <%_ } -%>
    </div>
  );
}
<% if (locals.useProps) { -%>

<%= Name %>.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
};

<%= Name %>.defaultProps = {
  children: '',
  message: '',
};
<% } -%>

export default <%= Name %>;
