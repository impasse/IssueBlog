import { h, Component } from 'preact'
import { inject, markdown } from '../util'
import { page } from '../sources'

@inject({ page })
export default class Page extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render({ page }) {
        page = page || {};
        const { title, subTitle, body } = page;
        return (
            <section className="centered post-page">
                <article class="post">
                    {title && <h2 className="post-title">{title}</h2>}
                    {subTitle && <h2 className="post-subtitle">{subTitle}</h2>}
                    {body && <div className="post-content markdown-body" dangerouslySetInnerHTML={{__html: markdown(body)}}>Loading...</div>}
                </article>
            </section>
        );
    }
}
