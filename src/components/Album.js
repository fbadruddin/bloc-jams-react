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
            isPlaying: false
          };

          this.audioElement = document.createElement('audio');
          this.audioElement.src = album.songs[0].audioSrc;
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
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
        console.log('Is playing ' + this.state.isPlaying);
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
                                <tr className='song' key={index} onClick={() => this.handleSongClick(song)}>
                                    <td>{index + 1}</td>
                                    <td>{song.title}</td>
                                    <td>{song.duration} seconds</td>
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