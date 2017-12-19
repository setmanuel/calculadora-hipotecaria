/* actions types */
export const INICIALIZAR = 'INICIALIZAR';
export const NUEVO_CUADRO = 'NUEVO_CUADRO';

/* action crators */

export function setInicializar() {
    return {type: INICIALIZAR}
}

export function setNuevoCuadro(params) {
    return {type: NUEVO_CUADRO, params}
}
