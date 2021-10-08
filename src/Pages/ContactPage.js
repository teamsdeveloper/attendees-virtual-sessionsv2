import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";

function ContactPage(){
    document.body.classList.remove("home"); 
    document.body.classList.add("page");
    document.body.classList.add("page-template");
    
    return (<>
        <Banner page={"Contact"}/>
        
<section>
    <div id="lgx-contact" class="lgx-contact">
        <div class="lgx-inner" style={{paddingTop: "59px", paddingBottom: "5px"}}>
            <div class="container">
                              <div class="row">

                    <div class="col-sm-12 col-md-6">

                        <form method="POST" class="lgx-contactform" action="php/form-handler.php">
                            <div class="form-group">
                                <input type="text" name="lgxname" class="form-control lgxname" id="lgxname" placeholder="Enter Your Name" required/>
                            </div>

                            <div class="form-group">
                                <input type="email" name="lgxemail" class="form-control lgxemail" id="lgxemail" placeholder="Enter email" required/>
                            </div>

                            <div class="form-group">
                                <input type="text" name="lgxsubject" class="form-control lgxsubject" id="lgxsubject" placeholder="Subject" required/>
                            </div>

                            <div class="form-group">
                                <textarea class="form-control lgxmessage" name="lgxmessage" id="lgxmessage" rows="5" placeholder="We expect drop some line from you..." required></textarea>
                            </div>

                            <div class="form-group">
                                <label class="lgxsendme-area">
                                    <input  name="lgxsendme" value="on" type="checkbox"/> Copy Me
                                </label>
                            </div>

                            <button type="submit" name="submit" value="contact-form" class="lgx-btn lgx-btn-big hvr-glow hvr-radial-out lgxsend lgx-send"><span>Send Massage</span></button>
                        </form>

                        
                        <div id="lgx-form-modal" class="modal fade lgx-form-modal" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content lgx-modal-content">
                                    <div class="modal-header lgx-modal-header">
                                        <button type="button" class="close brand-color-hover" data-dismiss="modal" aria-label="Close">
                                            <i class="fa fa-power-off"></i>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <div class="alert lgx-form-msg" role="alert"></div>
                                    </div> 

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="contact-info">
                            <div class="lgx-box">
                                <span class="lgx-icon"><i class="fa fa-map-marker"></i></span>
                                <div class="address">
                                    <h3 class="title">Location</h3>
                                    <p>795 Folsom Ave, Suite 600 <br/>
                                        San Francisco, CA 94107.</p>
                                    <p>SKYPE:jhon.doe</p>
                                </div>
                            </div>
                            <div class="lgx-box">
                                <span class="lgx-icon"><i class="fa fa-headphones"></i></span>
                                <div class="address">
                                    <h3 class="title">Contact Info</h3>
                                    <p>PHONE:+2545-8546-XXX</p>
                                    <p>+2545-8546-XXX</p>
                                    <p>SKYPE:jhon.doe</p>
                                </div>
                            </div>
                            <div class="lgx-box">
                                <span class="lgx-icon"><i class="fa fa-envelope"></i></span>
                                <div class="address">
                                    <h3 class="title">Mail Info.</h3>
                                    <p>Email:jhon.doe@example.com</p>
                                    <p>jhon.doe@example2.com</p>
                                    <p>FAX:jhon.doe</p>
                                </div>
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

export default withFooter(ContactPage);