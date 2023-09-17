<template>
  <div>
    <h5 class="info-text">Upload any files for patient file</h5>
    <div class="row justify-content-center">
      <div class="col-lg-10 text-center">
        <image-upload @change="onFileChange"></image-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { ImageUpload } from 'src/components';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      model: {
        file: null
      }
    };
  },
  methods: {
    onFileChange(file) {
      this.model.file = file;

      // NOTE TODO: You can add logic here to handle sending the file to a server
      //  to save the file
      console.log('DEBUG, SecondStep.Vue: File Changed: ', file);
    },
    validate() {
      this.$emit('on-validated', true, this.model);
      return Promise.resolve(true);
    }
  }
};
</script>
<style></style>
