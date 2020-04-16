import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'

import DateInputComponent from './dateInputComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capital: '',
            interes: '',
            periodo: '',
            tipo: 'a',
            message: "",
            cuadroAmortizacion: []
        }

        this.valueTextChange = this.valueTextChange.bind(this);

        this.onClickConsultar = this.onClickConsultar.bind(this);
        this.onClickNueva = this.onClickNueva.bind(this);
    }

    valueTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClickConsultar(event) {
        event.preventDefault();

        let url = "http://softevolutions.es/setapp/services/calculadora-hipotecaria/services/calculadora-hipotecaria-fetch.php";

        this.setState({message: "Obteniendo cuadro de amortización"});

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(function(cuadro) {
            return cuadro.json();
        }).then((cuadro) => {
            this.setState({cuadroAmortizacion: cuadro.response.data, message: cuadro.response.message});

            /* mando el foco al campo capital */
            document.getElementById('capital').focus();

        });

    }

    onChangeDate(event) {
      console.log(event.target.value, ' ', event.target.dateValid);
    }
    onCompletedDate(event) {
      console.log("Completado: ", event);
    }

    onClickNueva(event) {
        /* inicializo el estado */
        this.setState({
            capital: '',
            interes: '',
            periodo: '',
            tipo: 'a',
            message: '',
            cuadroAmortizacion: []
        });

        /* mando el foco al campo capital */
        document.getElementById('capital').focus();
    }

    render() {

        let cuotas = this.state.cuadroAmortizacion.map((linea, i) => {
            return (<div key={i} className="cuota" title={'Se ha amortizado el ' + (
                (i + 1) * 100 / this.state.cuadroAmortizacion.length).toFixed(2) + "% => " + (
                this.state.capital - linea.capital_pendiente).toFixed(2)}>
                <div>Cuota</div>
                <div>{i + 1}</div>
                <div>{linea.capital}<span className="mx-1 text-success porciento">({linea.capital_porciento}%)</span>
                </div>
                <div>{linea.intereses}<span className="mx-1 text-danger porciento">({linea.intereses_porciento}%)</span>
                </div>
                <div>{linea.cuota}</div>
                <div>{linea.capital_pendiente_show}</div>
            </div>);
        });

        let cabecera = "";

        if (this.state.cuadroAmortizacion.length > 0) {
            cabecera = <div className="cuota font-weight-bold my-2 bg-warning">
                <div></div>
                <div></div>
                <div>Captial</div>
                <div>Intereses</div>
                <div>Cuota</div>
                <div>Pendiente</div>
            </div>;
        }

        return (<div className="App">
            <header className="App-header">
                <h1 className="App-title">Calculadora Hipotecaria</h1>
                <h6 className="message">{this.state.message}</h6>
            </header>

            <DateInputComponent onChange={this.onChangeDate} onCompleted={this.onCompletedDate}/>

            <section className="solicitud">
                <div className="campos">
                    <div className="form-group">
                        <label>Capital</label>
                        <input type="text" className="form-control" name="capital" id="capital" placeholder="capital" value={this.state.capital} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <label>Interes</label>
                        <input type="text" className="form-control" name="interes" placeholder="interés" value={this.state.interes} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <label>Periodo</label>
                        <div className="form-inline">
                            <input type="text" className="form-control" name="periodo" placeholder="periodo" value={this.state.periodo} onChange={this.valueTextChange}/>

                            <select name="tipo" value={this.state.tipo} onChange={this.valueTextChange}>
                                <option value="m">Meses</option>
                                <option value="a">Años</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="d-block my-2">
                    <button className="btn btn-primary" title="ver el cuadro de amortización" onClick={this.onClickConsultar}>Mostrar Cuadro</button>
                    <button className="btn btn-primary" title="iniciar una nueva consulta" onClick={this.onClickNueva}>Nueva Consulta</button>
                </div>

            </section>

            <section>
                {cabecera}
                {cuotas}
            </section>

            <footer>

            </footer>

        </div>);
    }
}

App.propTypes = {}

export default App;
