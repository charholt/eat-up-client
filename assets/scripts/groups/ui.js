const showGroupsTemplate = require('../templates/handlebars/group-listing.handlebars')
const openedGroup = require('../templates/handlebars/group-page.handlebars')
const ownerButtons = require('../templates/group-buttons.handlebars')
const store = require('../store')

const getGroupsSuccess = (data) => {
  const showGroupsHtml = showGroupsTemplate({
    events: data.groups
  })
  $('.content').html(showGroupsHtml)
  $('form').trigger('reset')
}

const getGroupsFailure = function (data) {
  $('.status-message').text('Error on getting events')
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  // console.data('did not get any events', data)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 3000)
}

const openGroupSuccess = data => {
  store.current_event = data.event
  const openGroupHTML = openedGroup({
    event: data.event,
    user: store.user
  })
  $('.content').html(openGroupHTML)
  if (store.user && data.event.owner === store.user._id) {
    const ownerButtonsHTML = ownerButtons({
      event: data.event,
      editable: true
    })
    $('.content').append(ownerButtonsHTML)
  }
  // $('.status-message').text('Attending this Group?').show()
  // setTimeout(function () {
  //   $('.status-message').fadeOut()
  // }, 3000)
}

const clearGroups = () => {
  $('.content').empty()
  $('.status-message').text('Cleared all the groups').show()
  // setTimeout(function () {
  //   $('.status-message').fadeOut()
  // }, 3000)
}

const createGroupSuccess = (data) => {
  $('#create-event-modal').modal('hide')
  $('.modal-backdrop').hide()
  $('.status-message').text('You created a group').show()
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 3000)
}

const createGroupFailure = function (data) {
  $('.status-message').text('Error on creating a group').show()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  $('#create-event-modal').modal('hide')
  $('.modal-backdrop').hide()
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 3000)
}

const showGroupsSuccess = () => {
  $('form').trigger('reset')
}

const showGroupsFailure = function (data) {
  $('.status-message').text('Error on getting a group').show()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 3000)
}

const updateGroupsSuccess = () => {
  $('.status-message').text('You updated your group!').show()
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 3000)
  $('.status-message').addClass('success')
  $('form').trigger('reset')
  $('#update-event-modal').modal('hide')
  $('.modal-backdrop').hide()
}

const updateGroupsFailure = function (data) {
  $('.status-message').text('Error on updating your group').show()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 3000)
  $('#update-event-modal').modal('hide')
  $('.modal-backdrop').hide()
}

const deleteGroupsFailure = function (data) {
  $('.status-message').text('Error on deleting your group').show()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 3000)
}

const deleteGroupSuccess = () => {
  $('.status-message').text('You deleted your group.').show()
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 3000)
  $('form').trigger('reset')
}

const failure = (data) => {
  $('modal').modal('hide')
  $('.modal-backdrop').hide()
  $('.status-message').text('An Error Occurred').css('color', 'red').show()
  // console.data('Error!', data)
}

module.exports = {
  clearGroups,
  failure,
  getGroupsSuccess,
  getGroupsFailure,
  createGroupSuccess,
  createGroupFailure,
  deleteGroupsFailure,
  updateGroupsSuccess,
  updateGroupsFailure,
  showGroupsSuccess,
  showGroupsFailure,
  openGroupSuccess,
  deleteGroupSuccess
}
