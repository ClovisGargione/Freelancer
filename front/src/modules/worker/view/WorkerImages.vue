<template>
 <div class="container-fluid content h-100">
    <div class="row">
        <div class="col-lg-10 col-10 title">
            <h2>Imagens </h2>
        </div>
        <div class="col-2 mt-3">
            <go-back class="pull-right" v-if="prevRoute" :route="prevRoute"></go-back>
        </div>
    </div>
    <div class='row mt-3'>
        <div class="col-md-12 col-sm-12">
            <b-card class="card bd-callout" header-tag="header">
                <template #header>
                    <h6 style="display:inline" class="mb-0 mr-2">Imagens</h6>
                </template>
                <form ref="formContainer">
                    <div class="row">
                        <div class="col-12 d-flex">
                            <label for="files" class="btn btn-primary"><font-awesome-icon icon="images"/> Selecionar</label>
                            <b-form-file id="files" style="visibility:hidden;" v-model="filesSelected" accept="image/*" plain multiple></b-form-file>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-sm-12 col-sx-12 mt-2 pr-1 pl-2 h-100" v-for="image in imagesUrl" :key="image._id" id="preview">
                            <img :src="image.url" style="text-shadow: 1px 1px 2px #333; border: 5px solid #343a40; border-radius: 0.25rem; box-shadow: 0 5px 10px rgba(0,0,0,0.5);"/>
                            <b-button pill v-if="showRemove" @click="removeImage(image)" class="remove-image-btn" variant="danger"><font-awesome-icon icon='trash' class="text-light pointer"/></b-button>
                        </div>
                    </div>
                </form>
            </b-card>
        </div>
    </div>
 </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GoBack from '@/components/GoBack'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faImages } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faEdit, faImages)
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  components: {
    GoBack
  },
  data: () => ({
    prevRoute: {},
    files: [],
    filesSelected: null,
    imagesUrl: [],
    showRemove: false
  }),
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('worker', ['ActionUploadImage', 'ActionGetWorkById', 'ActionRemoveImage']),
    init () {
      const loader = this.showLoader()
      this.ActionGetWorkById({ personalId: this.$route.params.id })
        .then(res => {
          this.imagesUrl = res.body.personal.images
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setTimeout(() => {
            this.showRemove = this.imagesUrl.length > 0
            loader.hide()
          }, 500)
        })
    },
    onChange (e) {
      this.filesSelected.map(file => {
        this.files.push(file)
        this.imagesUrl.push(URL.createObjectURL(file))
      })
      this.filesSelected = null
    },
    showLoader () {
      return this.$loading.show({ container: this.$refs.formContainer })
    },
    async removeImage (image) {
      await this.ActionRemoveImage({ personalId: this.$route.params.id, imageId: image._id })
      this.init()
      // eslint-disable-next-line spaced-comment
      /*if (this.imagesUrl.includes(image)) {
        this.imagesUrl = this.imagesUrl.filter(function (value, index, arr) {
          return value !== image
        })
      }*/
    },
    async uploadImage () {
      await this.filesSelected.map(file => {
        const formData = new FormData()
        formData.append('file', file)
        const payload = { image: formData, personalId: this.$route.params.id }
        this.ActionUploadImage(payload)
          .then(res => {
            this.imagesUrl = res.body.personal.images
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.showRemove = true
          })
      })
    }
  },
  computed: {
    ...mapState('worker', ['work'])
  },
  watch: {
    filesSelected: function (val) {
      const loader = this.showLoader()
      this.uploadImage()
      loader.hide()
    }
  }

}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 480px) {
  img {
    width: 100%;
    height: auto;
  }
}

@media only screen and (min-width: 480px) {
  img {
    width: 100%;
    height: auto;
  }
}
#preview .remove-image-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
}

.rounded-pill {
    border-radius: 50rem!important;
    opacity: 1;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
}

</style>
