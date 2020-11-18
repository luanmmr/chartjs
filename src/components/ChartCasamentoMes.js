import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';

export default class ChartCasamentoMes extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: {
                labels: '',
                datasets: []
            },
            mes: ''
        }
    }

    async componentDidUpdate(){
        let users = await api.get("/wedding").then(resp => resp.data);
        const { mes } = this.state;
        let estilo = [0, 0, 0];
        users.map(user => {
          if (moment(user.WEDDING_DATE).isSame(`${mes}`, 'month')){
                if (user.STYLE == 'classico') {
                    ++estilo[0];
                }else if (user.STYLE == 'moderno') {
                    ++estilo[1];
                } else {
                    ++estilo[2];
                }
          }
        })
        this.setState({
            chartData: {
                         labels: ["Clássico", "Moderno", "Rústico"],
                         datasets: [{
                                      label: `Casamentos ${mes}`,
                                      data: estilo,
                                      backgroundColor: ['rgb(255, 99, 132)', 'rgb(50, 10, 100)', 'rgb(10, 100, 100)',
                                                        'rgb(10, 100, 170)', 'rgb(120, 25, 170)', 'rgb(180, 120, 10)',
                                                        'rgb(1, 120, 10)', 'rgb(255, 99, 132)', 'rgb(50, 10, 100)',
                                                        'rgb(10, 100, 100)', 'rgb(10, 100, 2)', 'rgb(120, 25, 170)']
                                   }]
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
                <input type="month" placeholder="Ex: 2020-08" onChange={this.handleMes} />
                <Bar
                  data={this.state.chartData}
                  options={{ maintainAspectRatio: false }}
                />
                </Container>
            </div>
        ); 
    }
}