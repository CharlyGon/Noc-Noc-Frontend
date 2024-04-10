<template>
    <div class="task-detail">
        <h2>{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <!-- Añade más detalles de la tarea aquí -->
        <button @click="close">Cerrar</button>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    task: Object
});

const isVisible = ref(true);

function close() {
    isVisible.value = false;
}
</script>

<style scoped>
.task-detail {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin: 1rem 0;
}
</style>