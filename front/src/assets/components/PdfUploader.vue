<template>
  <div>
    <h1>Upload de PDF</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadFile" :disabled="!file">Upload</button>

    <div v-if="uploadStatus">
      <p>{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      uploadStatus: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        this.uploadStatus = 'Enviando...';
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.uploadStatus = 'Arquivo enviado com sucesso!';
      } catch (error) {
        this.uploadStatus = 'Erro no envio do arquivo';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: #4CAF50;
}
button {
  margin-top: 10px;
}
</style>
