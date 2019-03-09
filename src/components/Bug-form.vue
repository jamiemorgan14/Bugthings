<template>
  <div class="bug-form">
    <button class="btn btn-danger" @click="showform = !showform">{{showform ? 'Hide Form' : 'Submit Bug'}}</button>
    <form v-if="showform" @submit.prevent="createBug">
      <div class="form-row">
        <div class="col">
          <input v-model="newBug.title" type="text" class="form-control" placeholder="Title" required>
        </div>
        <div class="col-7">
          <input v-model="newBug.description" type="text" class="form-control" placeholder="Description" required>
        </div>
        <div class="col">
          <input v-model="newBug.creator" type="text" class="form-control" placeholder="Creator" required>
        </div>
        <button class="btn btn-success" type="submit">Submit Bug</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "bug-form",
    data() {
      return {
        newBug: {},
        showform: false
      }
    },
    props: [],
    computed: {},
    methods: {
      createBug() {
        this.$store.dispatch('createBug', this.newBug)
        this.newBug = {}
        this.showform = false
      }
    },
    components: {}
  }
</script>

<!-- var bug = new Schema({
closed: { type: Boolean, required: true, default: false },
description: { type: String, required: true },
title: { type: String, required: true },
creator: { type: String, required: true } //The provided name for who reported the bug
user: { type: String, required: true },
closedDate: { type: String, required: true }
}, { timestamps: true }) -->