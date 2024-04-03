<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img class="mx-auto w-auto" width="240" height="240" src="https://img.icons8.com/color/240/tellonym.png"
                alt="tellonym" />
            <div
                class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2
                    class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Password
                </h2>
                <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="handleSubmit" ction="#">
                    <div>
                        <label for="currentpassword"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old
                            Password</label>
                        <input v-model="currentPassword" type="password" name="currentPassword" id="currentPassword"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="" autocomplete="current-password">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                            Password</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="" autocomplete="new-password">
                    </div>
                    <div>
                        <label for="confirmPassword"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New
                            Password</label>
                        <input v-model="confirmPassword" type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="" autocomplete="new-password">
                    </div>
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change
                        Password
                    </button>
                </form>

                <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
                <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { changePassword } from '../api/api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const successMessage = ref('');
const errorMessage = ref('');
const currentPassword = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
    try {
        if (password.value !== confirmPassword.value) {
            errorMessage.value = 'Passwords do not match';
            return;
        }
        const token = store.state.token;
        const response = await changePassword(currentPassword.value, password.value, confirmPassword.value, token);

        if (response.status === 200) {
            successMessage.value = 'Password reset successfully';
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            errorMessage.value = 'Unexpected error occurred';
            console.error('Error:', response);
        }

    } catch (error) {
        errorMessage.value = 'Error resetting password';
        console.error('Error:', error);
    }
};

</script>
