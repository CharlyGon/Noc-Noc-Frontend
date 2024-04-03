<template>
    <div class="flex">
        <div class="sidebar">
            <Sidebar />
        </div>
        <div class="main-content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Sidebar from './SidebarComponent.vue';
</script>

<style>
.sidebar {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 2%;
}

.main-content {
    background-color: #f1f1f1;
    flex: 1;
    padding: 7%;
}
</style>
