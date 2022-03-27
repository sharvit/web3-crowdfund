---
to: <% if (locals.useCss) { %><%= path %>/<% if (!locals.flat) { %><%= Name %><% } %>/<%= Name %>.module.css<% } %>
---
.container {
  background-color: #333;
}
