import React, {Component} from 'react';

class PlayerBar extends React.Component {
    formatMinutesToSeconds(time) {
        let first = time.replace(':','.').split('.');
        if(first[0] !== '0')
        {
            return parseInt(first[0] * 60) + parseInt(first[1]);
        }
        else
        {
            return parseInt(first[1]);
        }
    }

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
                    <div className="current-time">{this.props.currentTime}</div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.formatMinutesToSeconds(this.props.currentTime) || 0)} 
                        max={this.props.duration} 
                        min="0" 
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />   
                    <div className="total-time">{this.props.duration}</div> 
                </section>
                <section id="volume-control">
                    <div className="current-volume">{this.props.volume}</div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.props.volume) || 0} 
                        max="1" 
                        min="0" 
                        step="0.01" 
                        onChange={this.props.handleVolumeChange}
                    />   
                    <div className="total-volume">{this.props.volume}</div> 
                </section>
            </section>
        )
    }
}

export default PlayerBar;