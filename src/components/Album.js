import React, {Component} from 'react';
import albumData from './../data/albums';


class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
          });
      
          this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            currentSpan: 'span_1'
          };

          this.audioElement = document.createElement('audio');
          this.audioElement.src = album.songs[0].audioSrc;
      }
    play(key) {
        this.audioElement.play();
        this.setState({isPlaying:true});
        let span = document.getElementById(key);
        span.innerHTML = '<ion-icon name="pause"></ion-icon>';
        this.setState({currentSpan:key});
    } 
    pause(key) {
        this.audioElement.pause();
        this.setState({isPlaying:false});
    }
    setSong(song,key){
        this.setState({currentSong:song});
        this.audioElement.src = song.audioSrc;
        this.setState({currentSpan:key});
    }
    handleSongClick(song,key) {
        let isSameSong = this.state.currentSong === song;
        if(isSameSong && this.state.isPlaying) {
            this.pause(key);
        }
        else {
            if (!isSameSong) {
                this.reset(this.state.currentSpan);
                 this.setSong(song,key); 
                }
            this.play(key); 
        }
    }
    enter(key) {
        let span = document.getElementById(key);
        if(span.innerHTML.indexOf('pause') === -1)
        {
            span.innerHTML = '<ion-icon name="play"></ion-icon>';
        }
    } 
    leave(key) {
        let span = document.getElementById(key);
        if(span.innerHTML.indexOf('pause') === -1)
        {
            let id = span.id.split('_')[1]
            span.innerHTML = id;
        }
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
            </section>
        );
    }
}

export default Album;