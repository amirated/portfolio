import React from 'react';

// import dayIcon from '../images/day_icon.svg';
import DayIcon from '../icons/dayIcon';


class ThemeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }
    }

    render() {
        return (
            <div>
                <DayIcon name="dayicon" width={100} fill="#000000" />
            </div>
        )
    }
}

export default ThemeButton;