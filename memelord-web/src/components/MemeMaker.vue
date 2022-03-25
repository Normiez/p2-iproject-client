<template>
  <div class="text-white mt-3">
    <b-row>
      <b-col cols="8" md="6">
        <form>
          <div class="form-control">
            <img :src="this.srcUrl" v-if="this.srcUrl" style="width: 100%" />
          </div>
          <input
            v-model="text0"
            type="text"
            class="form-control mt-3"
            placeholder="input text 1"
          />
          <div class="mt-3">
            <input
              v-model="text1"
              type="text"
              class="form-control"
              placeholder="input text 2"
            />
            <button @click.prevent="sendToAPI">preview</button>
          </div>
        </form>
      </b-col>
      <b-col id="postSection" cols="10" md="6" class="overflow-auto">
        <div>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="card" v-for="img in imgFlipAPI" :key="img.id">
              <a @click="takePicture(img.id, img.url)"
                ><img :src="img.url" class="card-img-top"
              /></a>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
  name: "MemeMaker",
  data() {
    return {
      templateId: "",
      srcUrl: "",
      text0: "",
      text1: "",
    };
  },
  methods: {
    takePicture(id, url) {
      this.templateId = id;
      this.srcUrl = url;
    },
    async sendToAPI() {
      //still fail (CORS)
      if (!this.text1 && !this.text0) {
        swal({
          title: "please input text",
          icon: "info",
        });
      } else if (!this.templateId) {
        swal({
          title: "please choose the template",
          icon: "info",
        });
      } else {
        let option = {
          template_id: this.templateId,
          username: "testingForIproject",
          password: "viruskomputer",
          text0: this.text0,
          text1: this.text1,
        };
        const data = await this.$store.dispatch("fetchPreview", option);
        this.srcUrl = data;
      }
    },
  },
  computed: {
    imgFlipAPI() {
      return this.$store.state.imgFlipAPI;
    },
    imgPreview() {
      return this.$store.state.imgPreview;
    },
  },
};
</script>

<style scoped>
#thisImg {
  width: 400;
  height: 300;
}
#postSection {
  max-height: 85vh;
}
</style>
