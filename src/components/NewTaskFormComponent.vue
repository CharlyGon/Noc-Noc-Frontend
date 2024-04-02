<!-- NewTaskForm.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-4">Crear Nueva Tarea</h1>

    <!-- Formulario para crear una nueva tarea -->
    <form @submit.prevent="createTask" class="max-w-lg mx-auto">
      <div class="mb-4">
        <label for="title" class="block font-medium text-gray-700">Título:</label>
        <input v-model="title" type="text" id="title" name="title" class="mt-1 p-2 border rounded-md w-full">
      </div>
      <div class="mb-4">
        <label for="description" class="block font-medium text-gray-700">Descripción:</label>
        <textarea v-model="description" id="description" name="description"
          class="mt-1 p-2 border rounded-md w-full"></textarea>
      </div>
      <div class="mb-4">
        <label for="status" class="block font-medium text-gray-700">Estatus:</label>
        <select v-model="status" id="status" name="status" class="mt-1 p-2 border rounded-md w-full">
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Bloqueado">Bloqueado</option>
          <option value="Completado">Completado</option>
        </select>
      </div>

      <!-- Campo de selección para asignar a un usuario -->
      <div class="mb-4">
        <label for="assigned_to" class="block font-medium text-gray-700">Asignado a:</label>
        <select v-model="assigned_to" id="assigned_to" name="assigned_to" class="mt-1 p-2 border rounded-md w-full">
          <option value="">Selecciona un usuario</option>
          <!-- Iterar sobre la lista de usuarios y mostrar cada uno como una opción en el select -->
          <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <button type="submit" :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }" :disabled="!isFormValid"
        class="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600">
        Crear Tarea
      </button>
    </form>

    <div class="text-center mt-4">
      <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAllUsers, createNewTask } from '../api/api';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const title = ref('');
const description = ref('');
const status = ref('Pendiente');
const assigned_to = ref('');
const assignedToName = ref('');
const userList = ref([]);
const successMessage = ref('');
const errorMessage = ref('');
const token = store.state.token;


const isFormValid = computed(() => {
  return title.value.trim() !== '' && description.value.trim() !== '' && assigned_to.value !== '';
});

const createTask = async () => {
  if (!isFormValid.value) {
    return; // Prevenir la ejecución si el formulario no es válido
  }
  
  const selectedUser = userList.value.find(user => user.id === assigned_to.value);
  const assigned_to_name = selectedUser ? selectedUser.name : '';

  const newTask = {
    title: title.value,
    description: description.value,
    status: status.value,
    assigned_to: assigned_to.value,
    assigned_to_name: assigned_to_name
  };
  const response = await createNewTask(newTask, token);



  if (response.error) {
    errorMessage.value = 'Error al crear la tarea';
    return;
  }

  successMessage.value = 'Tarea creada exitosamente';
  setTimeout(() => {
    router.push('/tasksList');
  }, 1000);
};

onMounted(async () => {
  const response = await getAllUsers(token);
  userList.value = response.users;
});
</script>
