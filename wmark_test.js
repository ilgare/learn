function wm_test ( canv, fontsize = 40, alpha = 0.1, strip=0.6, shift = 1) {

	fontsize = Math.max ( 0 , Math.min ( fontsize, 80));
	alpha = Math.max ( 0 , Math.min ( alpha, 1));
	strip = Math.max ( 0 , Math.min ( strip, 1));
	shift = Math.max ( 0 , Math.min ( shift, 26));
	

    let sname = "James T. Kirk";  
	var cname = generate_key ( sname, shift ) ;

    var cols = 2 ;
	var hs = Math . floor ( canv.width / cols );
    
	var vs = fontsize + 5;
    var rows = Math . ceil ( (canv.height -fontsize/2) / vs );
    rows = Math.max ( rows , 1 ) ;
    

    var ctx = canv . getContext ( "2d" ) ;

	//draw middle strip
	ctx.globalAlpha = 1 ;
	ctx.fillStyle='#bbbbbb';   
	ctx.fillRect(0, strip*canv.height, canv.width , 2*fontsize+10);
	ctx.fillStyle='#000000'; 
	ctx.font = fontsize . toString () + "px Courier"; 
	ctx.fillText ( sname , 10, strip*canv.height +fontsize +5 );
	ctx.fillText ( "Identifier: " +  cname , 10, strip*canv.height +2*fontsize +5 );
	
    
    // draw watermark
	ctx.globalAlpha = alpha ;	
	ctx.font = "bold " + fontsize . toString () + "px Courier";
	
	for ( var i=0; i != rows ; i++ ) {
	  for ( var j=0 ; j != cols ; j++ ) {
			ctx.fillText ( cname , j*hs  , fontsize/2 + ( i + 0.5 )*vs );
	  }
	}

	//guiding dots and line
	ctx.globalAlpha = 1 ;
	var dotstep = canv.height / 10;
	for (var t =1; t < 10 ; t ++) {
		 ctx.fillRect(0, t*dotstep,5,5);
		 if (t==5) {
			 ctx.fillRect(0, t*dotstep,15,5);
		 }
	}
	ctx.fillRect(10, 20 , 5, 40);
}

function caesar ( text, shift ) {
    
    text = text . replace ( /\./g , "" ) ;
    text = text . toLowerCase ( ) ;
    text = text . replace ( /ç/g , "c" ) ;
    text = text . replace ( /ğ/g , "g" ) ;
    text = text . replace ( /İ|ı/g , "i" ) ;
    text = text . replace ( /ö/g , "o" ) ;
    text = text . replace ( /Ş|ş/g , "s" ) ;
    text = text . replace ( /ü/g , "u" ) ;  
    text = text . replace ( /[^a-z\s]/g , "" ) ; 

    
    var output = "";
    
    textlen = text.length;
    for (var i =0; i<textlen; i++) {
      if ( text[i] != " ") {
          output += String.fromCharCode(( (text[i]).charCodeAt(0)-97 + shift ) % 26 + 97);
      } else {
          output += " ";
      }
    }
    return output;
          
}

function generate_key ( text , shift = 12 ) {
    
    text = caesar ( text, shift ) ;

    if ( text . length > 18) {
		text = text . substr ( text . length - 18 ) ;
	}
    
    arr = text . split ( " " ) ;

    arrlen = arr . length ;
    
    if ( arrlen == 0 ) {
		return "";
	}
    
    output = "" ;
    
    for ( var i = arrlen-1; i >= 0; i -- ) {
        
        let word = arr [ i ] ;
        if ( word . length == 0 ) {
			continue;
		}
        output += word ;
        output += String . fromCharCode ( 100 + word . length );
        output += word . charCodeAt ( 0 )  ;
        output += "-" ;
    }


    output += Math . pow ( text . length , 2 ) + 4;
    output += Math . pow ( arrlen , 2);
    
    return output ;
    
}
