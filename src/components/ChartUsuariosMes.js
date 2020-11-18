import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
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
                                      label: 'Usuários Criados',
                                      data: mensais,
                                      backgroundColor: ['rgb(234,128,121,1)', 'rgb(104,191,183)', 'rgb(24,86,81)',
                                                        'rgb(231,46,86)', 'rgb(154,14,222)', 'rgb(233,152,9)',
                                                        'rgb(57,164,246)', 'rgb(255, 99, 132)', 'rgb(50, 10, 100)',
                                                        'rgb(10, 100, 100)', 'rgb(10, 100, 2)', 'rgb(120, 25, 170)']
                                   }]
                        }
        })

    }

    render(){
        return (
            <div>
                <Container>
                <HorizontalBar
                  data={this.state.chartData}
                  options={{



                      title: {
                          display: true,
                          text: 'Usuários',
                          fontSize: 25
                      },
                      legend:{
                          display: true,
                          position:'top',

                      }
                  }}
                />
                </Container>
            </div>
        ); 
    }
}