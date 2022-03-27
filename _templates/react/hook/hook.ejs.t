---
to: <%= path %>/<%= name %>.js
---
import { useState } from 'react';

const <%= name %> = (initialAmount = 0) => {
  const [amount, setAmount] = useState(initialAmount);

  return { amount, setAmount };
};

export default <%= name %>;
