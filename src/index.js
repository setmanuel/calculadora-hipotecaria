import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import calculadoraApp from './reducers';

import './index.css';

const store = createStore(calculadoraApp);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

console.log(store.getState());

registerServiceWorker();
