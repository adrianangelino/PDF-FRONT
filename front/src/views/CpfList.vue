<template>
    <div class="cpf-list-container">
      <!-- 
        Esta div .cpf-list serve apenas para alinhar tudo no centro. 
        Não tem fundo branco e não é muito grande.
      -->
      <div class="cpf-list">
        <!-- 
          Aqui está o div em branco encapsulando os CPFs, 
          com sombra e borda arredondada. 
        -->
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
  export default {
    name: "CpfList",
    data() {
      return {
        cpfs: ["987.654.321-00", "111.222.333-44"], // Exemplo
      };
    },
    methods: {
      editCPF(index) {
        const cpfAtual = this.cpfs[index];
        const novoCpf = prompt("Digite o novo CPF:", cpfAtual);
        if (novoCpf) {
          this.$set(this.cpfs, index, novoCpf);
        }
      },
      deleteCPF(index) {
        if (confirm("Deseja realmente excluir este CPF?")) {
          this.cpfs.splice(index, 1);
        }
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/components/CpfList.scss";
  </style>
  