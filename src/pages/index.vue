<template>
  <v-card color="basil" class="pa-2 pa-sm-4">
    <v-card-title class="text-center justify-center py-4 py-sm-6">
      <div class="w-100">
        <h1 class="font-weight-bold text-h5 text-sm-h4 text-md-h3 text-basil">Meu Treino</h1>
        <div class="text-caption text-medium-emphasis mt-1">{{ dataAtualFormatada }}</div>
      </div>
    </v-card-title>

    <v-tabs v-model="tab" color="basil" grow show-arrows>
      <v-tab v-for="item in items" :key="item" :value="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card color="basil" flat class="mt-3">
          <h2 class="text-center my-4 text-basil">{{ titulosTreino[item] }}</h2>

          <div class="d-block d-md-none">
            <div class="d-flex ga-2 px-2 mb-3">
              <v-btn block variant="tonal" prepend-icon="mdi-check-all" @click="concluirTudoDoDia(item)">Concluir tudo</v-btn>
              <v-btn block variant="tonal" prepend-icon="mdi-refresh" @click="desmarcarTudoDoDia(item)">Desmarcar </v-btn>
            </div>

            <div v-if="(treinos[item] || []).length === 0" class="text-center py-6">Nenhum treino cadastrado para {{ item }}.</div>

            <v-card v-for="(treino, index) in treinos[item]" :key="index" class="mb-3" rounded="lg" variant="elevated" :class="{ 'card-concluido': !!treino.concluido }">
              <v-card-title class="d-flex align-center justify-space-between">
                <span class="text-subtitle-1 font-weight-bold">{{ treino.nome }}</span>
                <v-checkbox v-model="treino.concluido" density="compact" hide-details label="Concluído" class="ml-2" @update:modelValue="salvarConclusoes()" />
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
                  <v-btn v-if="treino.video && getEmbedUrl(treino.video)" variant="tonal" block prepend-icon="mdi-play-circle-outline" @click="abrirVideo(treino.video)">Ver demonstração</v-btn>
                  <div v-else class="text-caption text-medium-emphasis text-center">Sem link de demonstração</div>
                </div>
              </v-card-text>
            </v-card>
          </div>

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
                    <td class="text-center py-6" colspan="4">Nenhum treino cadastrado para {{ item }}.</td>
                  </tr>

                  <tr v-for="(treino, index) in treinos[item]" :key="index">
                    <td class="text-center">{{ treino.nome }}</td>
                    <td class="text-center">{{ treino.repeticoes }}</td>
                    <td class="text-center">{{ treino.carga }}</td>
                    <td class="text-center">
                      <v-btn v-if="treino.video" :href="treino.video" target="_blank" size="small" variant="tonal">Ver</v-btn>
                      <span v-else class="text-caption text-medium-emphasis">—</span>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

    <v-dialog v-model="dialogVideo" transition="dialog-bottom-transition">
      <v-card class="video-dialog-card">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Demonstração</span>
          <v-btn icon="mdi-close" variant="text" @click="fecharVideo" />
        </v-card-title>

        <v-card-text class="video-dialog-body">
          <div class="video-container" :class="{ shorts: isShortsVideo }">
            <iframe
              v-if="videoEmbedAtual"
              :src="videoEmbedAtual"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 'Segunda',

      items: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],

      titulosTreino: {
        Segunda: 'Peito + Ombros + Tríceps',
        Terça: 'Unilateral + Cardio',
        Quarta: 'Costas + Bíceps',
        Quinta: 'Unilateral + Cardio',
        Sexta: 'Leg Day'
      },

      treinos: {
        Segunda: [
          { nome: 'Supino Inclinado', repeticoes: '4x8', carga: '20kg', video: '', concluido: false },
          { nome: 'Crucifixo Máquina', repeticoes: '3x12', carga: '20kg', video: '', concluido: false },
          { nome: 'Elevação Lateral Halter', repeticoes: '3x12', carga: '14kg', video: '', concluido: false },
          { nome: 'Elevação Frontal Halter', repeticoes: '3x12', carga: '14kg', video: '', concluido: false },
          { nome: 'Crucifixo inverso em pé', repeticoes: '3x12', carga: '14kg', video: '', concluido: false },
          { nome: 'Tríceps Corda', repeticoes: '3x10', carga: '15kg', video: '', concluido: false },
          { nome: 'Tríceps Testa', repeticoes: '3x10', carga: '15kg', video: '', concluido: false },
          { nome: 'Tríceps Francês', repeticoes: '3x10', carga: '15kg', video: '', concluido: false },
          { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '', concluido: false },
        ],
        Terça: [
          { nome: 'Afundo', repeticoes: '3x12', carga: '5kg', video: '', concluido: false },
          { nome: 'Avanço', repeticoes: '3x12', carga: '5kg', video: '', concluido: false },
          { nome: 'Agachamento Livre', repeticoes: '3x12', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Toque no Ombro)', repeticoes: '60s', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Abdominal)', repeticoes: '3x12', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Parada)', repeticoes: '60s', carga: '', video: '', concluido: false },
          { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '', concluido: false },
          { nome: 'Cardio (Bicicleta + Esteira)', repeticoes: '', carga: '', video: '', concluido: false },
        ],
        Quarta: [
          { nome: 'Serrote', repeticoes: '4x8', carga: '30kg', video: '', concluido: false },
          { nome: 'Pulldown (Polia)', repeticoes: '3x12', carga: '25kg', video: '', concluido: false },
          { nome: 'Crucifixo Inverso Máquina', repeticoes: '3x12', carga: '15kg', video: '', concluido: false },
          { nome: 'Bi-Set - Puxada Alta e Baixa', repeticoes: '3x8', carga: '25kg', video: '', concluido: false },
          { nome: 'Rosca Martelo Alternada', repeticoes: '3x12', carga: '5kg', video: '', concluido: false },
          { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '', concluido: false },
        ],
        Quinta: [
          { nome: 'Afundo', repeticoes: '3x12', carga: '5kg', video: '', concluido: false },
          { nome: 'Avanço', repeticoes: '3x12', carga: '5kg', video: '', concluido: false },
          { nome: 'Agachamento Livre', repeticoes: '3x12', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Toque no Omrbo)', repeticoes: '60s', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Abdominal)', repeticoes: '3x12', carga: '', video: '', concluido: false },
          { nome: 'Prancha (Parada)', repeticoes: '60s', carga: '', video: '', concluido: false },
          { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '', concluido: false },
          { nome: 'Cardio (Bicicleta + Esteira)', repeticoes: '', carga: '', video: '', concluido: false },
        ],
        Sexta: [
          { nome: 'Agachamento Livre', repeticoes: '4x8', carga: '10kg', video: '', concluido: false },
          { nome: 'Leg Press', repeticoes: '4x8', carga: '25kg', video: '', concluido: false },
          { nome: 'Cadeira Extensora', repeticoes: '4x12', carga: '25kg', video: '', concluido: false },
          { nome: 'Stiff Barra', repeticoes: '4x8', carga: '10kg', video: '', concluido: false },
          { nome: 'Mesa Flexora', repeticoes: '4x12', carga: '25kg', video: '', concluido: false },
          { nome: 'Cadeira Abdutora', repeticoes: '4x12', carga: '30kg', video: '', concluido: false },
          { nome: 'Cadeira Adutora', repeticoes: '4x12', carga: '30kg', video: '', concluido: false },
          { nome: 'Panturrilha Sentado', repeticoes: '4x20', carga: '15kg', video: '', concluido: false },
          { nome: 'Abdominal', repeticoes: '60x', carga: '-', video: '', concluido: false },
        ],
      },

      storageKey: '',

      dialogVideo: false,
      videoEmbedAtual: '',
      isShorts: false,
    }
  },
  computed: {
    dataAtualFormatada() {
      const hoje = new Date()
      return hoje.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    },
    isShortsVideo() {
      return this.videoEmbedAtual.includes('/embed/') && this.videoEmbedAtual.includes('short')
    }
  },
  mounted() {
    this.storageKey = this.getStorageKeyDoDia()
    this.carregarConclusoes()

    setInterval(() => {
      const novaKey = this.getStorageKeyDoDia()
      if (novaKey !== this.storageKey) {
        this.storageKey = novaKey
        this.resetarConclusoes()
        this.carregarConclusoes()
      }
    }, 30_000)
  },
  methods: {
    concluirTudoDoDia(dia) {
      for (const treino of this.treinos[dia] || []) {
        treino.concluido = true
      }
      this.salvarConclusoes()
    },

    desmarcarTudoDoDia(dia) {
      for (const treino of this.treinos[dia] || []) {
        treino.concluido = false
      }
      this.salvarConclusoes()
    },

    abrirVideo(url) {
      const embed = this.getEmbedUrl(url)
      if (!embed) return

      this.videoEmbedAtual = embed

      this.isShorts = url.includes('/shorts/')

      this.dialogVideo = true
    },

    fecharVideo() {
      this.dialogVideo = false
      this.videoEmbedAtual = ''
    },

    getStorageKeyDoDia() {
      const d = new Date()
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      return `treinos_concluidos_${yyyy}-${mm}-${dd}`
    },

    getIdTreino(dia, treino) {
      return `${dia}|${treino.nome}`
    },

    salvarConclusoes() {
      const concluidoMap = {}

      for (const dia of this.items) {
        for (const treino of this.treinos[dia] || []) {
          concluidoMap[this.getIdTreino(dia, treino)] = !!treino.concluido
        }
      }

      localStorage.setItem(this.storageKey, JSON.stringify(concluidoMap))
    },

    carregarConclusoes() {
      const raw = localStorage.getItem(this.storageKey)
      if (!raw) return

      let concluidoMap = {}
      try {
        concluidoMap = JSON.parse(raw) || {}
      } catch {
        concluidoMap = {}
      }

      for (const dia of this.items) {
        for (const treino of this.treinos[dia] || []) {
          const id = this.getIdTreino(dia, treino)
          treino.concluido = !!concluidoMap[id]
        }
      }
    },

    resetarConclusoes() {
      for (const dia of this.items) {
        for (const treino of this.treinos[dia] || []) {
          treino.concluido = false
        }
      }
    },

    getEmbedUrl(url) {
      if (!url) return ''

      try {
        if (url.includes('youtube.com/embed/')) return url

        const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/)
        if (shortsMatch?.[1]) return `https://www.youtube.com/embed/${shortsMatch[1]}`

        const shortLinkMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/)
        if (shortLinkMatch?.[1]) return `https://www.youtube.com/embed/${shortLinkMatch[1]}`

        const vMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/)
        if (vMatch?.[1]) return `https://www.youtube.com/embed/${vMatch[1]}`

        return ''
      } catch {
        return ''
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
    th,
    td {
      white-space: nowrap;
    }
  }

  .card-concluido {
    opacity: 0.55;
    filter: grayscale(0.2);
  }

  .video-wrap {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
  }

  .video-wrap iframe {
    width: 100%;
    height: 100%;
    display: block;
  }

  .video-dialog-card {
    background-color: #c0bfbf;
  }

  .video-dialog-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
  }

  .video-container {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
    background: black;
  }

  .video-container.shorts {
    aspect-ratio: 9 / 16;
    width: 100%;
    max-height: 100vh;
  }

  .video-container iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
