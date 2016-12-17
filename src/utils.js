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