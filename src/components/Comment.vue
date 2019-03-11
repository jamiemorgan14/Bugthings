<template>
  <div class="comment row">
    <div class="card col-4" v-for="note in notes">
      <div class="card-body">
        <h5 class="card-title">{{note.creator}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{note.flagged}}</h6>
        <p class="card-text">{{note.content}}</p>
        <a @click="showform = !showform" v-if="!completed" class="card-link">Edit Note</a>
        <a v-if="!completed" class="card-link" @click.prevent="deleteNote(note)">Delete Note</a>
        <form v-if="showform" @submit.prevent="editNote(note)">
          <div class="form-row">
            <div class="col-12">
              <input v-model="note.content" type="text" class="form-control" placeholder="" required>
            </div>
            <div class="col">
              <button class="btn btn-success" type="submit">Edit Note</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: ['id'],
    data() {
      return {
        completed: this.$store.state.bugs.find(b => b._id == this.$route.params.id).closed,
        showform: false,
      }
    },
    mounted() {
      if (this.$store.state.notes.length == 0) {
        this.$store.dispatch('getNotes', this.$route.params.id)
      }
    },
    computed: {
      notes() {
        return this.$store.state.notes
      }
    },
    methods: {
      editNote(note) {
        debugger
        this.$store.dispatch('editNote', note)
        this.showform = false
      },
      deleteNote(note) {
        this.$store.dispatch('deleteNote', note)
      }
    },
    components: {}
  }
</script>

<style>
  .card-link {
    background-color: lightcoral;
    cursor: pointer;
    border-radius: 8%;
    padding: 5px
  }
</style>