<template>
  <div class="btndiv">
      <input class="checkbox" type="checkbox" @change="emitOnDone" :disabled="model.status" />
      <button @click="emitOnRemove" >❌</button>
  </div>
</template>

<script>
export default {
  emits: ['onRemove', 'onDone'],
  props: {
    model: {
      required: true,
      type: Object
    }
  },

  setup(props, { emit }) {
    const emitOnRemove = () => { emit('onRemove') }
    const emitOnDone = () => { emit('onDone') }
    // expose model so template bindings reference the reactive prop
    return {
      emitOnRemove,
      emitOnDone,
      model: props.model
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