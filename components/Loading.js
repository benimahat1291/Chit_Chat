import {Circle} from "better-react-spinkit"

const Loading = () => {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                src="/chatlogo.png" 
                alt="logo" 
                height={200}
                style={{marginBottom: 10}}>
                </img>

                <Circle color="lightBlue" size={60}/>
                
            </div>

        </center>
    )
}

export default Loading
