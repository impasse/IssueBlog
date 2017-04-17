import { h, Component } from 'preact'
import { Observable } from 'rxjs'
import * as shadowCompare from 'react-addons-shallow-compare'

function resolve(key, value, isReSubscribe) {
    if (value instanceof Promise) {
        value
            .then(val => {
                this.setState({ ...this.state, [key]: val });
            })
            .catch(e => {
                if ((this as any).onError) {
                    (this as any).onError(e, key);
                }
            });
    } else if (isReSubscribe && value instanceof Observable) {
        const subject = value.subscribe(val => {
            this.setState({ ...this.state, [key]: val });
        },
            e => {
                if ((this as any).onError) {
                    (this as any).onError(e, key);
                }
            },
            () => {
                this.setState({
                    ...this.state,
                    subjects: this.state.filter(v => v !== subject)
                });
            });
        this.setState({
            ...this.state,
            subjects: this.state.subjects.concat([subject])
        });
    } else {
        this.setState({
            ...this.state,
            [key]: value
        });
    }
}

function shadowFilter(obj, ...to) {
    const ret = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && to.indexOf(key) < 0) {
            ret[key] = obj[key];
        }
    }
    return ret;
}

export default function inject(sources = {}) {
    return function (ComponentType) {
        return class Inject extends Component<object, any> {
            static displayName = `Inject(${ComponentType.displayName || ComponentType.name})`
            constructor(props) {
                super(props);
                this.state = {
                    subjects: []
                };
            }

            doSubscribe(isUpdate) {
                for (const key in sources) {
                    const value = typeof sources[key] === 'function' ? sources[key].call(this, this.props, this.state) : sources[key];
                    resolve.call(this, key, value, !isUpdate);
                }
            }

            doUnSubscribe() {
                for (const subject of this.state.subjects) {
                    subject.dispose();
                }
                this.setState({
                    ...this.state,
                    subjects: []
                });
            }

            componentDidMount() {
                this.doSubscribe(false);
            }

            componentWillUnmount() {
                this.doUnSubscribe();
            }

            shouldComponentUpdate(nextProps) {
                return shadowCompare(this, this.props, nextProps);
            }

            componentDidUpdate(prevProps, prevState) {
                this.doSubscribe(true);
            }

            forceUpdate(cb) {
                this.doUnSubscribe();
                this.doSubscribe(false);
                super.forceUpdate(cb);
            }

            render(props, state) {
                return h(ComponentType, { ...props, ...shadowFilter(state, 'subjects') }, ...props.children);
            }
        } as typeof ComponentType;
    }
}
