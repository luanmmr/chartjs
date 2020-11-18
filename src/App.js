import React, { Component } from 'react';
/*import api from './services/api';*/
import moment from 'moment';
import ChartUsuariosMes from './components/ChartUsuariosMes';
import ChartCasamentoMes from './components/ChartCasamentoMes';
import ChartAgendamentoMes from './components/ChartAgendamentoMes';
import ChartVendasMes from './components/ChartVendasMes';

export default class App extends Component {
  /*constructor(props){
    super(props);
      this.state = {
      users: [],
      weddings: [],
      appointments: [],
      invoices: []
    } 
  }*/
  componentDidMount(){

  }
  /*
  async componentDidMount(){
    const [users, weddings, appointments, invoices] = await Promise.all([
      api.get("/user").then(resp => resp.data),
      api.get("/wedding").then(resp => resp.data),
      api.get("/appointment").then(resp => resp.data),
      api.get("/invoice").then(resp => resp.data)
    ]);
    this.setState({
      users: users,
      weddings: weddings,
      appointments: appointments,
      invoices: invoices  
    });
  }*/

  render () {
    /* const { users, weddings, appointments, invoices } = this.state; */
    return (
      <div className="App">
        <ChartUsuariosMes /*users={users}*/ />
        <ChartCasamentoMes />
        <ChartAgendamentoMes />
        <ChartVendasMes />
      </div>
    );
  }
}
