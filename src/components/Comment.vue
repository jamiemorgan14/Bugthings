<template>
  <div class="comment">
    <div class="row">
      <div class="col">
        <div class="card" v-for="note in notes">
          <div class="card-body">
            <h5 class="card-title">{{note.creator}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{note.flagged}}</h6>
            <p class="card-text">{{note.content}}</p>
            <a v-if="!completed" class="card-link">Edit Note</a>
            <a v-if="!completed" class="card-link" @click.prevent="deleteNote(note._id)">Delete Note</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    data() {
      return {
        completed: this.$store.state.bugs.find(b => b._id == this.$route.params.id).closed
      }
    },
    props: ['id'],
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
      editNote() {

      },
      deleteNote(id) {
        this.noteToDelete = {
          bug: this.$route.params.id,
          _id: id
        }
        this.$store.dispatch('deleteNote', this.noteToDelete)
        this.$store.dispatch('getNotes', this.$route.params.id)
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