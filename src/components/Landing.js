import React from 'react';

const Landing = () => (

    <div>
        <div className="row">
            <div className="col">
                <h1 className="shadow p-3 mb-5 bg-white rounded">
                    Turn the music up!
                </h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 className="point-title">Choose your music</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>    
        </div>    
            <div className="row">
                <div className="col">
                    <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                </div>
            </div>
            <div className="row"> 
              <div className="col">
                    <p className="point-description">No arbitrary limits. No distractions.</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <h2 className="point-title">Mobile enabled</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                </div>
            </div>   
    </div>    
);

export default Landing;