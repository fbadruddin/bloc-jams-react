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
                <div className="card-body">
                    <div className="row">
                {
                    this.state.albums.map( (album, index) =>
                        <Link to={`/album/${album.slug}`} key={index}>
                                <div className="col">
                                    <img className="rounded" src={album.albumCover} alt={album.title} height="200" width="200"  />   
                                    <div className="card text-bg-light">
                                        {album.title}
                                        <p>{album.artist}</p>
                                        <p>{album.songs.length} songs</p>
                                    </div>
                                </div>
                        </Link>
                    )
                }
                    </div>
                </div>
            </div>
     );
   }
 }

 export default Library;
