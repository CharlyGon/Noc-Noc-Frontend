<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        @click.self="close">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
            <!-- Botón de cierre (X) en la esquina superior derecha -->
            <div class="flex justify-between items-start">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{{ task.title }}</h3>
                <button @click="close" class="text-gray-400 hover:text-gray-500">
                    <span class="text-xl">&times;</span>
                </button>
            </div>
            <p class="mt-2 text-gray-500">{{ task.description }}</p>
            <!-- Botón para mostrar el campo de comentarios y el campo en sí -->
            <button @click="toggleCommentField"
                class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Añadir comentario
            </button>
            <div v-if="showCommentField" class="mt-2">
                <textarea v-model="comment" rows="4" class="w-full p-2 border rounded"
                    placeholder="Añade un comentario..."></textarea>
                <div class="flex justify-end space-x-2 mt-2">
                    <button @click="saveComment" :disabled="comment.trim() === ''"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-green-300">
                        Guardar
                    </button>

                </div>
            </div>
            <!-- Lista de comentarios -->
            <div v-if="comments.length > 0">
                <h4>Comentarios:</h4>
                <ul>
                    <li v-for="comment in comments" :key="comment.id">
                        {{ comment.body }} - {{ formatDate(comment.created_at) }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No hay comentarios aún.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import { createNewComment, getCommentsByTaskId } from '../api/api';

const props = defineProps({
    task: Object
});
const emit = defineEmits(['close', 'saveComment']);
const isVisible = ref(true);
const store = useStore();
const showCommentField = ref(false);
const comment = ref("");
const token = store.state.token;
const comments = ref([]);

onMounted(() => {
    loadComments();
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

const loadComments = async () => {
    try {
        const response = await getCommentsByTaskId(props.task.id, token);
        if (Array.isArray(response)) {
            comments.value = response;
        } else {
            console.error("Respuesta inesperada:", response);
            comments.value = [];
        }
    } catch (error) {
        console.error('Error al cargar los comentarios:', error);
        comments.value = [];
    }
}

const close = () => {
    emit('close');
    isVisible.value = false;
}

const toggleCommentField = () => {
    showCommentField.value = !showCommentField.value;
}

const saveComment = async () => {
    try {
        const response = await createNewComment(props.task.id, comment.value, token);
        const newComment = response.comment;
        if (newComment) {
            comments.value.unshift(newComment);
            emit('saveComment', { taskId: props.task.id, comment: comment.value });
            comment.value = "";
            showCommentField.value = false;
        } else {
            throw new Error("El comentario no se recibió correctamente del servidor.");
        }
    } catch (error) {
        console.error('Error al guardar el comentario:', error.response?.data || error.message);
    }
}

</script>
