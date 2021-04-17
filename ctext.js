function gpc ( name ) {

    // We generate a pair of numbers each of which is unique to the student
    var val;
    switch (name.substr(0,18)) {
        case "James T. Kirk": val=1;  break;
        case "Mr. Spock": val=1;  break;
        case "Leonard B. McCoy": val=1;  break;
        default: val=345; break;
    }
    
        val = val + 132;
    
    return [ val , val + val%100-50 ];
}

function oks () {
    par = document . getElementById ( "q_par" );
    sname = document . getElementById ( "global-nav-link" ) . innerText;
    
    // If the string ends with "Activity Updates", throw it away
    let sspos = sname.search(" Activity Updates");
    if ( sspos >= 0 ) {
        sname = sname.substring (0 , sspos ) ;
    }
    sspos = sname.search("Activity Updates");
    if ( sspos >= 0 ) {
        sname = sname.substring (0 , sspos ) ;
    }
    
    var v = gpc(sname);
    
    var text = "If V and W are vector spaces with dim V = " + v[0] + " and dim W = " + v[1] + ", then for a linear map T from V to W the maximal possible rank is m and the minimal possible nullity is n.";
    
    par.innerText = text;
    
}
