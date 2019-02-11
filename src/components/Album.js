import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
          });
      
          this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            volume: album.songs[0].volume,
            duration: album.songs[0].duration,
            isPlaying: false
          };

          this.audioElement = document.createElement('audio');
          this.audioElement.src = album.songs[0].audioSrc;
      }
    
   componentDidMount() {
    this.eventListeners = {
        timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
            this.setState({ duration: this.audioElement.duration });
        },
        volumechange: e => {
            this.setState({volume: this.audioElement.volume})
        }
      };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }
    
    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }
    
    play() {
        this.audioElement.play();
        this.setState({isPlaying:true});
    } 
    
    pause() {
        this.audioElement.pause();
        this.setState({isPlaying:false});
    }
    
    setSong(song){
        this.setState({currentSong:song});
        this.audioElement.src = song.audioSrc;
    }
    
    handleSongClick(song) {
        let isSameSong = this.state.currentSong === song;
        if(isSameSong && this.state.isPlaying) {
            this.pause();
        }
        else {
            if (!isSameSong) {
                 this.setSong(song); 
                }
            this.play();
        }
    }
    
    handlePrevious() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    handleNext() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    handleTimeChange(e) {
        const newTime = this.audioElement.duration * (e.target.value/100);
        this.audioElement.currentTime = newTime;
        this.setState({currentTime: newTime});
        console.log(this.state.currentTime);
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({volume: newVolume});
    }

    enter(key) {
        let span = document.getElementById(key);
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        let id = span.id.split('_')[1];
        if(this.state.isPlaying === true && ((currentIndex + 1) == id))
        {
            span.innerHTML = '<ion-icon name="pause"></ion-icon>';
        }
        else
        {
            span.innerHTML = '<ion-icon name="play"></ion-icon>';
        }
    } 
    
    leave(key) {
        let span = document.getElementById(key);
        let id = span.id.split('_')[1]
        span.innerHTML = id;
    }
    
    reset(key) {
        let span = document.getElementById(key)
        let id = span.id.split('_')[1];
        span.innerHTML = id;
    }

    formatTime(seconds) {
        if(isNaN(seconds)) return '-:--';
        if(seconds <= 60 ) return '0:' + Math.round(seconds,0);
        let minutes = Math.floor(seconds/60);
        if(minutes <= 0) return 0 + ':' + seconds;
        let remainder = Math.round(Math.floor(seconds - minutes * 60),0);
        if(remainder < 10)
        {
            remainder = '0' + remainder;
        }
        return minutes + ':' + remainder;
    }
    
    render() {
        return (
            <section className='Album'>
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list" align='center' border='solid'>
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>  
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Duration</th>
                        </tr>
                        {
                            this.state.album.songs.map( (song, index) =>
                                <tr className='song' 
                                    key={index + 1} 
                                    onClick={() => this.handleSongClick(song,`span_${index + 1}`)} 
                                    onMouseEnter={() => this.enter(`span_${index + 1}`)} 
                                    onMouseLeave={() => this.leave(`span_${index + 1}`)}>
                                    <td>
                                        <span id={`span_${index + 1}`}>{index + 1}</span>
                                    </td>
                                    <td key='title'>{song.title}</td>
                                    <td key='duration'>{this.formatTime(song.duration)} seconds</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.formatTime(this.audioElement.currentTime)}
                    duration={this.formatTime(this.audioElement.duration)}
                    currentVolume={this.audioElement.currentVolume}
                    volume={this.audioElement.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevious = {() => this.handlePrevious()}
                    handleNext = {() => this.handleNext()}
                    handleTimeChange ={(e) => this.handleTimeChange(e)}
                    handleVolumeChange = {(e) => this.handleVolumeChange(e)}
                />
            </section>
        );
    }
}

export default Album;