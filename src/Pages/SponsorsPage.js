import { useContext, useState } from "react";
import { useEffect } from "react";
import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import { GetSponsors } from "../Services/ApiService";
import { STORE_SPONSORS_ACTION } from "../Store/Actions";
import AppContext from "../Store/AppContext";

function SponsorsPage() {
    //const {state, dispatch} = useContext(AppContext);
    const [sponsors, setSponsors] = useState([]);
    useEffect(async()=>{
        /*if(state.sponsors.length === 0){
            let sponsors = await GetSponsors();
            dispatch({
                type: STORE_SPONSORS_ACTION,
                payload: sponsors
            })
        }*/

        (async  function () {
           let res = await GetSponsors();
           setSponsors(res);
        })();
    })
    return (<>
        <Banner page={"Sponsors"} />
        <section>
            <div id="lgx-sponsors" className="lgx-sponsors">
                <div className="lgx-inner-bg">
                    <div className="lgx-inner" style={{ paddingTop: "59px", paddingBottom: "5px" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="sponsors-area">
                                        {sponsors.map((url, index)=> {
                                            return <div className="single" key={{index}}>
                                            <a className="" ><img src={url} alt="sponsor" /></a>
                                        </div>
                                        })}
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default withFooter(SponsorsPage);