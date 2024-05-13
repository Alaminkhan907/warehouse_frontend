<template>
  <div>
    <div>
      <ul>
        <li>Name: {{ customer.fullName }}</li>
        <li>Name: {{ customer.email }}</li>
        <li>Name: {{ customer.phoneNo }}</li>
      </ul>
      <button @click="emitEdit">Edit</button>
      <button @click="emitDelete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["customer"],
  methods: {
    emitDelete() {
      this.$emit("delete", this.customer.id);
    },
    emitEdit() {
      this.$emit("edit", this.customer.id);
    },
  },
};
</script>
