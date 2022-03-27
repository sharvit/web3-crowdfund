---
to: <% if (!locals.flat) { %><%= path %>/<%= Name %>Provider/index.js<% } %>
---
export { default as <%= Name %>Context } from './<%= Name %>Context';
export { default as <%= Name %>Provider } from './<%= Name %>Provider';
