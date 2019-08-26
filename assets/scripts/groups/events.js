'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
// const config = require('./../config')

const onCreateGroup = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.createGroup(formData)
    .then(() => onGetAllGroups())
    .then(ui.createGroupSuccess)
    .catch(ui.createGroupFailure)
}

const onDeleteGroup = (event) => {
  event.preventDefault()
  const eventId = event.target.dataset.id
  api.deleteGroup(eventId)
    .then(() => onGetAllGroups())
    .then(ui.deleteGroupSuccess)
    .catch(ui.failure)
}

const onGetAllGroups = function (event) {
  api.getAllGroups()
    .then(ui.getGroupsSuccess)
    .catch(ui.getGroupsSuccessFailure)
}

const onUpdateGroup = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.updateGroup(formData)
    .then(event => {
      ui.openGroupSuccess(event)
      return event
    })
    .then(ui.updateGroupsSuccess)
    .catch(ui.updateGroupsSuccessFailure)
}

const onOpenGroup = event => {
  event.preventDefault()
  api.openGroup(event.target.dataset.id)
    .then(ui.openGroupSuccess)
    .catch(ui.failure)
}

const onRSVP = event => {
  const thisGroup = store.current_event
  if (!thisGroup.rsvps.includes(store.user)) {
    thisGroup.rsvps.push(store.user)
    api.updateGroup({
      event: thisGroup
    })
      .then(ui.onRSVPSuccess)
      .catch(ui.onRSVPFail)
  } else {
    $('.status-message').text("You're already attending this event.").show()
    setTimeout(function () {
      $('.status-message').fadeOut()
    }, 6000)
  }
}

const addHandlers = () => {
  $(document).on('click', '#see-all-groups', onGetAllGroups)
  $(document).on('submit', '#create-group', onCreateGroup)
  $(document).on('submit', '#update-group', onUpdateGroup)
  $(document).on('click', '#delete-group', onDeleteGroup)
  $(document).on('click', '.delete-group', onDeleteGroup)
  $(document).on('click', '.group-card', onOpenGroup)
  $(document).on('click', '.back-to-groups', onGetAllGroups)
  $(document).on('click', '.attending', onRSVP)
}

module.exports = {
  onCreateGroup,
  onGetAllGroups,
  onDeleteGroup,
  onUpdateGroup,
  addHandlers
}
