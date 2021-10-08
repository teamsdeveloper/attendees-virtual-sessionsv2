import { Link } from "react-router-dom";

function Speaker({id,name,role,facebook,twitter,instagram,linkedIn,imageUrl}) {
    return (<div className="col-xs-12 col-sm-6 col-md-3">
        <div className="lgx-single-speaker lgx-single-speaker-sm">
            <figure>
                <Link className="profile-img" to={`/speakers/${id}`}>
                    <img src={imageUrl} alt="speaker" />
                </Link>
                <figcaption>
                    <a className="sp-tw" href="#"><i className="fa fa-twitter"></i></a>
                    <a className="sp-fb" href="#"><i className="fa fa-facebook"></i></a>
                    <a className="sp-insta" href="#"><i className="fa fa-instagram"></i></a>
                    <a className="sp-in" href="#"><i className="fa fa-linkedin"></i></a>
                </figcaption>
            </figure>
            <div className="speaker-info">
                <h3 className="title"><Link to={`/speakers/${id}`}>{name}</Link></h3>
                <h4 className="subtitle">{role}</h4>
            </div>
        </div>
    </div>);
}
export default Speaker;