<template>
    <div class="logo-svg-wrapper" :style="pxSize">
        <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 749.29767 392.09967">
            <path
                class="fill-color"
                d="M492.146481 185.17773l-16.36718 7.11329.082 3.23632c.00017 99.36808-80.5538 179.92206-179.92188 179.92188-48.61743-.00045-92.6879-19.32855-125.0664-50.66406l-15.88282 6.90234c35.68041 37.19187 85.81246 60.41237 141.42188 60.41211 108.27444-.00053 196.04828-87.77439 196.04883-196.04883.00001-3.65038-.11752-7.27184-.31446-10.87305zM296.412111 0c-108.27586-.00052-196.05133 87.77492-196.05078 196.05078.00019 36.86487 10.18973 71.34421 27.88476 100.80078l14.85547-6.39843c-17.15201-27.55761-27.08208-60.07707-27.08203-94.92579.00091-99.36645 80.55347-179.91902 179.91992-179.91992 83.52354-.00015 153.68364 56.93562 173.94532 134.09961l15.27343-6.57812C462.060351 60.57462 386.339871.00046 296.412111 0z"
                fill="#fff"
                fill-rule="evenodd"
            />
            <g class="stroke-color" fill="none" stroke="#fff">
                <path
                    d="M107.128581 216.19879c-32.22576 16.51186-125.92025 62.2808-94.87242 124.10983s281.60591-62.91511 339.37565-89.65915l240.94097-111.85864c24.50043-9.07257 70.13659 31.09554 90.21748 16.38953s3.94102-39.10038 16.11041-57.28146 56.53757-54.23545 41.17105-75.7786-53.35544 7.29352-76.97196 8.35355-46.10704-23.52127-65.03833-13.72369-11.31831 67.69007-35.80091 81.74543-167.32272 89.2768-223.15902 112.17619-278.74055 124.36582-287.004 105.61269 43.60083-49.01044 64.64987-58.67277c-7.46927-26.62631-6.27635-29.14482-9.61879-41.41291z"
                    stroke-width="12.2"
                    stroke-linejoin="round"
                />
                <path
                    d="M57.092141 317.63003s-34.91407-1.44086-49.14909-11.48915m507.6083-131.13214s-15.14478-27.32921-20.90725-35.96541m56.68025 13.37194s-15.14478-27.32921-20.90725-35.96541m59.50443 21.84449s-17.96896-31.56549-23.73143-40.20169"
                    stroke-width="13.9"
                />
            </g>
            <path
                class="fill-color"
                d="M107.282231 208.27486c-2.22707-.17708-4.39576.36567-6.46875 1.03125 1.53087 22.9125 7.01659 44.75695 15.75 64.84375 10.08211-4.82455 11.53192-5.82841 5.94429-19.31343-3.58009-8.64009-7.72127-45.96489-15.22554-46.56157z"
                fill="#fff"
                fill-rule="evenodd"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
    import { computed, type CSSProperties } from 'vue';

    interface ILogoSvgProps {
        width?: number;
        height?: number;
    }

    interface ILogoSvgSize extends CSSProperties {
        width: number | string;
        height: number | string;
    }

    const props = defineProps<ILogoSvgProps>();

    const orgSize: ILogoSvgSize = {
        width: 749.29767,
        height: 392.09967,
    };

    const pxSize = computed<ILogoSvgSize>(() => {
        const size: ILogoSvgSize = scaledSize();
        return { width: size.width + 'px', height: size.height + 'px' };
    });

    function scaledSize(): ILogoSvgSize {
        let scale = 0.1;
        if (props.width !== undefined) {
            scale = props.width / +orgSize.width;
        } else if (props.height !== undefined) {
            scale = props.height / +orgSize.height;
        }
        return { width: +orgSize.width * scale, height: +orgSize.height * scale };
    }
</script>
