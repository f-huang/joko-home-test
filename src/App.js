import React from 'react';
import logo from './logo.svg';
import './App.css';
import { parseChemicalFormula } from './chemicalFormula'
import ResultsList from './ResultsList';

class App extends React.Component {

  state = {
    results: {},
    isEmpty: false
  }

  componentDidMount() {
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
    let formula = this.input.value.trim();
    if (formula === "")
      this.setState({isEmpty: true})
    else {
      this.setState({
        isEmpty: false,
        results: parseChemicalFormula(formula),
      });
    }
  }

  render() {
    console.log(this.state.results);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="App-input" ref={c => this.input = c} type="text" placeholder="Enter your formula here"/>
          <div className="App-error">
            {this.state.isEmpty && <p>Empty formula</p>}
          </div>
          <button className="App-button" type="submit" onClick={this.onSubmit}>OK</button>
          <div className="App-results">
            {this.state.results !== {} && <ResultsList results={this.state.results}/>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
