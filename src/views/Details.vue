<template>
  <div class="bug-details container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{bug.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{bug.creator}}</h6>
            <p class="card-text">{{bug.description}}</p>
            <a v-if="!bug.closed" class="card-link" @click="bugform = !bugform">{{bugform ? 'Hide Form' : 'Make Note'}}</a>
            <form v-if="bugform" @submit.prevent="createNote">
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
            <a v-if="!bug.closed" @click="markComplete" class="card-link">Set Bug As Complete</a>
          </div>
        </div>
      </div>
    </div>
    <comment></comment>


  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: "BugDetails",
    props: ['id'],
    mounted() {
      this.$store.dispatch('getBug', this.id) || {}
    },
    data() {
      return {
        newNote: {
          bug: this.id,
          flagged: 'pending'
        },
        bugform: false,
        editform: false
      }
    },
    computed: {
      bug() {
        return this.$store.state.activeBug
      }
    },
    methods: {
      createNote() {
        this.$store.dispatch('createNote', this.newNote)
        this.newNote = {
          bug: this.$route.params.id
        }
        this.showform = false
      },
      markComplete() {
        this.$store.dispatch('markComplete', this.id)
      },
      editBug(bug) {
        this.$store.dispatch('editBug', bug)
        this.editform = false
      }
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>
  a {
    cursor: pointer;
    color: blue
  }
</style>