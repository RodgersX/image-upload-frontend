<template>
  <div class="multi">
    <form class="form" enctype="multipart/form-data">
      <p class="display-1">Multiple File Upload</p>
      <div class="message" :class="`message ${error ? 'error--text' : 'success--text'}`">
        <div class="message-body">{{ message }}</div>
      </div>
      <div @click="$refs.images.click()" class="select-button">
        <span>Select Files</span>
      </div>
      <input
      multiple
      type="file"
      ref="images"
      class="input"
      @change="onFileSelected">
      

      <div 
      v-for="(f, i) in selectedFiles" 
      :key="i" 
      class="d-flex justify-space-between"
      :class="`level ${f.invalidMessage && 'red--text'}`">
        <div>
          {{ f.name }}
          <span v-if="f.invalidMessage">&nbsp;- {{ f.invalidMessage }}</span>
        </div>

        <div class="level-right">
          <v-btn icon @click.prevent="selectedFiles.splice(index, 1); uploadFiles.splice(index, 1)">
            <i class="bx bx-x bx-sm"></i>
          </v-btn>
        </div>
      </div>

      <v-btn dark @click="onUpload" depressed color="orange lighten-2 mt-4">Upload</v-btn>
    </form>

    <!-- .section>.container  code shortcuts-->
    <div class="section">
      <div class="container"></div>
    </div>
      
  </div>
</template>

<script>
import Axios from 'axios'
import _ from 'lodash'

export default {
  name: 'multi-upload',

  data() {
    return {
      selectedFiles: [],
      uploadFiles: [],
      message: '',
      error: false
    }
  },

  methods: {
    onFileSelected() {
      const images = this.$refs.images.files
      this.uploadFiles = [...this.uploadFiles, ...images]

      this.selectedFiles = [
        ...this.selectedFiles,
        ..._.map(images, file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ]
    },

    validate(file) {
      const MAX_SIZE = 200000
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

      if(file.size > MAX_SIZE) {
        return `Max Size: ${MAX_SIZE/1000}KB!`
      }

      if(!allowedTypes.includes(file.type)) {
        return 'Not an image!'
      }

      return ''
    },

    async onUpload() {
      const fd = new FormData()
      _.forEach(this.uploadFiles, file => {
        if(this.validate(file) === '') {
          fd.append('images', file)
        }
      })
      try {
        await Axios.post('/multiple', fd)
        this.message = 'Files have been uploaded'
        this.selectedFiles = []
        this.uploadFiles = []
      } catch(err) {
        this.message = err.response.data.error
        this.error = true
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
  background-color: #2EA169;
  border-radius: .3rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
</style>