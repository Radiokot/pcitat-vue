<template>
    <transition name="fade">
        <div :class="['alert', alertClass]" v-if="hasMessage">
            <p> {{ message }}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'app',
        props: ['message', 'alertType'],
        computed: {
            hasMessage() {
                return this.message && this.message != ''
            },
            alertClass() {
                return 'alert-' + (this.alertType ? this.alertType : 'danger')
            }
        }
    }

</script>

<style>
    .fade-enter-active {
        transition: opacity .5s
    }
    
    .fade-enter {
        opacity: 0
    }
</style>