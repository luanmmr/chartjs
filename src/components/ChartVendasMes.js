import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';

export default class ChartVendasMes extends Component {
    constructor(props){
        super(props);
        let m = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"];
        this.state = {
            meses: m,
            chartData: {
                labels: m,
                datasets: [{
                              label: "Vendas",
                              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                              backgroundColor: ['rgb(255, 99, 132)', 'rgb(50, 10, 100)', 'rgb(10, 100, 100)',
                                                'rgb(10, 100, 170)', 'rgb(120, 25, 170)', 'rgb(180, 120, 10)',
                                                'rgb(1, 120, 10)', 'rgb(255, 99, 132)', 'rgb(50, 10, 100)',
                                                'rgb(10, 100, 100)', 'rgb(10, 100, 2)', 'rgb(120, 25, 170)']
                          }]
            },
            categoria: '',
            ano: ''
        }
    }

    async componentDidUpdate(){
        let vendas = await api.get("/invoice").then(resp => resp.data);
        const { ano, meses, categoria } = this.state;
        let results = new Array(12);
        for (let i = 0; i < results.length; i++) {
            results[i] = 0;
        }

        if ( categoria !== "todas") {
            for (let mes = 1; mes <= 12; mes++) {
              vendas.map(vd => {     
                if ((moment(vd.CREATED_AT).isSame(`${ano}-${mes}`, 'month')) && (vd.VENDOR_CATEGORY == categoria)) { 
                      results[mes - 1] += parseFloat(vd.AMOUNT.toFixed(2)) - parseFloat(vd.VENDOR_AMOUNT.toFixed(2));
                }           
              })
            }
        } else {
            for (let mes = 1; mes <= 12; mes++) {
              vendas.map(vd => {     
                if ((moment(vd.CREATED_AT).isSame(`${ano}-${mes}`, 'month'))) {
                      results[mes - 1] += parseFloat(vd.AMOUNT.toFixed(2)) - parseFloat(vd.VENDOR_AMOUNT.toFixed(2));
                }           
              })
            } 
        }

        this.setState({
            chartData: {
                         labels: meses,
                         datasets: [{
                                      label: `Vendas`,
                                      data: results,
                                      backgroundColor: ['rgb(255, 99, 132)', 'rgb(50, 10, 100)', 'rgb(10, 100, 100)',
                                                        'rgb(10, 100, 170)', 'rgb(120, 25, 170)', 'rgb(180, 120, 10)',
                                                        'rgb(1, 120, 10)', 'rgb(255, 99, 132)', 'rgb(50, 10, 100)',
                                                        'rgb(10, 100, 100)', 'rgb(10, 100, 2)', 'rgb(120, 25, 170)']
                                   }]
                        }
        })
    }

    handleAno = e => {
        this.setState({
            ano: e.target.value
        })
    }

    handleCategoria = e => {
      this.setState({
          categoria: e.target.value
      })
    }

    render(){
        return (
            <div>
                <Container>
                <input type="number" placeholder="Ex: 2020" onChange={this.handleAno} />
                <select id="categoria" onChange={this.handleCategoria}>
                  <option value="" selected>Escolha...</option>
                  <option value="todas">Todas</option>
                  <option value="espaco">Espaço</option>
                  <option value="assessoria-de-casamento">Assessoria de Casamento</option>
                  <option value="mobiliario">Mobiliário</option>
                  <option value="decoracao-cenografia">Decoração-Cenografia</option>
                  <option value="buffet">Buffet</option>
                  <option value="servico-de-bar-bartender">Serviço de Bartender</option>
                  <option value="banda">Banda</option>
                  <option value="som-iluminacao">Som-Iluminação</option>
                  <option value="brinde-lembrancinhas">Brinde-Lembrancinhas</option>
                  <option value="foto-e-filmagem">Foto e Filmagem</option>
                  <option value="bolos-doces">Bolos DOces</option>
                  <option value="dj">Dj</option>
                  <option value="coral-orquestra">Coral-Orquestra</option>
                  <option value="aluguel-de-carro">Aluguel de carro</option>
                </select>
                <Bar
                  data={this.state.chartData}
                  options={{ maintainAspectRatio: false }}
                />
                </Container>
            </div>
        ); 
    }
}