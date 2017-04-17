import { h, Component } from 'preact'


export default class Page extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="centered post-page">
                <article class="post">
                    <h2 className="post-title">404 - Not Found</h2>
                    <h2 className="post-subtitle">你请求的内容不存在或链接错误。</h2>
                </article>
            </section>
        );
    }
}
