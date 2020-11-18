import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';

export default class ChartAgendamentoMes extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: {
                labels: '',
                datasets: []
            },
            meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"],
            status: '',
            categoria: '',
            ano: ''
        }
    }

    async componentDidUpdate(){
        let agendamento = await api.get("/appointment").then(resp => resp.data);
        const { ano, meses, status, categoria } = this.state;
        let results = new Array(12);
        for (let i = 0; i < results.length; i++) {
            results[i] = 0;
        }
        for (let mes = 1; mes <= 12; mes++) {
          agendamento.map(ag => {
            if ((moment(ag.BEGINS_AT).isSame(`${ano}-${mes}`, 'month')) && (ag.STATUS == status)
                && (ag.VENDOR_CATEGORY == categoria)) {
                  ++results[mes - 1];
            }
          })
        }
        this.setState({
            chartData: {
                         labels: meses,
                         datasets: [{
                                      label: `Agendamentos`,
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

    handleStatus = e => {
      this.setState({
          status: e.target.value
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
                <select id="status" onChange={this.handleStatus}>
                  <option value="" selected>Status</option>
                  <option value="CREATED">Criados</option>
                  <option value="CANCELED">Cancelados</option>
                  <option value="CONFIRMED">Confirmados</option>
                  <option value="VISITED">Visitados</option>
                </select>
                <select id="categoria" onChange={this.handleCategoria}>
                    <option value="" selected>Categoria</option>
                    <option value="assessoria-de-casamento">Assessoria de Casamento</option>
                    <option value="buffet">Buffet</option>
                    <option value="espaco">Espaço</option>
                    <option value="foto-e-filmagem">Foto e Filmagem</option>
                    <option value="lista-de-presentes">Lista de Presentes</option>
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