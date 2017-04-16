import { h, Component } from 'preact'


export default class Header extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <h1 className="site-name">
                    <a href="/">Ling's</a>
                </h1>
                <ul className="nav">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/page/link">Links</a>
                    </li>
                    <li>
                        <a href="/page/about">About</a>
                    </li>
                </ul>
            </header>
        );
    }
}