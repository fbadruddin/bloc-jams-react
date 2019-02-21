import React from 'react';

const Landing = () => (
    <div className="container-fluid">
        <div><h1 className="hero-title">Turn the music up!</h1></div>
        <div className="card background">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h2 className="point-title">Choose your music</h2>
                        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
                    </div>
                    <div className="col-sm-5">
                        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                        <p className="point-description">No arbitrary limits. No distractions.</p>
                    </div>
                    <div className="col">
                        <h2 className="point-title">Mobile enabled</h2>
                        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                    </div>
                </div>    
            </div>
        </div>
    </div>
        
            
        
    
);

export default Landing;