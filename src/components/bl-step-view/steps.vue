<template>
    <div class="bl-steps-view">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "BlStepsView",
    props: {
        currentStep: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            steps: []
        };
    },
    watch: {
        steps(steps) {
            steps.forEach((child, index) => {
                child.index = index;
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>


