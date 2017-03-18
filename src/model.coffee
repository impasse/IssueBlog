require 'whatwg-fetch'
{ owner, repo } = require './const'

Post =
  perfix: 'https://api.github.com'
  get: (number) ->
    fetch "#{Post.perfix}/repos/#{owner}/#{repo}/issues/#{number}",
      cors: 'include'
    .then (res) ->
      res.json()
        .then (data) ->
          title: data.title
          date: data.created_at
          body: data.body
          state: data.state
          number: data.number
          tags: data.labels.map (label) ->
            name: label.name
            color: label.color
  all: () ->
    fetch "#{Post.perfix}/repos/#{owner}/#{repo}/issues?creator=#{owner}&state=all",
      cors: 'include'
    .then (res) ->
      res.json()
        .then (data) ->
          data.filter (single) ->
            single.state != 'closed'
          .map (single) ->
            title: single.title
            state: single.state
            number: single.number
            body: single.body
            date: single.created_at
            tags: single.labels.map (label) ->
              name: label.name
              color: label.color

exports.Post = Post