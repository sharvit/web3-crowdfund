---
inject: true
append: true
to: <%= path %>/index.js
---
export { default as <%= name %> } from './<%= name %>';
