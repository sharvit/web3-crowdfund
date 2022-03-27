---
to: <% if (!locals.flat) { %><%= path %>/<%= Name %>/index.js<% } %>
---
export { default } from './<%= Name %>';
