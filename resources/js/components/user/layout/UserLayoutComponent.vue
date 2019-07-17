<template>
    <div>
        <Navigation></Navigation>
        <router-view></router-view>
    </div>
</template>
<script>
import Navigation from './NavigationComponent'
export default {
    components: {
        Navigation
    }
    
}
</script>