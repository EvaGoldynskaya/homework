<template>
  <div class="field-div">
    <span class="field-label">{{ fieldLabel }}</span>
    <strong class="field-value">{{ fieldValue }}</strong>
  </div>
</template>

<script>

export default {
  emits: [ 'onChange'],
  props: {
    fieldLabel: {
      required: true,
      type: String
    },
    fieldValue: {
      required: true,
      type: String
    }
  },
  setup(props) {}
}
</script>

<style scoped>
.field-div {
  background: #f7faff;
  border: 1px solid #e4ebf8;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  color: #7b879d;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field-value {
  color: #172033;
  font-size: 15px;
  line-height: 1.4;
}
</style>