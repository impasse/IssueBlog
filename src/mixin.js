import marked from 'marked'
import moment from 'moment'
import highlight from 'highlight.js'

import 'highlight.js/styles/github.css'

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

export default {
    methods: {
        marked(v) {
            return marked(v || '');
        },
        init(v) {
            v = v || ''
            const i = v.indexOf('<!--more-->');
            return v.substring(0, i >= 0 ? i : undefined)
        },
        format_date(date) {
            return moment(date).format('YYYY/M/D');
        },
        tag_color(tag) {
            if (tag) {
                const c = parseInt(tag.color, 16)
                const [r, g, b] = [c >> 16, (c & 0xff00) >> 8, c & 0xff];
                return {
                    backgroundColor: '#' + tag.color,
                    color: (r * 0.299 + 0.587 * g + 0.114 * b) < 128 ? 'white' : 'black'
                };
            } else {
                return {};
            }
        }
    }
};