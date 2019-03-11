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
    notes: [],
    activeNote: {},
    activeBug: {}
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setNotes(state, data) {
      state.notes = data
    },
    setActiveNote(state, data) {
      state.activeNote = data
    },
    setActiveBug(state, data) {
      state.activeBug = data
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
    getNote({ commit, dispatch }, payload) {
      _api.get('bugs/' + payload.bug + '/notes/' + payload._id)
        .then(res => {
          commit('setActiveNote', res.data.results)
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
    },
    editBug({ commit, dispatch }, payload) {
      debugger
      _api.put('bugs/' + payload._id, payload)
        .then(res => {
          dispatch('getBug', payload._id)
        })
    },
    editNote({ commit, dispatch }, payload) {
      _api.put('bugs/' + payload.bug + '/notes/' + payload._id, payload)
        .then(res => {
          dispatch('getNote', res.data.results)
        })
    },
    markComplete({ commit, dispatch }, payload) {
      _api.delete('bugs/' + payload)
        .then(res => {
          dispatch('getBug', payload)
        })
    },
    deleteNote({ commit, dispatch }, payload) {
      _api.delete('bugs/' + payload.bug + '/notes/' + payload._id)
        .then(res => {
          dispatch('getNotes', payload.bug)
        })
    },
    sortBugs({ commit, dispatch }) {
      _api.get('bugs')
        .then(res => {
          commit('setBugs', res.data.results.filter(bug => bug.closed == false))
        }
        )
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

