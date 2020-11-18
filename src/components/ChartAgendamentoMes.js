import React, {Component, Fragment} from 'react';
import {Bar} from 'react-chartjs-2';
import api from '../services/api';
import moment from 'moment';
import { Container } from './styles';
import Axios from "axios";

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

        if ( status !== "todos" && categoria !== "todos") {
            for (let mes = 1; mes <= 12; mes++) {
              agendamento.map(ag => {     
                if ((moment(ag.BEGINS_AT).isSame(`${ano}-${mes}`, 'month')) && (ag.STATUS == status)
                    && (ag.VENDOR_CATEGORY == categoria)) {
                      ++results[mes - 1];
                }           
              })
            }
        } else if (status == "todos" && categoria != "todos") {
            for (let mes = 1; mes <= 12; mes++) {
              agendamento.map(ag => {     
                if ((moment(ag.BEGINS_AT).isSame(`${ano}-${mes}`, 'month')) && (ag.VENDOR_CATEGORY == categoria)) {
                      ++results[mes - 1];
                }           
              })
            } 
        } else if ( status != "todos" && categoria == "todos" ) {
            for (let mes = 1; mes <= 12; mes++) {
              agendamento.map(ag => {     
                if ((moment(ag.BEGINS_AT).isSame(`${ano}-${mes}`, 'month')) && (ag.STATUS == status)) {
                      ++results[mes - 1];
                }           
              })
            } 
        } else {
            for (let mes = 1; mes <= 12; mes++) {
              agendamento.map(ag => {     
                if ((moment(ag.BEGINS_AT).isSame(`${ano}-${mes}`, 'month'))) {
                      ++results[mes - 1];
                }           
              })
            } 
        }

        this.setState({
            chartData: {
                         labels: meses,
                         datasets: [{
                                      label: `Agendamentos Totais`,
                                      data: results,
                                      backgroundColor: ['rgb(231,46,86)', 'rgb(231,46,86)', 'rgb(231,46,86)',
                                                        'rgb(231,46,86)', 'rgb(231,46,86)', 'rgb(231,46,86)',
                                                        'rgb(231,46,86)', 'rgb(231,46,86)', 'rgb(231,46,86)',
                                                        'rgb(231,46,86)', 'rgb(231,46,86)', 'rgb(231,46,86)'

                                      ],
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
                  <option value="todos">Todos</option>
                  <option value="CREATED">Criados</option>
                  <option value="CANCELED">Cancelados</option>
                  <option value="CONFIRMED">Confirmados</option>
                  <option value="VISITED">Visitados</option>
                </select>
                <select id="categoria" onChange={this.handleCategoria}>
                    <option value="" selected>Categoria</option>
                    <option value="todos">Todas</option>
                    <option value="assessoria-de-casamento">Assessoria de Casamento</option>
                    <option value="buffet">Buffet</option>
                    <option value="espaco">Espaço</option>
                    <option value="foto-e-filmagem">Foto e Filmagem</option>
                    <option value="lista-de-presentes">Lista de Presentes</option>
                </select>
                <Bar
                  data={this.state.chartData}
                  options={{

                      title: {
                          display: true,
                          text: 'Agendamentos',
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