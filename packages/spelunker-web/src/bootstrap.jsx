import React from 'react';
import { createRoot } from 'react-dom/client';

import Spelunker from './components/Spelunker';

const container = document.getElementById('spelunker');
const root = createRoot(container);
root.render(<Spelunker />);
