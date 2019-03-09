<template>
  <div class="bug">

    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Issue</th>
          <th scope="col">Creator</th>
          <th scope="col">Open/close</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bug-list" v-for="bug in bugs">
          <th scope="row">{{bug.createdAt}}</th>
          <router-link :to="{name: 'BugDetails', params:{id: bug._id}}">
            <td>{{bug.title}}</td>
          </router-link>
          <td>{{bug.creator}}</td>
          <td>{{bug.closed}}</td>
          <i @click="!bug.closed" v-if="bug.closed" class="fas fa-check-square"></i>
          <i @click="bug.closed" v-if="!bug.closed" class="far fa-square"></i>

        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  export default {
    name: "Bug",
    props: ['bugData'],
    data() {
      return {}
    },
    computed: {
      bugs() {
        return this.$store.state.bugs
      }
    },
    methods: {},
    components: {}
  }
</script>

<style>
  router-link {
    cursor: pointer
  }
</style>