<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import SiteFooter from './components/footer/SiteFooter.vue';
    import SiteNavigation from './components/navigation/SiteNavigation.vue';
</script>

<template>
    <header>
        <SiteNavigation />
    </header>
    <main>
        <RouterView />
    </main>
    <footer>
        <SiteFooter />
    </footer>
</template>

<style lang="scss" scoped>
    @use '@/scss/common/layout';
    @use '@/scss/common/breakpoints';

    :global(#app) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        padding-top: layout.$navigation-height;
        padding-left: layout.$spacing-default;
        padding-right: layout.$spacing-default;
        @include breakpoints.from-md() {
            padding-top: layout.$navigation-height-from-md;
        }
    }
</style>
