<template>
    <div>
        <b-card class="worker-card bd-callout">
            <b-media class="row">
<div class="col-12">
                <h4 class="mt-0" v-if="worker.user.name">{{worker.user.name}}</h4>
                <h5 class="mt-0">{{worker.user.email}}</h5>
                <div :key="profession._id" v-for="profession in worker.professions">
                    {{profession.name}}
                </div>
                <div>{{worker.address.street}}, {{worker.address.number}}</div>
                <div>{{worker.address.district}} {{worker.address.city}} - {{worker.address.state}}</div>
                <small> {{worker.description}}</small>
</div>
            </b-media>

        </b-card>
<div class="row justify-content-center">
  <div class="col-md-6 col-sx-12">
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; border: 5px solid #343a40; border-radius: 0.25rem; box-shadow: 0 5px 10px rgba(0,0,0,0.5);">
    <span :key="image.url" v-for="image in worker.images">
        <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            :src="image.url"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </span>

    </b-carousel>
  </div>
</div>
    </div>
</template>

<script>

export default {
  name: 'workerDetailBox',
  props: {
    worker: { type: Object, require: true }
  }
}
</script>

<style lang="scss" scoped>

.worker-card{
    margin-bottom: 10px;
    background-color: var(--dark);
    transition: .4s;
    color: var(--light);
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    border-left-color: var(--blue);
    &:hover {
      transform: scale(1.01);
      box-shadow: 0 15px 25px rgba(0,0,0,0.5);
    }
}
.bd-callout {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border-left-width: 1px;
    border-left-width: .25rem;
    border-radius: .25rem;
}
.card-body{
    overflow: auto;
    white-space: nowrap;
}

@media only screen and (max-width: 480px) {
  img {
    width: 100%;
    height: 15rem;
  }
}

@media only screen and (min-width: 480px) {
  img {
    width: 100%;
    height: 50vh;
  }
}

</style>
