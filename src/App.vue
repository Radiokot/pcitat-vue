<template>
    <div>
        <Navigation :activeTab="this.$root.activeTab" v-if="this.$root.activeTab != 3"></Navigation>
        <router-view></router-view>
        <Footer v-if="this.$root.activeTab != 3"></Footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }

</script>