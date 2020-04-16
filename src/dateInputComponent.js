// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './dateInputComponent.css'

import * as moment from 'moment';
import Cleave from 'cleave.js/react';

/*
    Usamos el componente Cleave.js

    https://nosir.github.io/cleave.js/
    https://github.com/nosir/cleave.js
*/

export default class DateInputComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      /*
        este campo define si la fecah indicada es o no valida

        se inicializa a "true" porque por defecto, el campo "value" es la fecha de hoy
      */
      dateValid: true
    };
  }

  static propTypes = {
    /* el parámetro "value" puede ser una cadena o una fecha */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    format: PropTypes.string,
    onCompleted: PropTypes.func.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: new Date(),
    format: "dd/mm/yyyy",
    onCompleted: () => void(0),
    onChange: () => void(0)
  };

  onChange(event) {
    /* si la fecha es válida y si el conetenido en carácteres es igual al número de carácteres del formato,
    entonces activo el callback */
    if (moment(event.target.value, this.props.format.toUpperCase(), true).isValid() && event.target.value.length === this.props.format.length) {

      this.setState({dateValid: true});
      event.target.dateValid = true;

      this.props.onCompleted({
        value_string: event.target.value,
        value_date: moment(event.target.value, this.props.format.toUpperCase(), true).toDate()
      });

    } else {
      this.setState({dateValid: false});
      event.target.dateValid = false;
    }

    /* una vez realizadas las oportunas comprovaciones, emito como callback el posible evento onChange, si existe */
    if (this.props.onChange) {
      /* en el onChange informo si la fecha indicada hasta ahora es válida o no,
      con una propiedad llamada "dateValid", a la que se accede desde event.target */
      this.props.onChange(event);
    }

  }

  onBlur(event) {
    /*
      al perder el foco el componente, si  la fecha no es válida, vuelvo a enviarle el foco
    */
    if (!moment(event.target.value, this.props.format.toUpperCase(), true).isValid()) {
      event.target.focus();
    }
  }

  render() {
    /* indico el valor por defecto del componente, el que viene del props o la fecha de hoy, si no viene indicado */
    let default_value = moment(this.props.value).format(this.props.format.toUpperCase());

    /*
      La librería Moment trabaja con formatos de fecha en mayusculas,
      pero el componente Cleave, lo hace en minúsculas,
      de ahí este trozo de código

      además Moment trabaja con dobles letras dd, mm y sin embargo, Cleave lo hace con una sola letra d, m

    */
    let formato = this.props.format.toUpperCase().split("/");
    formato.map(function(key, index) {

      if (formato[index].toString().toLowerCase().indexOf("d") >= 0) {
        formato[index] = "d";
      }
      if (formato[index].toString().toLowerCase().indexOf("m") >= 0) {
        formato[index] = "m";
      }
      if (formato[index].toString().toLowerCase().indexOf("y") >= 0) {
        formato[index] = "Y";
      }
    });

    return (<div>
      <Cleave placeholder={this.props.format} options={{
          date: true,
          datePattern: formato
        }} className={!this.state.dateValid
          ? 'classDateInvalid'
          : ''} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={default_value}/>
    </div>)
  }
}
