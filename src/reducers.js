import {combineReducers} from 'redux';

import {INICIALIZAR, NUEVO_CUADRO} from './actions.js';

const initialState = {
    capital: 100000,
    interes: 1,
    periodo: 10,
    tipo: 'a',
    cuadroAmortizacion: []
}

function calcular(state = initialState, action) {
    switch (action.type) {
        case INICIALIZAR:
            return Object.assign({}, state, initialState);
        case NUEVO_CUADRO:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

const calculadoraApp = combineReducers({calcular})


export default calculadoraApp;
