<template>
  <div class="flex justify-center items-top h-screen">
      <div class="h-4/6 w-full overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                  <template v-for="(item, index) in tableData" :key="'row-' + item.id">
                      <tr>
                          <td class="px-6 py-4 whitespace-nowrap cursor-pointer" @click="toggleInfo(index)">
                              <div class="flex items-center">
                                  <img :src="item.escudos['45x45']" class="pr-4">
                                  {{ item.nome }}
                              </div>
                          </td>
                      </tr>
                      <tr v-if="selectedTime === index" :key="'details-' + item.id">
                          <td colspan="1">
                              <div class="p-4 bg-gray-100">
                                  <table class="min-w-full divide-y divide-gray-200">
                                      <thead class="bg-gray-50 sticky top-0">
                                      <tr>
                                          <th scope="col" @click="ordenarPor('nome')"  :class="{ 'bg-gray-200': colunaOrdenada === 'nome' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                              Apelido
                                              <span v-if="colunaOrdenada === 'nome'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
                                          </th>
                                          <th scope="col" @click="ordenarPor('posicao_id')" :class="{ 'bg-gray-200': colunaOrdenada === 'posicao_id' }" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                              POS
                                              <span v-if="colunaOrdenada === 'posicao_id'" class="ml-1">{{ ordemAscendente ? '▲' : '▼' }}</span>
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
                                      <tr v-for="atleta in filteredAtletas(item.id)" :key="atleta.atleta_id">
                                          <td class="px-6 py-4 whitespace-nowrap">{{ atleta.apelido }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">{{ getNomePosicao(atleta.posicao_id) }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">{{ atleta.jogos_num }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">{{ atleta.pontos_num }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">{{ atleta.media_num }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">{{ atleta.preco_num }}</td>
                                          <td class="px-6 py-4 whitespace-nowrap">
                                              <div class="flex items-center">
                                                  <div class="flex flex-col">
                                                      <span>Desempenho 2023: {{ calcularPontuacaoScout(getScout(atleta.atleta_id)) }}</span>
                                                      <span>Media 2023: {{ getMediaNum(atleta.atleta_id) }}</span>
                                                  </div>
                                              </div>
                                          </td>                                            
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </template>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import data from '../../json/2017/atletas/mercado/rodada38/mercado-rodada-38';
import axios from 'axios';

export default {
  name:'Home',
  components: {
  },
  data() {
      return {
          tableDados: [],
          tableData: [],
          tableAtletas: [],
          selectedAtleta: null,
          selectedTime: null,
          colunaOrdenada:null,
          ordemAscendente:true,
          posicoes:[],
          status:[]
      }
  },
  mounted() {
      this.buscaTimes();
      this.buscaDadosAtletas();
      this.ordenarPor('nome')
  },
  methods: {
      buscaDadosAtletas() {
          this.tableDados = data.atletas;
          this.loaded = true;
      },
      toggleInfo(index) {
          this.selectedTime = this.selectedTime === index ? null : index;
      },
      buscaTimes() {
          axios.get('https://api.cartola.globo.com/atletas/mercado')
          .then(response => {
              this.tableData = response.data.clubes;
              console.log(this.tableData)
              this.tableAtletas = response.data.atletas;
              this.posicoes = response.data.posicoes;
              this.status = response.data.status;
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
              this.tableAtletas.sort((a, b) => {
                  // Calcule a pontuação de desempenho para os atletas a e b
                  const pontuacaoA = this.calcularPontuacaoScout(this.getScout(a.atleta_id));
                  const pontuacaoB = this.calcularPontuacaoScout(this.getScout(b.atleta_id));

                  // Determine a ordem de classificação com base na pontuação de desempenho
                  if (pontuacaoA === pontuacaoB) {
                      return 0;
                  }
                  return this.ordemAscendente ? pontuacaoA - pontuacaoB : pontuacaoB - pontuacaoA;
              });
          } else {
              // Lógica de classificação padrão para outras colunas
              this.tableAtletas.sort((a, b) => {
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
