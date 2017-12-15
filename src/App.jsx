import React, {Component} from 'react';
import logo from './images/set_logo.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capital: 0,
            interes: 0,
            periodo: 0,
            tipo: 'm',
            cuadroAmortizacion: []
        }

        this.valueTextChange = this.valueTextChange.bind(this);

        this.formSubmit = this.formSubmit.bind(this);
    }

    valueTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    formSubmit(event) {
        let url = "http://softevolutions.es/setapp/services/calculadora-hipotecaria/services/calculadora-hipotecaria-fetch.php";

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
            this.setState({cuadroAmortizacion: cuadro.response});
        });

        event.preventDefault();
    }

    render() {

        let cuotas = "";

        if(this.state.cuadroAmortizacion.data) {
            cuotas = this.state.cuadroAmortizacion.data.map((linea, i) => <h6 key={i}>{linea.cuota}</h6>);
        }

        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Calculadora Hipotecaria</h1>
            </header>

            <section className="solicitud">
                <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label>
                            Capital:
                        </label>
                        <input type="text" className="form-control" name="capital" value={this.state.capital} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Interés:
                        </label>
                        <input type="text" className="form-control" name="interes" value={this.state.interes} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Periodo:
                        </label>
                        <div className="form-inline">
                            <input type="text" className="form-control" name="periodo" value={this.state.periodo} onChange={this.valueTextChange}/>

                            <select name="tipo">
                                <option value="m">Meses</option>
                                <option value="a">Años</option>
                            </select>
                        </div>
                    </div>

                    <input type="submit" value="Ver Cuadro" title="ver el cuadro de amortización"/>
                </form>
            </section>

            <section>
                {cuotas}
            </section>

        </div>);
    }
}

export default App;
