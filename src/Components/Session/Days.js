function Days({tabs, onTabClick, active}){
    return (<ul className="nav nav-pills text-center">
        {tabs.map((tab, index)=> <li className={tab === active ? "active": ""} onClick={()=> onTabClick(tab)} key={index}><a data-toggle="pill"><h3>Day <span>{tab.header}</span></h3> <p><span>{tab.day} </span>{tab.uiDate}</p></a></li>)}
    
    
</ul>);
}

export default Days;