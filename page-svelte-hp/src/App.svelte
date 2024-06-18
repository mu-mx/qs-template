<script>
    import { onMount } from 'svelte';
    import Slide from './components/Slide.svelte';
    let state = 'initing...';
    onMount(async () => {
    })

    export function init () {
        setTimeout(() => {
            state = 'init ok';
        }, 3000);
    }

</script>

<div class="swiper-container">
    这是APP组件: {state}
    <Slide data={1}>
        <div slot="wrap">这是子组件的slot</div>
    </Slide>
</div>

<style>
</style>
