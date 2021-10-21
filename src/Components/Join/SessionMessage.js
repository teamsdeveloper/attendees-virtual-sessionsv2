import {MessageBar} from "@fluentui/react"

function SessionMessage({message, type}) {
    const getCss=()=>{
        if(type === "error")
            return "alert alert-danger";
        if(type === "warning")
            return "alert alert-warning";
        return "alert alert-info";
    }    
    return(<div className={getCss()} role="alert" style={{textAlign: "center"}}>
    {message}
</div>)
}

export default SessionMessage;