import React from 'react';

const FilmIcon = ({ film }) => {
    return (
        <div className='film'>
            <div>
                <p>{film.Year}</p>
            </div>

            <div>
                <img src={film.Poster !== 'N/A' ? film.Poster : "https://placehold.co/900x1378?text=No+Poster"} alt={film.Title} />
            </div>
            
            <div>
                <h3>{film.Title}</h3>
            </div>
        </div>
    );
}

export default FilmIcon;