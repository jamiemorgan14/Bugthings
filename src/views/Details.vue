<template>
  <div class="bug-details container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{bug.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{bug.creator}}</h6>
            <p class="card-text">{{bug.description}}</p>
            <a href="#" class="card-link">Edit Bug</a>
            <a href="#" class="card-link">Set Bug As Complete</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-danger" @click="showform = !showform">{{showform ? 'Hide Form' : 'Make Note'}}</button>
        <form v-if="showform" @submit.prevent="createNote">
          <div class="form-row">
            <div class="col">
              <input v-model="newNote.creator" type="text" class="form-control" placeholder="Name" required>
            </div>
            <div class="col-7">
              <input v-model="newNote.content" type="text" class="form-control" placeholder="Comment" required>
            </div>
            <button class="btn btn-success" type="submit">Submit Note</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <comment></comment>
      </div>
    </div>


  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: "BugDetails",
    props: ['id'],
    mounted() {
      this.$store.dispatch('getBugs', this.$route.params.id)
      this.$store.dispatch('getNotes', this.$route.params.id)
    },
    data() {
      return {
        newNote: {
          bug: this.id,
          flagged: 'pending'
        },
        showform: false,
      }
    },
    computed: {
      bug() {
        return this.$store.state.bugs.find(b => b._id == this.id) || {}
      },
    },
    methods: {
      createNote() {
        this.$store.dispatch('createNote', this.newNote)
        this.newNote = {
          bug: this.id,
          flagged: 'pending'
        }
        this.showform = false
      },
    },
    components: {
      Comment
    }
  }
</script>

<style></style>