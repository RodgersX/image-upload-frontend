<template>
  <div class="single">
    <form class="form" enctype="multipart/form-data">
      <p class="display-1">Single File Upload</p>
      <div class="message" :class="`message ${error ? 'error--text' : 'success--text'}`">
        <div class="message-body">{{ message }}</div>
      </div>
      <div @click="$refs.image.click()" class="select-button">
        <span>Select File</span>
      </div>
      <input
      type="file"
      ref="image"
      class="input"
      @change="onFileSelected">
      <v-btn dark @click="onUpload" depressed color="green lighten-2 mt-4">Upload</v-btn>
    </form>

    <!-- .section>.container  code shortcuts-->
    <div class="section">
      <div class="container"></div>
    </div>
      
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'single-upload',

  data() {
    return {
      selectedFile: null,
      message: '',
      error: false
    }
  },

  methods: {
    onFileSelected() {
      const file = this.$refs.image.files[0]
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']
      const MAX_SIZE = 200000
      const tooLarge = file.size > MAX_SIZE
      
      if(allowedTypes.includes(file.type) && !tooLarge) {
        this.selectedFile = file
        this.error = false
        this.message = ''
      } else {
        this.error = true
        this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}KB`: 'Only images are allowed'
      }
      
    },

    async onUpload() {
      // create FormData object to send multipart/form-data data
      const fd = new FormData()
      fd.append('image', this.selectedFile)
      try {
        await Axios.post('/upload', fd)
        this.message = 'File has been uploaded'
        this.selectedFile = null
        this.error = false
      } catch(err) {
        this.message = err.response.data.error
        this.error = true
        console.log(err)
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
  margin: 3rem auto;
  border: 1px solid rgb(97, 66, 10);
  border-radius: 7px;
  padding: 2rem;
}

.form > input[type="file"] {
  display: none;
}

.form > .select-button {
  padding: 1rem;
  color: white;
  background-color: rgb(211, 151, 41);
  border-radius: .3rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
</style>