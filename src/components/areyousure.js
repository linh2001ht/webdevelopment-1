import "../App.css"

const IdentifyToExit = () => {
    return (
        <div className="exit-message">
            <p>Are you sure you want to exit?</p>
            <button onClick={() => {
                        window.open("/homepage", "_self");
                        window.close();
                }}>Yes</button>
            <button onClick={() => console.log("keep playing")}>Cancel</button>
        </div>
    );
}

export default IdentifyToExit;