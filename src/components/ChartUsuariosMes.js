import React, { Component } from 'react';
import {  Pie } from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';

export default class ChartUsuariosMes extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: '',
            meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
                    "Outubro", "Novembro", "Dezembro"],
        }
    }

    async componentDidMount(){
        let users = await api.get("/user").then(resp => resp.data);

        let total = 0;
        let mensais = [];
        for (let mes = 1; mes <= 12; mes++) {
                users.map(user => {
                if (moment(user.CREATED_AT).isSame(`${2020}-${mes}`, 'month')){
                    total++;
                }
                return 0;
            })
            mensais = [ ...mensais, total];
            total = 0;
        }
        this.setState({
            chartData: {
                         labels: this.state.meses,
                         datasets: [{
                                      label: 'Criados no Mês',
                                      data: mensais,
                                      backgroundColor: ['rgb(255, 99, 132)', 'rgb(50, 10, 100)', 'rgb(10, 100, 100)',
                                                        'rgb(10, 100, 170)', 'rgb(120, 25, 170)', 'rgb(180, 120, 10)',
                                                        'rgb(1, 120, 10)', 'rgb(255, 99, 132)', 'rgb(50, 10, 100)',
                                                        'rgb(10, 100, 100)', 'rgb(10, 100, 2)', 'rgb(120, 25, 170)']
                                   }]
                        }
        })

    }

    render(){
        return (
            <div>
                <Container>
                <Pie
                  data={this.state.chartData}
                  options={{ maintainAspectRatio: false }}
                />
                </Container>
            </div>
        ); 
    }
}