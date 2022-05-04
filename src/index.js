import React from "react";
import ReactDOM from "react-dom";

import App from './components/App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';


const element = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

const container = document.getElementById('root');

ReactDOM.render(element, container);



