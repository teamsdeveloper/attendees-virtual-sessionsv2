import Speaker from "./Speaker";

function Speakers(props){
    return(
        <section>
            <div id="lgx-speakers" className="lgx-speakers">
                <div className="lgx-inner" style={props.styles !== undefined ? props.styles : null}>
                    <div className="container">
                            <div className="row" >
                                {props.speakers.map((speaker, index)=> <Speaker key={index} {...speaker}/>)}
                                
                            </div>
                    </div>
              </div>
            </div>
        </section>
    );
}

export default Speakers;