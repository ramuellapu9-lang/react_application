import SubTestFile from "./subTestFile";
function TestFile({favorite,onFavorite}){

    return (
        <div>
            <h1>demo</h1>
            <h2>{favorite.Title}</h2>

            <button className="wishlist-button" onClick={() => onFavorite(favorite)}>
                Add Favorite
            </button>

        </div>
    );
}

export default TestFile;