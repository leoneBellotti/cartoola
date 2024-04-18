<template>
    <div class="w-full h-full mb-12 pb-12">
        <Loading :isLoading="isLoading" />
        <div class="mt-8">
            <div class="absolute pt-4 pl-8 hand">
                <router-link to="/inboxFornecedor">
                    <span class="text-xl"><i class="fa-solid fa-chevron-left pr-2"></i>  Voltar</span>
                </router-link>
            </div>
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <h1 class="titulo text-3xl">Detalhes do pedido</h1>
                    <p class="subTitulo text-xl">Acompanhe os detalhes do pedido</p>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center h-full bg-gray-50 p-8">
            <div class="bg-white rounded-3xl w-4/5 border-gray-300 border-2 flex items-center flex-col">
                <div class="flex w-full">
                    <div class="w-1/2 text-left">   
                        <div class="text-left w-full pl-16 py-3">
                            <h2 class="roboto-medium mb-3">Status do pedido</h2>
                            <div class="flex">
                                <div class="bg-[#2C99DD] rounded-full h-6 w-36 text-center text-white mb-2" v-if="pedidoIn.status == 'PENDENTE'" >Novo Pedido</div>
                                <div class="bg-[#8500AD] rounded-full h-6 w-36 text-center text-white mb-2" v-if="pedidoIn.status == 'EM_ANDAMENTO'" >Em Produção</div>
                                <div class="bg-[#DA9227] rounded-full h-6 w-36 text-center text-white mb-2" v-if="pedidoIn.status == 'EM_TRANSITO'" >Em transito</div>
                                <div class="bg-[#287A43] rounded-full h-6 w-36 text-center text-white mb-2" v-if="pedidoIn.status == 'ENTREGUE'" >Concluido</div>
                                <div class="bg-[#B42626] rounded-full h-6 w-36 text-center text-white mb-2" v-if="pedidoIn.status == 'CANCELADO'" >Cancelado</div>
                                <template v-if="dataPedidoEhAnterior(pedidoIn.data_entrega_prevista.slice(0, 10))">
                                    <div class="bg-[#B42626] rounded-full h-6 w-36 text-center text-white mb-2 ml-4">Atrasado</div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 text-right flex"  v-if="pedidoIn.status != 'ENTREGUE'">
                        <div class="w-full  flex flex-col justify-center items-center text-right" v-if="pedidoIn.status == 'EM_ANDAMENTO'">
                            <div class="w-full text-left mt-6">
                                <span class="roboto-medium">Número nota fiscal*</span>
                            </div>
                            <div class="w-full text-left mt-4">
                                <input type="text" v-model="num_nota" class="border-gray-200 border-2 rounded-2xl py-3 px-5 w-11/12">
                            </div>
                            <div class="w-full text-left ml-2">
                                <span class="text-[#FF0000] text-xs roboto-regular">*Campo obrigatório</span>
                            </div>
                        </div>
                        <div v-else class="block h-40 w-80 p-20 mr-10"></div>
                        <div class="border-l-2 h-5/6 mt-5 mx-6" v-if="pedidoIn.status == 'EM_ANDAMENTO'"></div>
                        <div class="w-full flex flex-col justify-center items-center text-left">
                            <div class="w-full mb-4">
                                <span class="roboto-medium">O pedido está pronto para ser enviado?</span>
                            </div>
                            <div class="w-full">
                                <input type="button" 
                                       :disabled="!isBotaoDisabled" 
                                       @click="isOpen = true"
                                       class="py-3 px-6 rounded-2xl bg-[#3ABBC6]  text-white hover:bg-teal-500" 
                                       :class="{ 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed': !isBotaoDisabled, 'hand': isBotaoDisabled }"
                                       value="Sim, avançar">
                            </div>
                        </div>
                    </div>
                </div>            
                <hr class="w-11/12">
                <div class="text-left w-full pl-16 py-3 flex flex-col">
                    <div class="mb-4">
                        <p class="roboto-medium text-xl">Informações do pedido</p>
                    </div>
                    <div class="mb-4">
                        <span>Cartório:</span><span class="text-gray-400 ml-2">{{ pedidoIn.localizacao }}</span>
                    </div>
                    <div class="flex mb-4">
                        <div class="mr-3 w-1/4">
                            <span>Nr do pedido:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.num_pedido }}</span>
                        </div>
                        <div class="mr-3 w-1/4">
                            <span>Tipo de papel:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.tipo_papel }}</span>
                        </div>
                        <div class="mr-3 w-1/4">
                            <span>Data pedido:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.data_solicitacao.slice(0, 10) }}</span>
                        </div>
                        <div class="mr-3 w-1/4">
                            <span>Data prevista de entrega:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.data_entrega_prevista.slice(0, 10) }}</span>
                        </div>
                    </div>
                    <div class="flex mb-4">
                        <div class="mr-3 w-1/4">
                            <span>Quantidade:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.quantidade }}</span>
                        </div>
                        <div class="mr-3">
                            <span>Nr do papel:</span>
                            <span class="text-gray-400 ml-2"> De: {{ pedidoIn.num_papel_inicial }} até: {{ pedidoIn.num_papel_final }}</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span>Valor do milheiro:</span>
                        <span class="text-gray-400 ml-2">{{ pedidoIn.valor_milheiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
                    </div>
                    <div class="mb-4">
                        <span>Valor total:</span>
                        <span class="text-gray-400 ml-2">{{ pedidoIn.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
                    </div>
                </div>
                <hr class="w-11/12">
                <div class="text-left w-full pl-16 py-3">
                    <div class="mb-4">
                        <p class="roboto-medium text-xl">Informações do cartório</p>
                    </div>
                    <div class="mb-4 flex-col">
                        <div>
                            <span>Solicitado por:</span>
                        </div>
                        <div class="flex">
                            <i class="fa-solid fa-circle-user text-gray-500 text-2xl"></i>
                            <span class="text-gray-400 ml-2 mt-1">{{ pedidoIn.nome_solictante }}</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span>Endereço:</span>
                        <span class="text-gray-400 ml-2">{{ pedidoIn.endereco_solictante }}</span>
                    </div>
                    <div class="flex mb-4">
                        <div class="mr-3 w-1/4">
                            <span>Cep:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.cep_solictante }}</span>
                        </div>
                        <div class="mr-3 w-1/4">
                            <span>Cidade:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.cidade_solictante }}</span>
                        </div>
                        <div class="mr-3 w-1/4">
                            <span>UF:</span>
                            <span class="text-gray-400 ml-2">{{ pedidoIn.uf_solictante }}</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span>Telefone:</span>
                        <span class="text-gray-400 ml-2">({{ pedidoIn.ddd_solictante }})&nbsp;&nbsp;{{ pedidoIn.telefone_solictante }}</span>
                    </div>
                </div>
                <hr class="w-11/12">
                <div class="text-left w-full pl-16 py-3">
                    <div class="mb-2">
                        <p class="roboto-medium text-xl">Autorizados Infopel:</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4" v-for="autorizado in autorizadosInfopel" :key="autorizado.id">
                        <div class="flex items-center">
                            <i class="fa-solid fa-circle-user text-gray-500 text-2xl"></i>
                            <span class="text-gray-400 ml-2">{{ autorizado.nome }}</span>
                        </div>
                    </div>
                </div> 
                <hr class="w-11/12">
                <div class="text-left w-full pl-16 py-3">
                    <div class="mb-4">
                        <p class="roboto-medium text-xl">Outros:</p>
                    </div>
                    <button class="p-4 m-4 rounded-2xl hover:bg-teal-600 bg-[#25AFB9] text-white">Download Excel</button>
                    <button class="p-4 m-4 rounded-2xl hover:bg-teal-600 hover:text-white text-[#25AFB9] border-[#25AFB9] border-2">Download CSV</button>
                </div> 
            </div>
        </div>
        <transition name="modal" appear>
            <div v-if="isOpen" class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div class="bg-white rounded-lg w-1/5 p-6 text-center">
                    <div class="w-full text-right">
                        <button @click="isOpen = false" class=""><i class="fa-solid fa-x"></i></button>
                    </div>
                    <h2 class="text-lg font-semibold mb-4 roboto-bold">{{ modalTitle }}</h2>
                    <div v-html="modalBody"></div>
                    <div class="w-full text-right mt-3">
                        <button @click="alterarStatusPedido" class="bg-[#25AFB9] text-white px-6 py-2 rounded-lg">Confirmar</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Loading from "../components/LoadingTela.vue";
    export default {
        props: ['pedido'],
        data() {
            return {
                isOpen: false,
                modalTitle: 'Confirmar alteração de status',
                modalBody: '',
                pedidoIn: [],
                autorizadosInfopel: [],
                num_nota:'',
				isLoading: false
            }
        },
        components: {
			Loading
        },
        computed: {
            isBotaoDisabled() {
                return (this.pedidoIn.status === 'EM_ANDAMENTO' && this.num_nota !== '' && !isNaN(this.num_nota)) || this.pedidoIn.status === 'PENDENTE' || this.pedidoIn.status === 'EM_TRANSITO';
            }
        },
        created() {
            if (this.pedido) {
                this.pedidoIn=JSON.parse(this.pedido);
                let message;
                switch (this.pedidoIn.status) {
                    case 'PENDENTE':
                        message = `Deseja alterar o pedido de <b>novo pedido</b> para <b>em produção</b>?
                                    <div class="flex items-center justify-center">
                                        <div class="rounded-full my-4 text-white px-3 bg-[#2C99DD]">Novo pedido</div>                                        
                                        <i class="fa-solid fa-arrow-right mx-3"></i>
                                        <div class="rounded-full my-4 text-white px-3 bg-[#8500AD]">Em produção</div>
                                    </div>
                                    <hr/>
                                  `;
                        break;
                    case 'EM_ANDAMENTO':
                        message = `Deseja alterar o pedido de <b>em produção</b> para <b>em transito</b>?
                                    <div class="flex items-center justify-center">
                                        <div class="rounded-full my-4 text-white px-3 bg-[#8500AD]">Em produção</div>
                                        <i class="fa-solid fa-arrow-right mx-3"></i>
                                        <div class="rounded-full my-4 text-white px-3 bg-[#DA9227]">Em transito</div>                                        
                                    </div>
                                    <hr/>
                                  `;
                        break;
                    case 'EM_TRANSITO':
                        message = `Deseja alterar o pedido de <b>em transito</b> para em <b>entregue</b>?
                                    <div class="flex items-center justify-center">
                                        <div class="rounded-full my-4 text-white px-3 bg-[#DA9227]">Em transito</div> 
                                        <i class="fa-solid fa-arrow-right mx-3"></i>
                                        <div class="rounded-full my-4 text-white px-3 bg-[#287A43]">Entregue</div>
                                    </div>
                                    <hr/>
                                  `;
                        break;
                    default:
                        message = `Imposivel alterar status atual.`;
                }
                this.modalBody=message;
            } else {
                alert('Pedido invalido.');
                this.$router.push('/');
            }
        },
        methods: {
            async alterarStatusPedido() {
                try {
                    this.isLoading = true;
                    switch (this.pedidoIn.status) {
                        case 'PENDENTE':
                            this.atualizarPedidoAndamento();
                            break;
                        case 'EM_ANDAMENTO':
                            this.atualizarPedidoEmTransito();
                            break;
                        case 'EM_TRANSITO':
                            this.atualizarPedidoEntregue();
                            break;
                        default:
                            // Trate aqui o caso de status inválido
                            this.isLoading = false;
                            break;
                    }                    
                } catch (error) {
                    console.error('Erro ao alterar status:', error);
                    this.isLoading = false;
                }
            },
            async fetchAutorizadosInfopel() {
                try {
                    this.isLoading = true;
                    const id = 2;
                    const response = await fetch(`${window.backURL}autorizadosInfopel/${id}`);
                    if (!response.ok) {
                        throw new Error('Não foi possível obter os autorizados do Infopel.');
                    }
                    const data = await response.json();
                    this.autorizadosInfopel=data;
                    this.isLoading = false;
                } catch (error) {
                    console.error('Erro ao buscar os autorizados do Infopel:', error);
                    this.isLoading = false;
                }
            },
            async adicionarPedidoMilheiro() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        usuario_sessao_id: 1,
                        cartorio_id: 2,
                        milheiro_id: 789,
                        quantidade: 10
                    };
                    const response = await fetch(window.backURL+'adicionarPedidoMilheiro', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao adicionar pedido.');
                    }
                    const data = await response.json();
                    console.log('Resposta ao adicionar pedido:', data);
                    this.isLoading = false;
                   
                } catch (error) {
                    console.error('Erro ao adicionar pedido:', error);
                    this.isLoading = false;
                }
            },
            async atualizarPedidoCancelado() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        usuario_sessao_id: 1,
                        pedido_papel_seg_id: this.pedidoIn.id
                    };
                    const response = await fetch(window.backURL+'atualizarPedidoCancelado', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar pedido cancelado.');
                    }
                    const data = await response.json();
                    console.log('Resposta ao atualizar pedido cancelado:', data);
                    this.isLoading = false;
                   
                } catch (error) {
                    console.error('Erro ao atualizar pedido cancelado:', error);
                    this.isLoading = false;
                }
            },
            async atualizarPedidoEntregue() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        usuario_sessao_id: 1,
                        pedido_papel_seg_id: this.pedidoIn.id
                    };
                    const response = await fetch(window.backURL+'atualizarPedidoEntregue', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar pedido entregue.');
                    }
                    // const data = await response.json();
                    // console.log(response);
                    this.isLoading = false;
                    this.$router.push('/inboxFornecedor');
                   
                } catch (error) {
                    console.error('Erro ao atualizar pedido entregue:', error);
                    this.isLoading = false;
                }
            },
            async atualizarPedidoEmTransito() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        usuario_sessao_id: 1,
                        pedido_papel_seg_id: this.pedidoIn.id,
                        num_nota_fiscal: this.num_nota
                    };
                    const response = await fetch(window.backURL+'atualizarPedidoEmTransito', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar pedido entregue.');
                    }
                    // const data = await response.json();
                    // console.log(response);
                    this.isLoading = false;
                    this.$router.push('/inboxFornecedor');
                   
                } catch (error) {
                    console.error('Erro ao atualizar pedido entregue:', error);
                    this.isLoading = false;
                }
            },
            async atualizarPedidoAndamento() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        usuario_sessao_id: 1,
                        pedido_papel_seg_id: this.pedidoIn.id
                    };
                    const response = await fetch(window.backURL+'atualizarPedidoAndamento', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar pedido entregue.');
                    }
                    this.isLoading = false;
                    this.$router.push('/inboxFornecedor');
                   
                } catch (error) {
                    console.error('Erro ao atualizar pedido entregue:', error);
                    this.isLoading = false;
                }
            },
            async retornarProximoMilheiro() {
                try {
                    this.isLoading = true;
                    const requestData = {
                        cartorio_id: 2,
                        quantidade: 10
                    };
                    const response = await fetch(window.backURL+'retornarProximoMilheiro', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao retornar próximo milheiro.');
                    }
                    const data = await response.json();
                    console.log('Resposta ao retornar próximo milheiro:', data);
                    this.isLoading = false;
                   
                } catch (error) {
                    console.error('Erro ao retornar próximo milheiro:', error);
                    this.isLoading = false;
                }
            },
            dataPedidoEhAnterior(dataString) {
                const dataPedido = new Date(dataString);
                const hoje = new Date();
                return dataPedido < hoje;
            }         
        },
        mounted() {
            this.fetchAutorizadosInfopel();
        },
    };
</script>

<style>
    .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s;
    }
    .modal-enter, .modal-leave-to {
    opacity: 0;
    }
</style>