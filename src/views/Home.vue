<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1>BUG STUFF</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <bugForm></bugForm>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <bug></bug>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Bug from '@/components/Bug.vue'
  import BugForm from '@/components/Bug-form.vue'
  export default {
    name: 'home',
    mounted() {
      this.$store.dispatch('getBugs')
    },
    components: {
      Bug,
      BugForm
    }
  }
</script>