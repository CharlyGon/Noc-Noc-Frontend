<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto w-auto" width="240" height="240" src="https://img.icons8.com/color/240/tellonym.png"
                    alt="tellonym" />
            </div>

            <div
                class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2
                    class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in </h2>
                <form class="space-y-6" @submit.prevent="handleSubmit" action="#" method="POST">
                    <div>
                        <label for="email"
                            class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email
                            address</label>
                        <div class="mt-2">
                            <input v-model="email" id="email" name="email" type="email" autocomplete="email"
                                placeholder="name@company.com" required=""
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Password</label>
                        </div>
                        <div class="mt-2">
                            <input v-model="password" id="password" name="password" type="password"
                                autocomplete="current-password" placeholder="password" required=""
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in</button>
                    </div>
                </form>

                <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>

                <p class="mt-10 text-center text-sm text-gray-500">
                    <router-link to="/forgotPassword"
                        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Forgot
                        password?</router-link>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { loginUser } from '../api/api.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

let email = '';
let password = '';
let errorMessage = ref('');

const store = useStore();
const router = useRouter();


const handleSubmit = async () => {
    try {
        const response = await loginUser(email, password);
        const token = response.access_token;

        if (response.should_change_password) {
            await store.dispatch('setToken', token);
            await handleShouldChangePassword();
        } else {
            await handleLoginSuccess(token);
        }
    } catch (error) {
        handleError(error);
    }
};

const handleShouldChangePassword = async () => {
    await handleLoginSuccess();
    router.push('/changePassword');
};

const handleLoginSuccess = async (token) => {
    if (token) {
        await store.dispatch('setToken', token);
        router.push('/dashboard');
    } else {
        handleError(new Error('No se recibió un token de acceso.'));
    }
};

const handleError = (error) => {
    errorMessage.value = "Error logging in. Please try again later.";
    console.error('Error al enviar los datos:', error);
};

</script>
