<template>
  <div class="home">
    <h1>Upload de PDF e Extração de CPFs</h1>
    
    <input type="file" @change="handleFileUpload" />
    
    <!-- Remover a exibição dos CPFs extraídos aqui -->
    
    <!-- Botão para navegar para a página de CPFs -->
    <router-link to="/CpfList">Ver lista de CPFs</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      // Remover a lista de CPFs extraídos, pois não vamos exibi-los na Home
      cpfsExtraidos: []
    };
  },
  methods: {
    // Método para enviar o arquivo PDF e processá-lo
    async handleFileUpload(event) {
  const formData = new FormData();
  formData.append("file", event.target.files[0]);

  try {
    await this.$axios.post("http://localhost:5000/api/pdf/upload", formData);
    // Notifique o usuário ou faça qualquer ação que você precisar aqui
    alert("CPFs extraídos e enviados com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o PDF:", error);
  }
}

  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles.scss";
</style>
