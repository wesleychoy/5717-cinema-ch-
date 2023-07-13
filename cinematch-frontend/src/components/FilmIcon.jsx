import React from 'react';

const FilmIcon = ({ film }) => {
    return (
        <div className='film'>
            <div>
                <p>{film.releaseYear.year}</p>
            </div>

            <div>
                <img src={film.primaryImage.url !== 'N/A' ? film.primaryImage.url : "https://placehold.co/900x1378?text=No+Poster"} alt={film.originalTitleText.text} />
            </div>
            
            <div>
                <h3>{film.originalTitleText.text}</h3>
            </div>
        </div>
    );
}

export default FilmIcon;