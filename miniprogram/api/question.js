import request from '../utils/request.js'

export const getNavData = (wx,data = {}) => request(wx, {
  name: 'squareNav',
  data
})

export const getQuestion = (wx, data = {}) => request(wx, {
  name: 'getQuestionList',
  data
})

export const addQuestion = (wx, data = {}) => request(wx, {
  name: 'createQuestion',
  data
})