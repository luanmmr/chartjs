import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';

export default class ChartUsuariosDia extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: '',
            mes: ''
        }
    }

    async componentDidMount(){
        let users = await api.get("/user").then(resp => resp.data);
        const { mes } = this.state;
        users.map(user => {
          if (moment(user.CREATED_AT).isSame(`${2020}-${mes}`, 'month')){
                
          }
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <div>
                <Container>
                <select id="mes" onChange={this.handleMes}>
                  <option value="" selected>Mês</option>
                  <option value="0">Janeiro</option>
                  <option value="1">Fevereiro</option>
                  <option value="2">Março</option>
                </select>
                <Pie
                  data={this.state.chartData}
                  options={{ maintainAspectRatio: false }}
                />
                </Container>
            </div>
        ); 
    }
}