import { h, Component } from 'preact'
import inject from '../util/inject'
import { posts } from '../sources'

@inject({ posts })
export default class Posts extends Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    render({ posts }) {
        return (
            <section className="centered">
                <h2 class="egoist-name">Ling's <span>Blog</span></h2>
                <ul class="post-list">
                    {posts && posts.map(post =>
                        <li class="post-item">
                            <h4 class="post-title">
                                <a href={`/post/${post.id}`}>{post.title}</a>
                            </h4>
                        </li>
                    )}
                </ul>
            </section>
        );
    }
}