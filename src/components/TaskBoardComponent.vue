<template>
    <div class="task-board flex justify-between">
        <div v-for="status in statuses" :key="status" :data-status="status"
            class="column bg-gray-100 p-4 min-h-[200px] flex flex-col">
            <h2 class="font-bold mb-2">{{ status }}</h2>
            <draggable class="dragArea flex-1" :list="filteredTasks(status)" group="tasks" itemKey="id"
                @end="handleEndDrag">
                <template #item="{ element }">
                    <div :data-id="element.id" :key="element.id"
                        :class="['task bg-white p-2 shadow mb-2', { 'bg-beige': isUserAssigned(element) }]">
                        <h3>{{ element.title }}</h3>
                        <p>{{ element.description }}</p>
                        <p>Asignado a: {{ element.assigned_to_name || 'N/A' }}</p>
                    </div>
                </template>
                <template #empty>
                    <p class="text-center text-gray-500">Arrastra una tarea aquí</p>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import { getAllTasks, updateTaskApi } from '../api/api';
import { useStore } from 'vuex';

const store = useStore();
const tasks = ref([]);
const statuses = ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'];
const token = store.state.token;
const currentUserId = store.state.userId;

onMounted(async () => {
    tasks.value = await getAllTasks();
});

function filteredTasks(status) {
    return tasks.value.filter(task => task.status === status);
}

function isUserAssigned(task) {
    return task.assigned_to === currentUserId;
}

async function handleEndDrag(event) {
    const newStatus = findDataStatus(event.to);
    const taskId = parseInt(event.item.dataset.id, 10);
    const taskIndex = tasks.value.findIndex(task => task.id === taskId);

    if (taskIndex !== -1 && newStatus !== undefined) {
        tasks.value[taskIndex].status = newStatus;
        console.log('Updating task status:', taskId, newStatus);
        try {
            await updateTaskApi(taskId, newStatus, token);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }
}

function findDataStatus(element) {
    while (element && !element.dataset.status) {
        element = element.parentElement;
    }
    return element ? element.dataset.status : undefined;
}
</script>

<style scoped>
.task-board {
    display: flex;
    justify-content: space-between;
}

.column-highlight {
    border: 2px solid #f00;
}

.bg-beige {
    background-color: #f5f5dc;
}
</style>
