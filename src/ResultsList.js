import React from 'react';
import PropTypes from 'prop-types';
import './ResultsList.css'

class ResultsList extends React.Component {
    static propTypes = {
        results: PropTypes.object
    };

    render() {
        var items = Object.keys(this.props.results).map(key => {
            return <div className="Results-item" key={key}>{key}  →   {this.props.results[key]}</div>;
        });
        return (
            <div className="Results">
                { items }
            </div>
        );
    }
}

export default ResultsList;