import DropDownComp from '../components/DropDownComp';
import Loading from '../components/Loading';
import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'




function HorizontalCards() {
    const [selectVal, setSelectVal] = useState('tv');
    const [results, setResults] = useState([]);
    const dropDownData = async () => {
        let endPoints = '';
    
        if (selectVal === 'top-rated') {
            endPoints = '/movie/top_rated';
        } else if (selectVal === 'airing-today') {
            endPoints = '/tv/airing_today';
        } else if (selectVal === 'drama') {
            endPoints = '/discover/tv?with_genres=18';
        }
        else {
            
            endPoints='/trending/all/day'
        }

      
    
        // Ensure this part runs only after determining the endpoint
        const { data } = await axios.get(`${endPoints}`);
        setResults(data.results);
        console.log(results);
    };

    useEffect(() => {
        console.log(selectVal);
        dropDownData();
    }, [selectVal]);

    return (

        <>
            <div className="w-full px-5 py-4">
                

            <div className="dropdown flex justify-between">
            <h1 className="text-2xl font-bold">Trending</h1>
                
                    <DropDownComp selectVal={selectVal} setSelectVal={setSelectVal} title='category' options={['tv','top-rated','airing-today','movie','drama']}  />
                    
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
                        <h2 className="text-xl font-bold ml-4 mt-2">{item.name? item.name:'Movie!'}</h2>
                        <p className="p-2">
                            {item.overview ? item.overview.slice(0, 100) : 'Overview Not Found...'}
                        </p>
                    </div>
                ))}
            </div>

            </div>


            
        </>
        

    );


}

export default HorizontalCards;
