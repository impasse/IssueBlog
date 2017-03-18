marked = require 'marked'
dateutil = require 'dateutil'
highlight = require 'highlight.js'
require 'highlight.js/styles/github.css'

marked.setOptions
  renderer: new marked.Renderer
  gfm: true
  tables: true
  breaks: true
  pedantic: false
  sanitize: false
  smartLists: true
  smartypants: false
  highlight: (code) -> highlight.highlightAuto(code).value

module.exports =
  methods:
    marked: (v) -> marked v
    init: (v) ->
      v = v || ''
      i = v.indexOf '<!--more-->'
      v.substring 0, if i >= 0 then i else undefined
    format_date: (date) -> dateutil.format (if date then new Date(date) else new Date()), 'Y/m/d'
    tag_color: (tag) ->
      if tag
        c = parseInt tag.color, 16
        [ r, g, b ] = [ c >> 16, (c & 0xff00) >> 8, c & 0xff ]
        backgroundColor: '#' + tag.color
        color: if (r * 0.299 + 0.587 * g + 0.114 * b) < 128 then 'white' else 'black'
      else
        {}