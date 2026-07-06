<template>
  <div class="btndiv">
      <input class="checkbox" type="checkbox" v-model="model.status" :disabled="model.status" />
      <button @click="emitOnRemove" >❌</button>
  </div>
</template>

<script>
export default {
  emits: ['onRemove'],
  props: {
    model: {
      required: true
    }
  },

  setup(props, { emit }) {
    const emitOnRemove = () => {emit('onRemove')}
    return {
      emitOnRemove
    }
  }
}
</script>

<style scoped>
.btndiv {
  display: flex;
  gap: 15px;
}
</style>