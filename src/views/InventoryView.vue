<template>
  <div class="container mx-auto">
    <table class="border-separate border border-green-800 ...">
      <thead>
        <tr>
          <th class="border border-green-600 ...">State</th>
          <th class="border border-green-600 ...">City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-green-600 ...">Indiana</td>
          <td class="border border-green-600 ...">Indianapolis</td>
        </tr>
        <tr>
          <td class="border border-green-600 ...">Ohio</td>
          <td class="border border-green-600 ...">Columbus</td>
        </tr>
        <tr>
          <td class="border border-green-600 ...">Michigan</td>
          <td class="border border-green-600 ...">Detroit</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
        { id: 3, name: "Tom Brown", email: "tom@example.com", age: 35 },
      ],
    };
  },
  methods: {
    editPerson(index) {
      // Implement edit functionality
      console.log("Edit person at index:", index);
    },
    deletePerson(index) {
      // Implement delete functionality
      this.persons.splice(index, 1);
    },
  },
};
</script>

<style>
/* You can add custom styles here if needed */
</style>
