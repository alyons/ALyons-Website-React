import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <h1>
                        Alexander Lyons
                    </h1>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <p>Copyright &copy; 2017 Alexander Lyons</p>
                </footer>
            </div>
        );
    }
}