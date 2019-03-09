import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router.js'

let _api = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Jamie'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bugs: [],
    notes: []
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setNotes(state, data) {
      state.notes = data
    }
  },
  actions: {
    getBugs({ commit, dispatch }) {
      _api.get('bugs')
        .then(res => {
          commit('setBugs', res.data.results)
        })
    },
    getBug({ commit, dispatch }, payload) {
      _api.get('bugs/' + payload)
        .then(res => {
          commit('setActiveBug', res.data.results)
        })
    },
    getNotes({ commit, dispatch }, payload) {
      _api.get('bugs/' + payload + '/notes')
        .then(res => {
          commit('setNotes', res.data.results)
        })
    },
    createBug({ commit, dispatch }, payload) {
      _api.post('bugs', payload)
        .then(res => {
          dispatch('getBugs')
        })
    },
    createNote({ commit, dispatch }, payload) {
      _api.post('bugs/' + payload.bug + '/notes', payload)
        .then(res => {
          dispatch('getNotes', payload.bug)
        })
    }
  }
})



// Get

//   / bugs: returns list of bugs for the user

//     / bugs /: id: returns a single bug with all it's data

//       / bugs /: id / comments: returns all notes for a given bug id

// Post

//   / bugs: Creates a new bug

//     / bugs /: id / notes: Adds a new note to the bug.This can only be done if bug is open

// Put

// both of these can only be done if bug is open

//   / bugs /: id: Edits bug

//     / bugs /: id / notes /: id: Edits note.

//       Delete

// There is no true bug delete, only changing the status of a bug to closed.

// / bugs /: id: Changes status of bug from open to close

//   / bugs /: id / notes /: id: Deletes note.

