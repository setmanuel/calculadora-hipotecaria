import React, {Component} from 'react';
import logo from './images/set_logo.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capital: 100000,
            interes: 1,
            periodo: 10,
            tipo: 'a',
            message: "",
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
        });

        event.preventDefault();
    }

    render() {

        let cuotas = this.state.cuadroAmortizacion.map((linea, i) => {
            return (<div key={i} className="cuota" title={'Amortizado el ' + (
                (i + 1) * 100 / this.state.cuadroAmortizacion.length).toFixed(2) + "% => " + (
                this.state.capital - linea.capital_pendiente).toFixed(2)}>
                <div>Cuota</div>
                <div>{i + 1}</div>
                <div>{linea.capital}</div>
                <div>{linea.intereses}</div>
                <div>{linea.cuota}</div>
                <div>{linea.capital_pendiente}</div>
            </div>);
        });

        let cabecera = "";

        if (this.state.cuadroAmortizacion.length > 0) {
            cabecera = <div className="cuota font-weight-bold my-2">
                <div></div>
                <div></div>
                <div>Captial</div>
                <div>Intereses</div>
                <div>Cuota</div>
                <div>Capital Pendiente</div>
            </div>;
        }

        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Calculadora Hipotecaria</h1>
                <h6>{this.state.message}</h6>
            </header>

            <section className="solicitud">
                <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="capital" placeholder="capital" value={this.state.capital} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" name="interes" placeholder="interés" value={this.state.interes} onChange={this.valueTextChange}/>
                    </div>

                    <div className="form-group">
                        <div className="form-inline">
                            <input type="text" className="form-control" name="periodo" placeholder="periodo" value={this.state.periodo} onChange={this.valueTextChange}/>

                            <select name="tipo">
                                <option value="m">Meses</option>
                                <option value="a">Años</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary" title="ver el cuadro de amortización">Mostrar Cuadro</button>
                </form>
            </section>

            <section>
                {cabecera}
                {cuotas}
            </section>

        </div>);
    }
}

export default App;
