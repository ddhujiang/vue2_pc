<template>
    <transition name="fade">
        <div class="bl-step _step_title_view" v-if="show">
            <div class="_step_title" v-if="name">{{name}}</div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: "BlStep",
    props: {
        name: {
            type: String,
            default: null
        },
        number: {
            type: Number
        }
    },
    beforeCreate() {
        this.$parent.steps.push(this);
    },
    beforeDestroy() {
        const steps = this.$parent.steps;
        const index = steps.indexOf(this);
        if (index >= 0) {
            steps.splice(index, 1);
        }
    },
    computed: {
        show() {
            let decisonNumber;
            if (this.number) {
                decisonNumber = this.number;
            } else {
                decisonNumber = this.index;
            }
            return (
                decisonNumber < this.$parent.currentStep ||
                decisonNumber === this.$parent.currentStep
            );
        }
    },
    data() {
        return {
            index: -1
        };
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}

._step_title_view {
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 15px 20px 0px rgba(43, 131, 255, 0.08);
    border-radius: 10px;
    padding: 20px 30px;
    margin-bottom: 30px;
}

._step_title {
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    line-height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.098);
    margin-bottom: 30px;
    // border: 1px solid red;
}
</style>


