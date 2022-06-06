import React from 'react'; //react 사용을 위해 import
import ReactDOM from 'react-dom/client'; // react DOM의 사용을 위해
import './index.css'; //css import
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(//ReactDom이 내부의 컴포넌트들을 'root' 엘리멘트에 render함.
//   <React.StrictMode>
//     <AppRouter />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <AppRouter />
</React.StrictMode>,);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
