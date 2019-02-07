import React, {Component} from 'react';

class PlayerBar extends React.Component {
    render() {
        return (
            <section name ='player-bar'>
                <section id="buttons">
                    <button id="previous" onClick = {this.props.handlePrevious}>
                        <span><ion-icon name="skip-backward"></ion-icon></span>
                    </button>
                    <button id="play-pause">
                        {this.props.isPlaying ? 
                            <span className="ion-pause"><ion-icon name="pause"></ion-icon></span> :
                            <span className="ion-play"><ion-icon name="play"></ion-icon></span>  
                        }
                    </button>
                    <button id="next" onClick={this.props.handleNext}>
                        <span className="ion-skip-forward"><ion-icon name="skip-forward"></ion-icon></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">–:––</div>
                    <input type="range" className="seek-bar" value="0" />
                    <div className="total-time">–:––</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-volume-low"></div>
                    <input type="range" className="seek-bar" value="80" />
                    <div className="icon ion-volume-high"></div>
                </section>
            </section>
        )
    }
}

export default PlayerBar;