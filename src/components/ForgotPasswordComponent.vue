<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img class="mx-auto w-auto" width="240" height="240" src="https://img.icons8.com/color/240/tellonym.png"
                alt="tellonym" />
            <div
                class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2
                    class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Password Recovery
                </h2>
                <form @submit.prevent="handleSubmit" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#"
                    method="post">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email</label>
                        <input v-model="email" type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com" required="">
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send
                    </button>
                </form>

                <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
                <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>

            </div>
        </div>
    </section>
</template>

<script setup>
import { forgotPassword } from '../api/api.js';
import { ref } from 'vue';

let email = '';
let successMessage = ref('');
let errorMessage = ref('');

const handleSubmit = async () => {
    try {
        await forgotPassword(email);

        successMessage.value = 'Se ha enviado un correo electrónico para restablecer la contraseña. Por favor, verifica tu bandeja de entrada.';
        setTimeout(() => {
            successMessage.value = '';
            errorMessage.value = '';
        }, 2000);
    } catch (error) {
        errorMessage.value = 'Error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error:', error);
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

input[type="email"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
