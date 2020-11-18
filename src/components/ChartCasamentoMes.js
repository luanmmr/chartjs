import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
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
        let casamento = await api.get("/wedding").then(resp => resp.data);
        const { mes } = this.state;
        let estilo = [0, 0, 0];
        casamento.map(csm => {
          if (moment(csm.WEDDING_DATE).isSame(`${mes}`, 'month')){
                if (csm.STYLE == 'classico') {
                    ++estilo[0];
                }else if (csm.STYLE == 'moderno') {
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
                                      label: `Período ${mes}`,
                                      data: estilo,
                                      backgroundColor: ['rgb(255, 99, 132)', 'rgb(50, 10, 100)', 'rgb(10, 100, 100)']
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
                <Doughnut
                  data={this.state.chartData}
                  options={{
                      title: {
                          display: true,
                          text: 'Estilos Casamento',
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
