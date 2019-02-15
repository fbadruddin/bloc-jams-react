import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import albumData from './../data/albums'

class Library extends Component {
    constructor(props){
        super(props);
        this.state = { albums: albumData };
    }
    render() {
        return (
            <div className='card'>
            {
                this.state.albums.map( (album, index) =>
                    <Link to={`/album/${album.slug}`} key={index}>
                        <div className="card-body mx-auto">
                            <img className="rounded" src={album.albumCover} alt={album.title} height="400" width="400"/>   
                            <div className="card text-dark bg-light">
                                {album.title}
                                <p>{album.artist}</p>
                                <p>{album.songs.length} songs</p>
                            </div>
                        </div>
                    </Link>
                )
            }
            </div>
     );
   }
 }

 export default Library;
