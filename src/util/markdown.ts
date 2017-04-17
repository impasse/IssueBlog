import * as marked from 'marked'
import * as highlight from 'highlight.js'

import 'highlight.js/styles/solarized-light.css'

marked.setOptions({
    renderer: new marked.Renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: (code) => highlight.highlightAuto(code).value
});

export default text => marked(text || '');
