import { h, Component } from 'preact'
import { markdown, inject } from '../util'
import { post } from '../sources'

@inject({ post })
export default class Post extends Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { post: {} };
    }

    render({ post }) {
        return (
            <section className="centered post-page">
                <article class="post">
                    <h2 className="post-title">{post && post.title}</h2>
                    <div className="post-content markdown-body" dangerouslySetInnerHTML={{__html: post && markdown(post.body)}}>Loading...</div>
                </article>
            </section>
        );
    }
}