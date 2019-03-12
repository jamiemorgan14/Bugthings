<template>
  <div class="comment row mt-3  d-flex justify-content-between">
    <div class="card note-card col-3 mx-3" v-for="note in notes">
      <div class="card-body">
        <h5 class="card-title">{{note.creator}}</h5>
        <div class="dropdown">
          <i v-if="!bug.closed" class="fas fa-pencil-alt mb-2" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{note.flagged}}
        </i>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="editNote(note, 'pending')">Pending</a>
            <a class="dropdown-item" @click="editNote(note, 'completed')">Completed</a>
            <a class="dropdown-item" @click="editNote(note, 'rejected')">Rejected</a>
          </div>
        </div>
        <p class="card-text">{{note.content}}</p>
        <a @click="getNote(note)" v-if="!bug.closed" class="card-link">Edit Note</a>
        <a v-if="!bug.closed" class="card-link" @click.prevent="deleteNote(note)">Delete Note</a>
        <form class="mt-3" v-if="showform && note._id == activeNote._id" @submit.prevent="editNote(note)">
          <div class="form-row">
            <div class="col-12">
              <input v-model="note.content" type="text" class="form-control" placeholder="" required>
            </div>
            <div class="col">
              <button class="mt-3 btn btn-success" type="submit">Edit Note</button>
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
    mounted() {
      this.$store.dispatch('getNotes', this.$route.params.id) || {}
      this.$store.dispatch('getBug', this.$route.params.id)
    },
    data() {
      return {
        showform: false,
      }
    },
    computed: {
      notes() {
        return this.$store.state.notes
      },
      bug() {
        return this.$store.state.activeBug
      },
      activeNote() {
        return this.$store.state.activeNote
      }
    },
    methods: {
      editNote(note, status) {
        note.flagged = status || note.flagged
        this.$store.dispatch('editNote', note)
        this.showform = false
        this.$store.dispatch('getBug', this.$route.params.id)

      },
      deleteNote(note) {
        this.$store.dispatch('deleteNote', note)
      },
      getNote(note) {
        this.showform = !this.showform
        this.$store.dispatch('getNote', note)
      }
    },
    components: {}
  }
</script>

<style>
  .card-link {
    background-color: white;
    cursor: pointer;
    border-radius: 8%;
    padding: 5px
  }

  .note-card {
    background-color: #fff740;
  }

  i{
    cursor: pointer
  }
</style>