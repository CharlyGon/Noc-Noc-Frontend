<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-4">Lista de Tareas</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Iterar sobre las tareas -->
      <div v-for="task in tasks" :key="task.id" class="bg-white shadow-md rounded-md p-4">
        <h2 class="text-lg font-semibold mb-2">{{ task.title }}</h2>
        <p class="text-gray-600">{{ task.description }}</p>
        <div class="mt-4">
          <span class="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md">{{ task.status }}</span>
          <span class="ml-2">{{ task.assigned_to }}</span>
        </div>
      </div>
    </div>
    <!-- Botón de crear nueva tarea -->
    <button @click="createNewTask"
      class="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600">
      <svg class="w-6 h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const createNewTask = () => {
  // Navegar al componente NewTaskForm.vue
  router.push('/create-task');
};

</script>

<style>
/* Estilos opcionales */
</style>