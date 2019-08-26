'use strict'

const config = require('../config')
const store = require('../store')

const createGroup = formData => {
  return $.ajax({
    url: config.apiUrl + '/group',
    data: {event: formData},
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    method: 'POST'
  })
}

const updateGroup = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/group/' + store.group_id,
    method: 'PATCH',
    data: {
      event: formData
    }
  })
}

const getAllGroups = function () {
  return $.ajax({
    url: config.apiUrl + '/group',
    method: 'GET'
  })
}

const deleteGroup = eventId => {
  return $.ajax({
    url: config.apiUrl + '/group/' + eventId,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const openGroup = id => {
  store.event_id = id
  return $.ajax({
    url: config.apiUrl + `/group/${id}`
  })
}

module.exports = {
  createGroup,
  getAllGroups,
  deleteGroup,
  updateGroup,
  openGroup
}
