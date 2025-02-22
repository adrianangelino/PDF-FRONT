<template>
  <div class="cpf-list-container">
    <div class="cpf-list">
      <div class="cpf-wrapper">
        <div
          v-for="(cpf, index) in cpfs"
          :key="index"
          class="cpf-item"
        >
          <span class="cpf-text">{{ cpf }}</span>
          <div class="actions">
            <button @click="editCPF(index)" class="edit-btn">Editar</button>
            <button @click="deleteCPF(index)" class="delete-btn">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CpfList",
  data() {
    return {
      cpfs: [], // Inicialmente vazio, vamos preencher depois
    };
  },
  mounted() {
    this.fetchCpfs();
  },
  methods: {
    async fetchCpfs() {
      try {
        const response = await axios.get('http://localhost:5000/api/cpfs');
        this.cpfs = response.data.cpfs;
      } catch (error) {
        console.error("Erro ao buscar CPFs:", error);
      }
    },

    editCPF(index) {
      const cpfAtual = this.cpfs[index];
      const novoCpf = prompt("Digite o novo CPF:", cpfAtual);
      if (novoCpf) {
        this.updateCpf(cpfAtual, novoCpf);
      }
    },

    async updateCpf(oldCpf, newCpf) {
      try {
        await axios.put(`http://localhost:5000/api/cpfs/${oldCpf}`, { cpf: newCpf });
        this.fetchCpfs(); // Recarregar os CPFs
      } catch (error) {
        console.error("Erro ao editar CPF:", error);
      }
    },

    async deleteCPF(index) {
      const cpfToDelete = this.cpfs[index];
      if (confirm("Deseja realmente excluir este CPF?")) {
        try {
          await axios.delete(`http://localhost:5000/api/cpfs/${cpfToDelete}`);
          this.fetchCpfs(); // Recarregar os CPFs após exclusão
        } catch (error) {
          console.error("Erro ao excluir CPF:", error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/components/CpfList.scss";
</style>
