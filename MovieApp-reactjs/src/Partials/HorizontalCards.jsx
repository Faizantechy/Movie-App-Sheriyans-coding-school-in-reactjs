import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'

function HorizontalCards() {
    const [selectVal, setSelectVal] = useState('tv');
    const [results, setResults] = useState([]);

    const dropDownData = async () => {
        const { data } = await axios.get(`/${selectVal}/popular`);
        setResults(data.results);
        console.log(results);
    };

    useEffect(() => {
        console.log(selectVal);
        dropDownData();
    }, [selectVal]);

    return (
        <div className="w-full px-5 py-4">
            <div className="dropdown flex justify-between">
                <h1 className="text-2xl font-bold">Trending</h1>
                <select
                    className="text-black w-[150px] font-bold outline-none border-none"
                    value={selectVal}
                    onChange={(e) => setSelectVal(e.target.value)}
                >
                    <option value="tv">Tv</option>
                    <option value="movie">Movies</option>
                    <option value="all">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="mystery">Mystery</option>


                </select>
            </div>

            <div className="horizontal-cards flex overflow-x-auto w-full mt-5 space-x-5">
                {/* Mapping through results */}
                {results.map((item) => (
                    <div key={item.id} className="card flex-none w-[300px] bg-transparent rounded-lg overflow-hidden border">
                        {/* Using a fixed aspect ratio for images */}
                        <img
                            src={`https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}`}
                            alt={item.title || item.name}
                            className="w-full h-[200px] object-cover"
                        />
                        <h2 className="text-xl font-bold ml-4 mt-1">{item.name}</h2>
                        <p className="p-2">
                            {item.overview ? item.overview.slice(0, 100) : 'Overview Not Found...'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HorizontalCards;
