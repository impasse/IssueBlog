import { h, Component } from 'preact'
import { inject, markdown } from '../util'
import { page } from '../sources'

@inject({ page })
export default class Page extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render({ page }) {
        return (
            <section className="centered post-page">
                <article class="post">
                    {page && <h2 className="post-title">{page.title}</h2>}
                    {page && page.subTitle && <h2 className="post-subtitle">{page.subTitle}</h2>}
                    {page && <div className="post-content markdown-body" dangerouslySetInnerHTML={{__html: markdown(page.body)}}>Loading...</div>}
                </article>
            </section>
        );
    }
}
