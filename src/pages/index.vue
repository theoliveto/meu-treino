<template>
  <v-card color="basil" class="pa-2 pa-sm-4">
    <v-card-title class="text-center justify-center py-4 py-sm-6">
      <h1 class="font-weight-bold text-h5 text-sm-h4 text-md-h3 text-basil">
        Meu Treino
      </h1>
    </v-card-title>

    <!-- Tabs -->
    <v-tabs v-model="tab" color="basil" grow show-arrows>
      <v-tab v-for="item in items" :key="item" :value="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <!-- Conteúdo -->
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card color="basil" flat class="mt-3">

          <!-- TÍTULO DO TREINO DO DIA -->
          <h2 class="text-center my-4 text-basil">
            {{ titulosTreino[item] }}
          </h2>

          <!-- MOBILE -->
          <div class="d-block d-md-none">
            <div
              v-if="(treinos[item] || []).length === 0"
              class="text-center py-6"
            >
              Nenhum treino cadastrado para {{ item }}.
            </div>

            <v-card
              v-for="(treino, index) in treinos[item]"
              :key="index"
              class="mb-3"
              rounded="lg"
              variant="elevated"
            >
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ treino.nome }}
              </v-card-title>

              <v-card-text class="pt-0">
                <div class="d-flex justify-space-between py-1">
                  <span class="text-medium-emphasis">Repetições</span>
                  <span class="font-weight-medium">{{ treino.repeticoes }}</span>
                </div>

                <div class="d-flex justify-space-between py-1">
                  <span class="text-medium-emphasis">Carga</span>
                  <span class="font-weight-medium">{{ treino.carga }}</span>
                </div>

                <div class="pt-2">
                  <v-btn
                    v-if="treino.video"
                    :href="treino.video"
                    target="_blank"
                    variant="tonal"
                    block
                  >
                    Ver demonstração
                  </v-btn>

                  <div
                    v-else
                    class="text-caption text-medium-emphasis text-center"
                  >
                    Sem link de demonstração
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- DESKTOP -->
          <div class="d-none d-md-block">
            <div class="table-wrap">
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-center">Treino</th>
                    <th class="text-center">Repetições</th>
                    <th class="text-center">Carga</th>
                    <th class="text-center">Demonstração</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="(treinos[item] || []).length === 0">
                    <td class="text-center py-6" colspan="4">
                      Nenhum treino cadastrado para {{ item }}.
                    </td>
                  </tr>

                  <tr v-for="(treino, index) in treinos[item]" :key="index">
                    <td class="text-center">{{ treino.nome }}</td>
                    <td class="text-center">{{ treino.repeticoes }}</td>
                    <td class="text-center">{{ treino.carga }}</td>
                    <td class="text-center">
                      <v-btn
                        v-if="treino.video"
                        :href="treino.video"
                        target="_blank"
                        size="small"
                        variant="tonal"
                      >
                        Ver
                      </v-btn>
                      <span
                        v-else
                        class="text-caption text-medium-emphasis"
                      >
                        —
                      </span>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        tab: 'Segunda',

        items: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],

        titulosTreino: {
          Segunda: 'Peito + Tríceps',
          Terça: 'Costas + Bíceps',
          Quarta: 'Quadríceps + Glúteo',
          Quinta: 'Ombros + Abdômen',
          Sexta: 'Posterior + Panturrilha'
        },

        treinos: {
          Segunda: [
            { nome: 'Supino Inclinado', repeticoes: '4x8', carga: '20kg', video: '' },
            { nome: 'Crucifixo Máquina', repeticoes: '3x12', carga: '20kg', video: '' },
            { nome: 'Tríceps Corda', repeticoes: '3x10', carga: '15kg', video: '' },
            { nome: 'Tríceps Testa', repeticoes: '3x10', carga: '15kg', video: '' },
            { nome: 'Tríceps Francês', repeticoes: '3x10', carga: '15kg', video: '' },
            { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '' },
            { nome: 'Esteira', repeticoes: '-', carga: '10min', video: '' }
          ],
          Terça: [
            { nome: 'Serrote', repeticoes: '4x8', carga: '30kg', video: '' },
            { nome: 'Pulldown (Polia)', repeticoes: '3x12', carga: '25kg', video: '' },
            { nome: 'Crucifixo Inverso Máquina', repeticoes: '3x12', carga: '15kg', video: '' },
            { nome: 'Bi-Set - Puxada Alta e Baixa', repeticoes: '3x8', carga: '25kg', video: '' },
            { nome: 'Rosca Martelo Alternada', repeticoes: '3x12', carga: '5kg', video: '' },
            { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '' },
            { nome: 'Bicicleta', repeticoes: '-', carga: '10min', video: '' }
          ],
          Quarta: [
            { nome: 'Agachamento Livre', repeticoes: '4x8', carga: '10kg', video: '' },
            { nome: 'Leg Press', repeticoes: '4x8', carga: '25kg', video: '' },
            { nome: 'Cadeira Extensora', repeticoes: '4x12', carga: '25kg', video: '' },
            { nome: 'Cadeira Abdutora', repeticoes: '4x12', carga: '30kg', video: '' },
            { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '' },
            { nome: 'Esteira', repeticoes: '-', carga: '10min', video: '' }
          ],
          Quinta: [
            { nome: 'Desenvolvimento Barra', repeticoes: '4x8', carga: '10kg', video: '' },
            { nome: 'Elevação Lateral Halter', repeticoes: '3x12', carga: '14kg', video: '' },
            { nome: 'Elevação Frontal Halter', repeticoes: '3x12', carga: '14kg', video: '' },
            { nome: 'Crucifixo inverso em pé', repeticoes: '3x12', carga: '14kg', video: '' },
            { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '' },
            { nome: 'Bicicleta', repeticoes: '-', carga: '10min', video: '' }
          ],
          Sexta: [
            { nome: 'Stiff Barra', repeticoes: '4x8', carga: '10kg', video: '' },
            { nome: 'Mesa Flexora', repeticoes: '4x12', carga: '25kg', video: '' },
            { nome: 'Panturrilha em Pé', repeticoes: '4x12', carga: '-', video: '' },
            { nome: 'Panturrilha Sentado', repeticoes: '4x20', carga: '15kg', video: '' },
            { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '' },
            { nome: 'Esteira', repeticoes: '-', carga: '10min', video: '' }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .bg-basil {
    background-color: #e6f0ff !important;
    color: #000 !important;
  }

  .text-basil {
    color: #3a3568 !important;
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 600px) {
    th, td {
      white-space: nowrap;
    }
  }
</style>
