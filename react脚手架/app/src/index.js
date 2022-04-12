
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// ReactDOM.render(
//     // 创建了一个组件实例对象，并将帮过内容当作参数传递
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>,
//     document.getElementById('root')
// );
