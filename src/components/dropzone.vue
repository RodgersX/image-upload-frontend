<template>
  <div class="dropzone">
      <h3>Dropzone</h3>
    <form class="form" enctype="multipart/form-data">
      <div class="message" :class="`message ${error ? 'error--text' : 'success--text'}`">
        <div class="message-body">{{ message }}</div>
      </div>
      
      <div class="dropzone">
        <input 
        type="file" 
        class="input"
        ref="image"
        @change="onUpload">

        <p v-if="!uploading" class="call-to-action">Drag your files here</p>
        <p v-if="uploading" class="progress-bar">
            <v-progress-linear 
            color="orange darken-1" 
            :value="progress"
            height="10"
            rounded
            striped></v-progress-linear>
            {{ progress }}%
        </p>
      </div>
    </form>

    <div class="content mt-11">
        <v-row >
            <v-col>
                <v-row no-gutters>
                    <figure class="image mx-2" v-for="file in uploadedFiles" :key="file">
                        <img :src="file">
                    </figure>
                </v-row>
            </v-col>
        </v-row>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'dropzone',

  data() {
    return {
      selectedFile: null,
      message: '',
      error: false,
      uploading: false,
      uploadedFiles: [],
      progress: 0
    }
  },

  methods: {
    async onUpload() {
        const file = this.$refs.image.files[0]
        const fd = new FormData()
        fd.append('image', file)
        try {
            this.uploading = true
            const res = await Axios.post('/dropzone', fd, {
                onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
            })
            this.uploadedFiles.push(res.data.file)
            this.uploading = false
        } catch(err) {
            this.message = err.response.data.error
            this.error = true
            this.uploading = false
        }
    }
  }
}
</script>

<style scoped>
.input {
  padding: 5px;
  background: rgb(192, 189, 189);
  border-radius: 5px;
  width: 100%;
  outline: none;
}

.form {
    min-height: 200px;
    padding: 1.5rem;
    position: relative;
    cursor: pointer;
    background-color: lightcyan;
    color: gray;
    outline: 2px dashed gray;
    outline-offset: -10px;
}

.input {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

.form:hover {
    background-color: lightblue;
}

.call-to-action,
.progress-bar {
    font-size: 1.2rem;
    text-align: center;
    padding: 70px;
}
</style>