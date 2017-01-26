import markdown from 'marked'
import highlight from 'highlight.js'


// maybe need escape
export const genLinks = links => {
    let out = '<ul>';
    for (let link of links.split(/\r?\n/)) {
        let [name, url, title] = link.split('|');
        if (name && url) {
            out += `<li><a target="_blank" href="${url}" title="${title ? title : name}">${name}</a>`;
        }
    }
    return out + '</ul>';
}


markdown.setOptions({
    renderer: new markdown.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

export const marked = t => markdown(t)