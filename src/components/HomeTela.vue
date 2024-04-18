<template>
    <div class="flex justify-center items-top h-screen">
        <div class="h-4/6 w-full overflow-y-auto">
            <div class="flex">
                <div class="flex justify-center items-center space-x-4 p-4 bg-white">
                    <button @click="filtroStatus(7)" class="p-2 rounded-full bg-green-500">
                        <svg class="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 12l-8 8-4-4 1.5-1.5L12 16l6.5-6.5L18 10z" />
                        </svg>
                    </button>
                    <button @click="filtroStatus(3)" class="p-2 rounded-full bg-red-500">
                        <svg class="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V7h2v1z" />
                        </svg>
                    </button>
                    <button @click="filtroStatus(5)" class="p-2 rounded-full bg-yellow-500">
                        <svg class="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12v5h2V8h-2zm0 6v2h2v-2h-2z" />
                        </svg>
                    </button>
                    <!-- Adicione mais botões conforme necessário -->
                </div>
                <div class="flex justify-center items-center space-x-4 p-4 bg-white">
                    <button @click="filtroPosicao(1)" class="p-2 rounded-full bg-gray-200">
                        Gol
                    </button>
                    <button @click="filtroPosicao(2)" class="p-2 rounded-full bg-gray-200">
                        Lat
                    </button>
                    <button @click="filtroPosicao(3)" class="p-2 rounded-full bg-gray-200">
                        Zag
                    </button>
                    <button @click="filtroPosicao(4)" class="p-2 rounded-full bg-gray-200">
                        Mei
                    </button>
                    <button @click="filtroPosicao(5)" class="p-2 rounded-full bg-gray-200">
                        Ata
                    </button>
                    <button @click="filtroPosicao(6)" class="p-2 rounded-full bg-gray-200">
                        Tec
                    </button>
                </div>
                <div class="flex flex-col justify-center items-center space-x-4 p-4 bg-white">
                    <i v-if="this.mercado.status_mercado === 1" class="fas fa-check-circle text-green-500 text-2xl ms-3"></i>
                    <i v-else class="fas fa-times-circle text-red-500 text-2xl ms-3"></i>
                    <span v-if="this.mercado.status_mercado === 1" class="flex flex-col text-center">
                        <small>Mercado Aberto</small>
                        <small>{{ formatarTempo(this.mercado.fechamento) }}</small>
                    </span>
                    <small v-else>Mercado Fechado</small>
                </div>
                <div class="flex">
                    <div v-for="jogo in partidas.partidas" :key="jogo.partida_id" class="rounded-3xl border-2 m-2 p-1">
                        <div class="flex pt-4">
                            <img :src="this.tableData[jogo.clube_casa_id].escudos['30x30']" alt="" class="self-center">
                            <span class="pt-1 px-2 text-xl">X</span>
                            <img :src="this.tableData[jogo.clube_visitante_id].escudos['30x30']" alt="" class="self-center">
                        </div>
                        <div class="flex pt-2" v-if="jogo.placar_oficial_mandante">
                            <div class="w-1/3 text-center">
                                {{ jogo.placar_oficial_mandante }}
                            </div>
                            <div class="w-1/3 text-center">
                                X
                            </div>
                            <div class="w-1/3 text-center">
                                {{ jogo.placar_oficial_visitante }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" @click="ordenarPor('nome')"  :class="{ 'bg-gray-200': colunaOrdenada === 'nome' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Apelido
                            <span v-if="colunaOrdenada === 'nome'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('status_id')" :class="{ 'bg-gray-200': colunaOrdenada === 'status_id' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Status
                            <span v-if="colunaOrdenada === 'status_id'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('jogos_num')" :class="{ 'bg-gray-200': colunaOrdenada === 'jogos_num' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Jogos
                            <span v-if="colunaOrdenada === 'jogos_num'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('pontos_num')" :class="{ 'bg-gray-200': colunaOrdenada === 'pontos_num' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Pontos
                            <span v-if="colunaOrdenada === 'pontos_num'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('media_num')" :class="{ 'bg-gray-200': colunaOrdenada === 'media_num' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Media
                            <span v-if="colunaOrdenada === 'media_num'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('preco_num')" :class="{ 'bg-gray-200': colunaOrdenada === 'preco_num' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Preco
                            <span v-if="colunaOrdenada === 'preco_num'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                        <th scope="col" @click="ordenarPor('pontuacaoDesempenho')" :class="{ 'bg-gray-200': colunaOrdenada === 'pontuacaoDesempenho' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                            Estatísticas
                            <span v-if="colunaOrdenada === 'pontuacaoDesempenho'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="atleta in tableAtletasFiltrados" :key="atleta.atleta_id">
                        <td class="px-6 py-4 whitespace-nowrap flex items-center">
                            <div class="flex-col items-center text-center me-3 justify-center">
                                <img v-if="this.tableData && this.tableData[atleta.clube_id] && this.tableData[atleta.clube_id].escudos" 
                                :src="this.tableData[atleta.clube_id].escudos['45x45']" 
                                alt=""
                                class="self-center">
                                {{ this.tableData[atleta.clube_id].abreviacao }}
                            </div>
                            <div class="flex flex-col me-3">
                                <b>{{ atleta.apelido }}</b>
                                <small>{{ getNomePosicao(atleta.posicao_id) }}</small>
                                <small>{{ atleta.jogos_num }} Jogos</small>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center"><span :class="getStatusIconClass(atleta.status_id)"></span></td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ atleta.jogos_num }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ atleta.pontos_num }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ atleta.media_num }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex flex-col">
                                <span>R$ {{ atleta.preco_num }}</span>
                                <span>
                                    var.: <span :class="{'text-green-500': atleta.variacao_num >= 0, 'text-red-500': atleta.variacao_num < 0}">{{ atleta.variacao_num }}</span> 
                                </span>
                            </div>
                             
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex flex-col">
                                    <span>Pont. min. p. val.:{{calcularMinParaValorizar(atleta)}}</span>
                                    <span v-if="calcularPontuacaoScout(atleta.scout)">Desempenho Atual: {{ calcularPontuacaoScout(atleta.scout) }}</span>
                                    <span v-if="calcularPontuacaoScout(getScout(atleta.atleta_id))">Desempenho 2023: {{ calcularPontuacaoScout(getScout(atleta.atleta_id)) }}</span>
                                    <span v-if="getMediaNum(atleta.atleta_id)">Media 2023: {{ getMediaNum(atleta.atleta_id) }}</span>
                                </div>
                            </div>
                        </td>                                            
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import data from '../../json/2017/atletas/mercado/rodada38/mercado-rodada-38';
import axios from 'axios';

export default {
    name:'HomeTela',
    components: {
    },
    data() {
        return {
            tableDados: [],
            tableData: [],
            tableAtletas: [],
            tableAtletasFiltrados: [],
            mercado: [],
            filtroStatusVal: null,
            selectedAtleta: null,
            selectedTime: null,
            colunaOrdenada:null,
            ordemAscendente:true,
            posicoes:[],
            status:[],
            partidas:[],
            tempoRestante: 0
        }
    },
    mounted() {
        this.buscaTimes();
        this.buscaDadosAtletas();
        this.ordenarPor('preco_num');

    },
    methods: {
        atualizarTempoRestante() {
        const agora = new Date().getTime() / 1000;
        const fechamentoTimestamp = this.mercado.fechamento.timestamp;
        this.tempoRestante = fechamentoTimestamp - agora;
        },
        formatarTempo(tempo) {
        const minutos = tempo.minuto;
        const horas = tempo.hora;
        const dias = tempo.dia;

        return `${dias}d ${horas}h ${minutos}m`;
        },
        calcularMinParaValorizar(atleta) {            
            const { jogos_num, pontos_num, preco_num, rodada_id } = atleta;
            let totalPontos = 0;
            let totalJogadores = this.tableAtletas.length;            
            for (let i = 0; i < totalJogadores; i++) {
                totalPontos += this.tableAtletas[i].pontos_num;
            }            
            let mediaPontosTotal = totalPontos / totalJogadores;            
            const minJogos = rodada_id; 
            const minPontosParaValorizar = mediaPontosTotal; 
            const aumentoMinimo = 0.5;             
            const mediaPontos = pontos_num / jogos_num;            
            if (jogos_num >= minJogos && mediaPontos >= minPontosParaValorizar) {
                
                const minParaValorizar = preco_num * aumentoMinimo;
                return minParaValorizar.toFixed(2);
            } else {
                
                return 0;
            }
        },
        filtroPosicao(posId) {
            if (posId === null && this.filtroStatusVal === null) {
                this.tableAtletasFiltrados = this.tableAtletas;
            } else if (posId !== null && this.filtroStatusVal !== null) {
                this.tableAtletasFiltrados = this.tableAtletas.filter(atleta => atleta.posicao_id === posId && atleta.status_id === this.filtroStatusVal);
            } else if (posId !== null) {
                this.tableAtletasFiltrados = this.tableAtletas.filter(atleta => atleta.posicao_id === posId);
            } else if (this.filtroStatusVal !== null) {
                this.tableAtletasFiltrados = this.tableAtletas.filter(atleta => atleta.status_id === this.filtroStatusVal);
            }
        },
        filtroStatus(statusId) {
            this.filtroStatusVal=statusId;
            this.tableAtletasFiltrados = this.tableAtletas.filter(atleta => atleta.status_id === statusId);
        },
        getStatusIconClass(statusId) {
            switch (statusId) {
                case 2: // Dúvida
                    return 'far fa-question-circle text-yellow-500 text-xl'; // Ícone de interrogação com cor amarela
                case 3: // Suspenso
                    return 'fas fa-exclamation-circle text-red-500 text-xl'; // Ícone de exclamação com cor vermelha
                case 5: // Contundido
                    return 'fas fa-band-aid text-red-500 text-xl'; // Ícone de band-aid com cor vermelha
                case 6: // Nulo
                    return 'fas fa-circle text-gray-500 text-xl'; // Ícone de círculo com cor cinza
                case 7: // Provável
                    return 'fas fa-check-circle text-green-500 text-xl'; // Ícone de marca de seleção com cor verde
                default:
                    return '';
            }
        },
        buscaDadosAtletas() {
            this.tableDados = data.atletas;
            this.loaded = true;
        },
        toggleInfo(index) {
            this.selectedTime = this.selectedTime === index ? null : index;
        },
        buscaTimes() {
            axios.get('https://threedtback.onrender.com/cartola')
            .then(response => {
                this.tableData = response.data.clubes;
                this.tableAtletas = response.data.atletas;
                this.tableAtletasFiltrados=response.data.atletas;
                this.posicoes = response.data.posicoes;
                this.status = response.data.status;
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
            axios.get('https://threedtback.onrender.com/mercadoStatus')
            .then(response => {
                this.mercado = response.data;
                this.atualizarTempoRestante();
                setInterval(this.atualizarTempoRestante, 1000);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
            axios.get('https://threedtback.onrender.com/partidas')
            .then(response => {
                this.partidas = response.data;
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
        },
        filteredAtletas(id) {
            let atletasFiltrados =  this.tableAtletas.filter(atleta => atleta.clube_id === id);
            if (this.colunaOrdenada) {
                atletasFiltrados.sort((a, b) => {
                let valorA = a[this.colunaOrdenada];
                let valorB = b[this.colunaOrdenada];
                if (typeof valorA === 'string' && typeof valorB === 'string') {
                    valorA = valorA.toLowerCase();
                    valorB = valorB.toLowerCase();
                }
                if (this.ordemAscendente) {
                    return valorA > valorB ? 1 : -1;
                } else {
                    return valorA < valorB ? 1 : -1;
                }
            });
            }
            return atletasFiltrados;
        },
        getNomePosicao(posicao_id) {
            const posicao = this.posicoes[posicao_id];
            return posicao ? posicao.nome : '';
        },
        ordenarPor(coluna) {
            if (this.colunaOrdenada === coluna) {
                this.ordemAscendente = !this.ordemAscendente;
            } else {
                this.colunaOrdenada = coluna;
                this.ordemAscendente = true;
            }
            if (coluna === 'pontuacaoDesempenho') {
                this.tableAtletasFiltrados.sort((a, b) => {
                    // Calcule a pontuação de desempenho para os atletas a e b
                    const pontuacaoA = this.calcularPontuacaoScout(a.scout);
                    const pontuacaoB = this.calcularPontuacaoScout(b.scout);

                    // Determine a ordem de classificação com base na pontuação de desempenho
                    if (pontuacaoA === pontuacaoB) {
                        return 0;
                    }
                    return this.ordemAscendente ? pontuacaoA - pontuacaoB : pontuacaoB - pontuacaoA;
                });
            } else {
                // Lógica de classificação padrão para outras colunas
                this.tableAtletasFiltrados.sort((a, b) => {
                    // Determine a ordem de classificação com base na coluna selecionada
                    const valorA = a[coluna];
                    const valorB = b[coluna];
                    if (valorA === valorB) {
                        return 0;
                    }
                    return this.ordemAscendente ? valorA - valorB : valorB - valorA;
                });
            }
        },
        getScout(atleta_id) {
            const atleta = this.tableDados.find(item => item.atleta_id === atleta_id);
            return atleta ? atleta.scout : {};
        },
        calcularPontuacaoScout(scout) {
            const valores = {
                RB: 3,
                PE: -1,
                SG: 5,
                CA: -2,
                A: 4,
                FS: 1,
                I: -1,
                FF: 2,
                FD: 1,
                G: 6,
                FC: -1
            };

            let pontuacaoTotal = 0;

            for (const [chave, valor] of Object.entries(scout)) {
                if (valores[chave]) {
                    pontuacaoTotal += valor * valores[chave];
                }
            }

            return pontuacaoTotal;
        },
        getMediaNum(atleta_id) {
            if (this.tableDados && this.tableDados) {
                const tableDadosAtleta = this.tableDados.find(atleta => atleta.atleta_id === atleta_id);
                if (tableDadosAtleta) {
                    return tableDadosAtleta.media_num;
                }
            }
            return null;
        },
    }
};
</script>

<style scoped>
</style>
