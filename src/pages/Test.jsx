import { useEffect, useMemo, useCallback, useState, useRef,lazy, Suspense } from "react";

const TestFile = lazy(() => import("../components/TestFile"));
function Test({test,onTestingFunction,favorites}){
const [movies, setMovies] = useState([]);
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const [searchTerm, setSearchTerm] = useState("Avengers");
const searchInputRef = useRef(null);
    const fetchMovies= async (searchTerm, page = 1)=>{
        const response = await fetch( `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
                        searchTerm
                    )}&type=movie&page=${page}`);
        const data = await response.json();
        if (data.Response === "True") {
            setMovies(data.Search);
        }
    }
    const filteredMovies = useMemo(() => {

            console.log("Filtering movies...");

            return movies.filter(
                movie => Number(movie.Year) > 2000
            );

        }, [movies]);
    const handleFavorite = useCallback((movie) => {

        console.log("Adding favorite:", movie.Title);

    }, []);

    useEffect(()=>{
        fetchMovies("Avengers",1)
    },[])
    const focusSearch = () => {
        searchInputRef.current.focus();
    };
    return(
        <div>
                    <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
            <h3>{test}</h3><br></br>
            <h3>{onTestingFunction()}</h3>
           
          
               {favorites.map((favorite) =>(
                <Suspense fallback={<p>Loading...</p>}>
                <TestFile key={favorite.imdbID} favorite= {favorite}  onFavorite={handleFavorite}/>
                   </Suspense>
                )
            )}

            <button  className="wishlist-button" onClick={focusSearch}>
        Focus Search
    </button>
        <p>this is the newly fetched container</p>
        <ul>
            <div>
                {filteredMovies.map((movie)=>
                <div key={movie.imdbID}>
                    <p>{movie.Title}</p>
                    <p>{movie.Year}</p>
                    <p>{movie.imdbID}</p>
                    <hr></hr>
                </div>
                )}
            </div>
        </ul>
        </div>
    );
}

export default Test;