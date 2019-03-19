<template>
  <div
    :class="['floating', { 'floating--expanded': isExpanded }]"
    v-click-outside="onClickOutside"
  >
    <div class="floating__content" ref="refContent">
      <transition name="fade">
        <template v-if="showContent">
          <slot></slot>
        </template>
      </transition>
    </div>

    <!-- Button is layout as an overlay over floating__content -->
    <button class="floating__btn" @click="onClickBtn">
      <transition name="rotation-fade" mode="out-in">
        <eva-icon
          :name="isExpanded ? 'close-outline' : 'settings-outline'"
          width="28"
          height="28"
          :key="isExpanded ? 'close' : 'settings'"
        ></eva-icon>
      </transition>
    </button>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  data: () => ({
    isExpanded: false,
    showContent: false
  }),
  mounted() {
    this.$refs['refContent'].addEventListener('transitionend', evt => {
      if (evt.propertyName === 'width') {
        // Select only a single property to avoid multiple fire calls as many properties are being transitioned
        if (this.isExpanded) {
          this.showContent = true
        }
      }
    })
  },
  destroyed() {
    if (this.$refs['refContent']) {
      this.$refs['refContent'].removeEventListener('transitionend')
    }
  },
  methods: {
    onClickBtn() {
      if (this.isExpanded) {
        this.showContent = false
      }
      this.isExpanded = !this.isExpanded
    },
    onClickOutside() {
      if (this.isExpanded) {
        this.isExpanded = false
        this.showContent = false
      }
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
}
</script>

<style lang="scss" scoped>
$btn-dimension: 6.3rem;
$btn-radius: 5rem;

$expand-height: 22rem;
$expand-width: 18rem;
$expand-border-radius: 1rem;

$timing-expand: 0.5s;
$timing-hover: 0.4s;
$timing-content: 0.2s;

.floating {
  $root: &;
  position: relative;
  &__btn,
  &__content {
    @include themify {
      background: themed('secondary-background-color');
    }
  }

  &__btn {
    // Reset
    padding: 0;
    border: none;
    cursor: pointer;
    font: inherit;
    background-color: transparent;
    color: inherit;

    // Styling
    position: absolute;
    right: 0;
    bottom: 0;
    height: $btn-dimension;
    width: $btn-dimension;
    border-radius: $btn-radius;
    transition: fill $timing-hover ease;

    &:focus {
      outline: 0;
    }
    @include themify {
      fill: themed('primary-text-color');
    }
    &:hover {
      @include themify {
        fill: themed('primary-brand-color');
      }
    }
  }

  &__content {
    height: $btn-dimension;
    width: $btn-dimension;
    border-radius: $btn-radius;
    box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.75);
    padding-bottom: $btn-dimension;
    overflow: hidden;
    transition: all $timing-expand ease;
    transition-property: width height;

    #{$root}--expanded & {
      height: $expand-height;
      width: $expand-width;
      border-radius: $expand-border-radius;
    }
  }
}
// Vue transitions animations
.fade-enter-active {
  transition: opacity $timing-content ease;
}
.fade-enter {
  opacity: 0;
}
</style>