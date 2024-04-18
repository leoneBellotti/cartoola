<template>
    <div class="">
		<Loading :isLoading="isLoading" />
		<div class="flex justify-center items-center mt-8">
			<div class="text-center">
				<h1 class="titulo text-3xl">Infopel - Fornecedor</h1>
				<p class="subTitulo text-xl">Acompanhe e gerencie os seus pedidos</p>
			</div>
		</div>
		<div class="flex justify-between px-40 my-4 ">
			<div>
				<div class="flex justify-between space-x-3">
					<div class="relative items-center align-middle">
						<input type="text" v-model="termoBusca" placeholder="Busque por pedido" class="mt-5 pl-10 pr-3 py-2 rounded-full border-2 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:ring focus:ring-indigo-300">
						<div class="absolute inset-y-0 top-5 left-0 pl-3 flex items-center pointer-events-none">
							<i class="fas fa-search text-gray-500"></i>
						</div>
					</div>
				</div>
			</div>
			<div>
				<!-- itens a esquerda da tela -->
				<div class="flex justify-between space-x-3">
					<div>
						<button @click="btnVerConcluidos=!btnVerConcluidos" 
										class="mt-5 py-1 px-4 text-gray-700 rounded-lg border-2"
										:class="{ 'bgAzul text-white': btnVerConcluidos, 'bg-white': !btnVerConcluidos }">
										Ver pedidos concluídos
										<span v-if="btnVerConcluidos">
												<i class="pl-3 fa-solid fa-xmark"></i>
										</span>
						</button>
					</div>
					<div>
						<div class="text-xs text-gray-600 mb-1">Selecionar data</div>
						<VueDatePicker v-model="date" range multi-calendars placeholder="Data inicial / Data final" :teleport="true" :enable-time-picker="false" locale="br"  select-text="Selecionar"  cancel-text="Cancelar"></VueDatePicker>
					</div>
					<div>
						<div class="text-xs text-gray-600 mb-1" v-if="!btnVerConcluidos">Visualizar status</div>
						<select v-model="ordenarPorstatus" @change="mostrarPorStatus" v-if="!btnVerConcluidos" class="pl-2 pr-8 py-2 rounded-full border-2 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:ring focus:ring-indigo-300">
							<option value="todos">Todos</option>
							<option value="novos">Novos pedidos</option>
							<option value="producao">Em produção</option>
							<option value="transito">Em trânsito</option>
							<option value="atrasado">Atrasado</option>
						</select>
					</div>
					<div class="h-9 w-0.5 bg-gray-200 mt-5"></div>
					<button class="w-10 h-10 border-2 flex justify-center items-center rounded-lg mt-5 transition duration-300 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-white"
						:class="{ 'bgAzul text-white border-white': isBotao1Clicked, 'text-gray-400 bg-white border-gray-300': !isBotao1Clicked }"
						@click="toggleBotao1">
						<i class="fa-brands fa-microsoft"></i>
					</button>
					<button class="w-10 h-10 border-2 flex justify-center items-center rounded-lg mt-5 transition duration-300 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-white"
						:class="{ 'bgAzul text-white border-white': isBotao2Clicked, 'text-gray-400 bg-white border-gray-300': !isBotao2Clicked }"
						@click="toggleBotao2">
						<i class="fa-solid fa-table-list"></i>
					</button>
				</div>
			</div>
		</div>
		<div v-if="!temPedidos" class="flex item-center justify-center w-full">
			<div class="border-2 border-gray-200 min-h-96 w-2/4 rounded-3xl p-6 my-8 text-center py-20">
				<div class="flex justify-center">
					<img src="../assets/img/semPedidos.png" class="h-80">
				</div>
				<p class="roboto-medium4">Não foi encontrado nenhum pedido com essa busca!</p>
			</div>
		</div>
		<div v-else class="bg-gray-100 h-full w-full flex justify-center p-8">
			<div v-if="btnVerConcluidos" class="flex flex-col w-full mx-32">
				<div class="border-b-2 mb-8 pb-6">
					<h1 class="titulo text-2xl roboto-medium"><i class="fa-solid fa-check"></i> Pedidos Concluidos</h1>
				</div>
				<div v-for="(pedido,index) in pedidosConcluidosFiltrados" :key="pedido.id">
					<template v-if="index === 0 || getMonthYear(pedido.data_solicitacao) !== getMonthYear(pedidosConcluidosFiltrados[index - 1].data_solicitacao)">
						<h2 class="roboto-medium text-xl ml-3">{{ formatMonthYear(pedido.data_solicitacao) }}</h2>
					</template>
					<CardPedido :pedido="pedido" />
				</div>
			</div>
			<div v-else class="flex justify-center mt-4 w-full">
					<div v-if="isBotao1Clicked" class="flex space-x-20 w-full justify-center px-28">
							<div class="w-full" v-if="divNovos">
								<h1 class="titulo ml-2 mb-2 text-xl">
									<i class="mr-2 fa-regular fa-file-lines"></i>
									Novos pedidos 
									<span class="text-gray-400 font-normal ml-4">5</span>
								</h1>
								<div  v-for="pedido in pedidosNovosFiltrados" :key="pedido.id" id="retPedidosNovos">
									<CardPedido :pedido="pedido" />
								</div>
							</div>
							<div class="w-full" v-if="divProducao">
								<h1 class="titulo ml-2 mb-2 text-xl">
									<i class="mr-2 fa-regular fa-clock"></i>
									Em produção 
									<span class="text-gray-400 font-normal ml-4">2</span>
								</h1>
								<div  v-for="pedido in pedidosEmProducaoFiltrados" :key="pedido.id" id="retPedidosProducao">
										<CardPedido :pedido="pedido" />
								</div>
							</div>
							<div class="w-full" v-if="divTransito">
								<h1 class="titulo ml-2 mb-2 text-xl">
									<i class="mr-2 fa-solid fa-truck"></i>
									Em trânsito 
									<span class="text-gray-400 font-normal ml-4">4</span>
								</h1>
								<div  v-for="pedido in pedidosEmTransitoFiltrados" :key="pedido.id" id="retPedidosTransito">
										<CardPedido :pedido="pedido" />
								</div>
							</div>
					</div>
					<div v-else>
						<button class="ms-0 px-4 py-1 m-4 rounded-2xl hover:bg-[#D4F0F2] hover:text-[#25AFB9] bg-[#25AFB9] text-white border-[#25AFB9] border-2" @click="exportToPDF">Download PDF</button>
						<button class="px-4 py-1 m-4 rounded-2xl hover:bg-[#D4F0F2] hover:text-[#25AFB9] text-[#25AFB9] border-[#25AFB9] border-2" @click="exportToCSV">Download CSV</button>
						<button class="px-4 py-1 m-4 rounded-2xl hover:bg-[#D4F0F2] hover:text-[#25AFB9] bg-[#25AFB9] text-white border-[#25AFB9] border-2" @click="generateExcel">Download Excel</button>
						<table class="min-w-full divide-y divide-gray-200  rounded-t-lg overflow-hidden">
							<thead class="bg-gray-700 text-white">
								<tr>
									<th scope="col" @click="ordenarPor('cartorio')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cartório <i v-if="colunaOrdenada === 'cartorio'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('num_pedido')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pedido <i v-if="colunaOrdenada === 'num_pedido'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('tipo_papel')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo de papel <i v-if="colunaOrdenada === 'tipo_papel'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('valor_total')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor total <i v-if="colunaOrdenada === 'valor_total'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('estado')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">UF <i v-if="colunaOrdenada === 'estado'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('cidade')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cidade <i v-if="colunaOrdenada === 'cidade'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('data_solicitacao')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data/hora <i v-if="colunaOrdenada === 'data_solicitacao'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" @click="ordenarPor('status')" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status <i v-if="colunaOrdenada === 'status'" :class="ordemAscendente ? 'fa-solid fa-sort-down' : 'fa-solid fa-sort-up'"></i></th>
									<th scope="col" class="hand hover:text-gray-400 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr v-for="pedido in filtrarPedidosPorStatus" :key="pedido.id">
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.cartorio }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.num_pedido  }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.tipo_papel }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })  }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.estado }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.cidade }}</td>
									<td class="px-6 py-4 whitespace-nowrap">{{ pedido.data_solicitacao }}</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="rounded-full text-center text-white roboto-medium px-3 h-6" 
											:class="{
											'bg-[#8500AD]': (pedido.status === 'EM_ANDAMENTO'),
											'bg-[#CC8C33]': (pedido.status === 'EM_TRANSITO'),
											'bg-[#B42626]': ( pedido.status === 'CANCELADO'),
											'bg-[#2C99DD]': pedido.status === 'PENDENTE',
											'bg-[#287A43]': pedido.status === 'ENTREGUE',
										}">
											{{ traduzirStatus(pedido.status) }}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<router-link :to="{ name: 'Pedido', params: { id: pedido.id, pedido: JSON.stringify(pedido) } }">
											<i class="fa-solid fa-chevron-right hand"></i>
										</router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
			</div>
		</div>
    </div>
</template>

<script>
    import CardPedido from "../components/CardPedido.vue";
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';
	import { ref } from 'vue';
	import Loading from "../components/LoadingTela.vue";
	import jsPDF from 'jspdf';
	import 'jspdf-autotable';
	import ExcelJS from 'exceljs';

	const date = ref();
		
    export default {
        components: {
            CardPedido,
			VueDatePicker,
			Loading
        },
        data() {
            return {
                btnVerConcluidos:false,
                termoBusca: "",
                temPedidos:true,
                pedidos: [],
                ordenarPorstatus: 'todos',
				divNovos: true,
				divProducao: true,
				divTransito: true,
				isBotao1Clicked: true,
				isBotao2Clicked: false,
				date: null,
				colunaOrdenada: null,
				ordemAscendente: true,
				isLoading: false
            };
        },
        computed:{
			pedidosConcluidosFiltrados() {
				const pedidosFiltrados = this.pedidos.filter(pedido => {
					return this.filtrarPorStatusEData(pedido, 'ENTREGUE', 'CANCELADO');
				});
				return pedidosFiltrados;
			},
			pedidosNovosFiltrados() {
				const pedidosFiltrados = this.pedidos.filter(pedido => {
					return this.filtrarPorStatusEData(pedido, 'PENDENTE') && this.filtroPorTermoDeBusca(pedido);
				});
				return pedidosFiltrados;
			},
			pedidosEmProducaoFiltrados() {
				const pedidosFiltrados = this.pedidos.filter(pedido => {
					return this.filtrarPorStatusEData(pedido, 'EM_ANDAMENTO') && this.filtroPorTermoDeBusca(pedido);
				});
				return pedidosFiltrados;
			},
			pedidosEmTransitoFiltrados() {
				const pedidosFiltrados = this.pedidos.filter(pedido => {
					return this.filtrarPorStatusEData(pedido, 'EM_TRANSITO') && this.filtroPorTermoDeBusca(pedido);
				});
				return pedidosFiltrados;
			},
			todosPedidosFiltrados() {
				const pedidosIn = [
					...this.pedidosConcluidosFiltrados,
					...this.pedidosNovosFiltrados,
					...this.pedidosEmProducaoFiltrados,
					...this.pedidosEmTransitoFiltrados
				];
				if (!this.date) {
					return this.pedidos;
				} else {
					const startDate = this.date[0];
					const endDate = this.date[1];
					return pedidosIn.filter(pedido => {
						const pedidoDateParts = pedido.data_solicitacao.split(' - ');
						const dataParts = pedidoDateParts[0].split('/');
						const horaParts = pedidoDateParts[1].split(':');
						const pedidoDate = new Date(dataParts[2], dataParts[1]-1, dataParts[0], horaParts[0], horaParts[1]);
						if (!endDate) {
							pedidoDate.setHours(0, 0, 0, 0);
							startDate.setHours(0, 0, 0, 0);
							return pedidoDate.getTime() == startDate.getTime();
						} else {
							return pedidoDate >= startDate && pedidoDate <= endDate;
						}
					});
				}
			},
			pedidosFiltradosOrdenados() {
				const pedidosFiltrados = this.todosPedidosFiltrados;
				if (this.colunaOrdenada) {
					return pedidosFiltrados.sort((a, b) => {
					const valorA = a[this.colunaOrdenada];
					const valorB = b[this.colunaOrdenada];
					if (valorA === valorB) return 0;
					if (this.ordemAscendente) {
						return valorA < valorB ? -1 : 1;
					} else {
						return valorA > valorB ? -1 : 1;
					}
					});
				} else {
					return pedidosFiltrados;
				}
			},
			filtrarPedidosPorStatus() {
				if (!this.ordenarPorstatus) {
					return this.pedidosFiltradosOrdenados;
				} else {
					switch(this.ordenarPorstatus) {
						case 'todos':
							return this.pedidosFiltradosOrdenados;
						case 'novos':
							const filtradoPorStatusN = this.pedidosFiltradosOrdenados.filter(pedido => ['PENDENTE'].includes(pedido.status));
							return filtradoPorStatusN;
						case 'producao':
							const filtradoPorStatusP = this.pedidosFiltradosOrdenados.filter(pedido =>  ['EM_ANDAMENTO'].includes(pedido.status))
							return filtradoPorStatusP;
						case 'transito':
							const filtradoPorStatusT = this.pedidosFiltradosOrdenados.filter(pedido =>  ['EM_TRANSITO'].includes(pedido.status))
							return filtradoPorStatusT;
						default:
							console.error('Status inválido:',this.ordenarPorstatus);
							return this.pedidosFiltradosOrdenados;
					}
				}
			},
        },
        methods: {
            async fetchPedidos() {
                try {
					this.isLoading = true;
                    const idCart=2;
                    const response = await fetch(window.backURL+'pedidosInfopel/'+idCart);
                    if (!response.ok) {
                        throw new Error('Não foi possível obter os pedidos.');
                    }
                    const data = await response.json();
                    this.pedidos = data;
                    this.controleQtdPedidos();
                } catch (error) {
                    console.error('Erro ao buscar os pedidos:', error);
					this.isLoading = false;
                }
            },
			filtrarPorStatusEData(pedido, ...statusPermitidos) {
				const statusValido = statusPermitidos.includes(pedido.status);
				if (!statusValido) return false;

				if (!this.date || !this.date[0]) return true;

				const startDate = this.date[0];
				const endDate = this.date[1];
				const pedidoDateParts = pedido.data_solicitacao.split(' - ');
				const dataParts = pedidoDateParts[0].split('/');
				const horaParts = pedidoDateParts[1].split(':');
				const pedidoDate = new Date(dataParts[2], dataParts[1]-1, dataParts[0], horaParts[0], horaParts[1]);
				if (!endDate) {
					pedidoDate.setHours(0, 0, 0, 0);
					startDate.setHours(0, 0, 0, 0);
					return pedidoDate.getTime() === startDate.getTime();
				} else {
					return pedidoDate >= startDate && pedidoDate <= endDate;
				}
			},
			ordenarPor(coluna) {
				this.isLoading = true;
				if (this.colunaOrdenada === coluna) {
					this.ordemAscendente = !this.ordemAscendente;
				} else {
					this.colunaOrdenada = coluna;
					this.ordemAscendente = true;
				}
				this.isLoading = false;
			},
            filtroPorTermoDeBusca(pedido) {
				this.isLoading = true;
                const termo = this.termoBusca;
                const pedidosFiltrados = (
                    (typeof pedido.cartorio === 'string' && pedido.cartorio.includes(termo)) ||
                    (typeof pedido.localizacao === 'string' && pedido.localizacao.includes(termo)) ||
                    (typeof pedido.status === 'string' && pedido.status.includes(termo)) ||
                    (typeof pedido.tipo_papel === 'string' && pedido.tipo_papel.includes(termo)) ||
                    (typeof pedido.estado === 'string' && pedido.estado.includes(termo)) ||
                    (typeof pedido.cidade === 'string' && pedido.cidade.includes(termo)) ||
                    (typeof pedido.data_solicitacao === 'string' && pedido.data_solicitacao.includes(termo)) ||
                    (typeof pedido.valor_total === 'string' && pedido.valor_total.includes(termo))
                );
                const pedidosFiltradosNumeros = (
                    (typeof pedido.num_pedido === 'number' && pedido.num_pedido.toString().includes(termo)) ||
                    (typeof pedido.num_pedido === 'number' && pedido.num_pedido==termo) ||
                    (typeof pedido.valor_total === 'number' && pedido.valor_total.toString().includes(termo)) ||
                    (typeof pedido.valor_total === 'number' && pedido.valor_total==termo)
                );
				this.isLoading = false;

                return pedidosFiltrados || pedidosFiltradosNumeros;
            },
            controleQtdPedidos() {
				this.isLoading = true;
                const totalPedidosTela=this.pedidosNovosFiltrados.length+this.pedidosEmTransitoFiltrados.length+this.pedidosEmProducaoFiltrados.length+this.pedidosConcluidosFiltrados.length;
                if(totalPedidosTela == 0) {
                    this.temPedidos=false;
                } else{
                    this.temPedidos=true;
                }
				this.isLoading = false;
                return;
            },
            onTermoBuscaChange(newValue, oldValue) {
				this.isLoading = true;
                this.controleQtdPedidos();
            },
            mostrarPorStatus() {
				this.isLoading = true;
				if (this.ordenarPorstatus === 'todos' || this.ordenarPorstatus === 'atrasado') {
					this.divNovos = true;
					this.divProducao = true;
					this.divTransito = true;
				} else if (this.ordenarPorstatus === 'novos') {
					this.divNovos = true;
					this.divProducao = false;
					this.divTransito = false;
				} else if (this.ordenarPorstatus === 'producao') {
					this.divNovos = false;
					this.divProducao = true;
					this.divTransito = false;
				} else if (this.ordenarPorstatus === 'transito') {
					this.divNovos = false;
					this.divProducao = false;
					this.divTransito = true;
				}
				if(this.ordenarPorstatus === 'atrasado'){
					document.querySelectorAll('.cardPedido').forEach(div => {
						if (div.classList.contains('cardAtrasado')) {
							div.style.display = 'block';
						} else {
							div.style.display = 'none';
						}
					});
				} else {
					document.querySelectorAll('.cardPedido').forEach(div => {
						div.style.display = 'block';
					});
				}
				this.isLoading = false;
            },
			toggleBotao1() {
				this.isBotao1Clicked = !this.isBotao1Clicked;
				if (this.isBotao1Clicked) {
					this.isBotao2Clicked = false; // Garantindo que apenas um botão seja selecionado
				}
			},
			toggleBotao2() {
				this.isBotao2Clicked = !this.isBotao2Clicked;
				if (this.isBotao2Clicked) {
					this.isBotao1Clicked = false; // Garantindo que apenas um botão seja selecionado
				}
			},
			traduzirStatus(status) {
				switch (status) {
					case 'EM_ANDAMENTO':
						return 'Em Produção';
					case 'PENDENTE':
						return 'Novo Pedido';
					case 'ENTREGUE':
						return 'Entregue';
					case 'EM_TRANSITO':
						return 'Em transito';
					case 'REJEITADO':
						return 'Rejeitado';
					case 'CANCELADO':
						return 'Cancelado';
					default:
						return status;
				}
			},
			getMonthYear(dateStr) {
				const parts = dateStr.split('/');
				if (parts.length >= 2) {
					const secondItem = parts[1];
					return secondItem;
				}
				return;
			},
			formatMonthYear(dateStr) {
				const parts = dateStr.split('/');
				const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
				if (parts.length >= 3) {
					const month = months[parseInt(parts[1])];
					const year = parts[2].slice(0,4);
					return `${month} de ${year}`;
				}
				return;
			},
			exportToCSV() {
				if (!this.filtrarPedidosPorStatus || this.filtrarPedidosPorStatus.length === 0) {
					console.error('Nenhum dado disponível para exportar.');
					return;
				}

				const headers = Object.keys(this.filtrarPedidosPorStatus[0]);

				const data = this.filtrarPedidosPorStatus.map(pedido => {
					return headers.map(header => pedido[header]);
				});

				let csvContent = 'data:text/csv;charset=utf-8,';
				csvContent += headers.join(',') + '\n';
				data.forEach(row => {
					csvContent += row.join(',') + '\n';
				});

				const encodedUri = encodeURI(csvContent);
				const link = document.createElement('a');
				link.setAttribute('href', encodedUri);
				link.setAttribute('download', 'pedidos.csv');
				document.body.appendChild(link);
				link.click();
			},
			exportToPDF() {
				const doc = new jsPDF();

				const headers = ['Cartório', 'Pedido', 'Tipo de Papel', 'Valor Total', 'UF', 'Cidade', 'Data/Hora', 'Status'];
				const data = this.filtrarPedidosPorStatus.map(pedido => [
				pedido.cartorio,
				pedido.num_pedido,
				pedido.tipo_papel,
				pedido.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
				pedido.estado,
				pedido.cidade,
				pedido.data_solicitacao,
				this.traduzirStatus(pedido.status)
				]);

				doc.autoTable({
				head: [headers],
				body: data
				});

				doc.save(`export-pedidos-${new Date().toISOString()}.pdf`);
			},
			
			async generateExcel() {
				const workbook = new ExcelJS.Workbook();
				const worksheet = workbook.addWorksheet('Pedidos');

				// Adiciona cabeçalhos
				worksheet.addRow(['Cartório', 'Pedido', 'Tipo de Papel', 'Valor Total', 'UF', 'Cidade', 'Data/Hora', 'Status']);

				// Adiciona dados
				this.filtrarPedidosPorStatus.forEach(pedido => {
					worksheet.addRow([
					pedido.cartorio,
					pedido.num_pedido,
					pedido.tipo_papel,
					pedido.valor_total,
					pedido.estado,
					pedido.cidade,
					pedido.data_solicitacao,
					pedido.status
					]);
				});

				// Salva o arquivo
				const buffer = await workbook.xlsx.writeBuffer();
				const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
				const filename = 'pedidos.xlsx';

				// Cria um link para download
				const link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = filename;

				// Clica no link para iniciar o download
				document.body.appendChild(link);
				link.click();

				// Remove o link após o download
				document.body.removeChild(link);
				}
        },
        mounted() {
            this.fetchPedidos();
			const startDate = new Date();
			const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
			date.value = [startDate, endDate];
        },
        watch: {
            termoBusca(newValue, oldValue) {
                this.onTermoBuscaChange(newValue, oldValue);
            },
        },
    };
</script>

<style scoped>
</style>
  