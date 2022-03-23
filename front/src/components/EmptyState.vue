<template>
    <div class="row h-90">
            <div class="col-12 text-center my-auto">
              <font-awesome-icon :icon="['fa', 'ghost']" size="8x"/><br>
              <h5>Nenhum registro encontrado</h5>
            </div>
        </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
library.add(faGhost)
export default {
  name: 'emptyState'
}
</script>

<style lang="scss" scoped>
.h-90 {
  height: 80% !important;
}
</style>
