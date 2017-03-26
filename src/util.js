import Vue from 'vue'
import { User } from './model'

export function genLinks(links) {
    let out = '<ul>';
    for (const link of links.split(/\r?\n/)) {
        const [name, url, title] = link.split('|');
        if (name && url) {
            out += `<li><a target=\"_blank\" href=\"${url}\" title=\"${title ? title : name}\">${name}</a>`
        }
    }
    return out + '</ul>';
}

export async function loginByGithub() {
    return new Promise(function (resolve, reject) {
        (window.addEventListener || window.attachEvent)('message', async function (event) {
            const origin = event.origin || event.originalEvent.origin;
            if (event.data.code) {
                resolve(event.data.code);
            }
        }, false);
        window.open('/api/authorize', '__blank', 'location=no,menubar=no,status=no,toolbar=no,left=100,top=50,width=1050,height=600');
    });
}