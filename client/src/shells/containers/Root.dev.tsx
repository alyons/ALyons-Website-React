import * as React from 'react';
import { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';

export interface IRootProps {
    store: any; // TODO: Define this
    history: any; // TODO: Define this
}

export interface IRootState {
}

export default class Root extends Component<IRootProps, IRootState> {
    static propTypes = {
        history: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    };

    componentWillMount() {
        const { store } = this.props;
    }

    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} />
                </div>
            </Provider>
        );
    }

}