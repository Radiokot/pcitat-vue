<template>
    <footer class="footer">
        <div class="container">
            <p class="text-center">
                © {{ year }}&nbsp;Просто цитатник
                <br>
                <small><a href="//radiokot.com.ua">radiokot.com.ua</a></small>
            </p>
        </div>
    </footer>
</template>

<script>
    export default {
        computed: {
            year() {
                return new Date().getFullYear()
            }
        }
    }

</script>