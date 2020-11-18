import React, { Component } from 'react';
/*import api from './services/api';*/
import moment from 'moment';
import ChartUsuariosMes from './components/ChartUsuariosMes';
import ChartCasamentoMes from './components/ChartCasamentoMes';

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
    let mes = moment().days(0);
    console.log(mes);
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
      </div>
    );
  }
}
