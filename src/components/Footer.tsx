import { h, Component } from 'preact'


export default class Footer extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer">
                <div className="centered">
                    <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" className="hide-on-mobile">CC BY-NC-ND 4.0</a>
                    <span className="hide-on-mobile">&nbsp;</span>
                    <span>©&nbsp;</span>
                    <a href="https://github.com/lingmm">shyling</a>
                </div>
            </footer>
        );
    }
}
