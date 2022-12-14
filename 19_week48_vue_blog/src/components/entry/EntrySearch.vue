<template>
    <div ref="componentRoot" class="entry-search">
        <div class="input-field">
            <input
                ref="input"
                :value="searchQuery"
                @input="(e) => onInput(e)"
                class="input"
                type="text"
                name="search"
                id="search"
                autocomplete="off"
                :class="{ show: isInputOpen }"
            />
            <i
                class="bi icon link link-light"
                :class="{ 'bi-search': !isInputOpen, 'bi-x-circle': isInputOpen }"
                @click="toggleInput"
            >
            </i>
        </div>
        <div v-if="searchResult.length > 0" class="result">
            <RouterLink
                v-for="entry in searchResult"
                :key="entry.id"
                :to="{ name: Routes.BLOG_ENTRY, params: { id: entry.id } }"
                @click="resetInput"
                class="result-item link link-light link-hover-underline"
                v-html="entry.title"
                :class="{ disabled: entry.id === NO_RESULT_ID }"
            >
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { onClickOutside, useEventListener } from '@vueuse/core';
    import { useBlogDataStore, type BlogEntry } from '../../stores/BlogDataStore';
    import { Routes } from '../../router/Router';

    interface ResultItem {
        id: string;
        title: string;
    }

    const blogData = useBlogDataStore();
    const componentRoot = ref<HTMLElement | null>(null);
    const input = ref<HTMLInputElement | null>(null);
    const isInputOpen = ref<boolean>(false);
    const searchQuery = ref<string>('');
    const searchResult = ref<ResultItem[]>([]);
    const NO_RESULT_ID = ref<string>('no-result');
    const noResult = <ResultItem>{
        id: NO_RESULT_ID.value,
        title: '<span class="searching">Searching</span>',
    };
    let isLoading = false;

    onClickOutside(componentRoot, resetInput);
    useEventListener(window, 'resize', () => {
        if (window.innerWidth >= 768) {
            resetInput();
        }
    });

    /**
     *
     */
    function onInput(e: Event): void {
        const el = e.target as HTMLInputElement;
        searchQuery.value = el.value;

        if (blogData.items.length === 0 && !isLoading) {
            isLoading = true;
            blogData
                .getAll()
                .then(() => (isLoading = false))
                .catch((error: any) => {
                    console.log(error);
                    isLoading = false;
                });
            return;
        }

        if (searchQuery.value === undefined || searchQuery.value.length < 2) {
            searchResult.value = [];
            return;
        }

        const regexp = new RegExp(searchQuery.value, 'gi');
        searchResult.value = blogData.items
            .filter((entry: BlogEntry) => entry.title.match(regexp))
            .map((entry: BlogEntry) => {
                return {
                    id: entry.id,
                    title: entry.title.replaceAll(regexp, '<span class="search-term">$&</span>'),
                };
            });

        if (searchResult.value.length === 0) searchResult.value = [noResult];
    }

    /**
     *
     */
    function toggleInput(): void {
        isInputOpen.value = !isInputOpen.value;
        if (isInputOpen.value) {
            setTimeout(() => {
                input.value?.focus();
            }, 300);
        } else {
            resetInput();
        }
    }

    /**
     *
     */
    function resetInput(): void {
        if (isInputOpen.value) {
            toggleInput();
            return;
        }
        searchQuery.value = '';
        searchResult.value = [];
    }
</script>

<style scoped lang="scss">
    @use '../../scss/common/variables/layout';
    @use '../../scss/common/variables/colors';
    @use '../../scss/common/utils/breakpoints';
    @use '../../scss/common/gui/loaders';
    .entry-search {
        position: absolute;
        top: 0.8rem;
        right: 0;
        padding: 0 layout.$default-spacing;
        pointer-events: none;

        width: 100%;
        @include breakpoints.from-md() {
            width: 350px;
        }

        .input-field {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.8rem;
            width: 100%;

            .icon {
                font-size: 2rem;
                pointer-events: all;

                @include breakpoints.from-md() {
                    pointer-events: none;
                }
            }

            .input {
                font-size: inherit;
                padding: 0.7rem 1rem;
                color: colors.$dark;
                background-color: colors.$light;
                border-radius: 10px;
                pointer-events: all;

                visibility: hidden;
                width: 0px;
                transition: width 150ms ease;

                @include breakpoints.from-md() {
                    width: 100%;
                    visibility: visible;
                }

                &.show {
                    width: 100%;
                    visibility: visible;
                }
            }
        }

        .result {
            position: relative;
            background-color: colors.$primary;
            border-radius: 10px;
            margin-top: 1.6rem;
            padding: 0 1rem;

            max-height: 500px;
            overflow-y: auto;

            pointer-events: all;

            .result-item {
                display: block;
                padding: 1rem 0.5rem;
                border-bottom: 1px dotted colors.$light;

                &:deep(.search-term) {
                    background-color: rgba(colors.$light, 0.25);
                    color: colors.$white;
                    font-weight: 700;
                }

                &:last-of-type {
                    border-bottom: none;
                }

                &.disabled {
                    pointer-events: none;
                }

                &:deep(.searching) {
                    @include loaders.loader__dots(colors.$light);
                }
            }
        }
    }
</style>
