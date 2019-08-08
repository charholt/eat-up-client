'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const authUi = require('./auth/ui.js')
const shingdigsEvents = require('./shindigs/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authUi.signedOut()
  authEvents.addHandlers()
  shingdigsEvents.addHandlers()
})
