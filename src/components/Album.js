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
        }
      };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }
    
    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({currentTime: newTime});
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
                                    <td key='duration'>{song.duration} seconds</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevious = {() => this.handlePrevious()}
                    handleNext = {() => this.handleNext()}
                    handleTimeChange ={(e) => this.handleTimeChange(e)}
                />
            </section>
        );
    }
}

export default Album;