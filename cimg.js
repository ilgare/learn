function oks ( id ) {
    
    var canv = document . createElement ( "canvas" ) ;
    var ctx = canv . getContext ( "2d" ) ;
    
    let qimg = new Image ( ) ;

    qimg.onload = function () {
        
        canv.width = qimg.width;
        canv.height = qimg.height;
        
        ctx.drawImage(qimg, 0, 0);
        
        // This is the element that contains the person's name in the upper right corner.
        var sname = document . getElementById ( "global-nav-link" ) . innerText;
        
        // If the string ends with "Activity Updates", throw it away
        let sspos = sname.search(" Activity Updates");
        if ( sspos >= 0 ) {
            sname = sname.substring (0 , sspos ) ;
        }
        sspos = sname.search("Activity Updates");
        if ( sspos >= 0 ) {
            sname = sname.substring (0 , sspos ) ;
        }
        
        // gpc is called from another file, it generates a unique number pair
        var v = gpc(sname);
        
        var n = v[0] + 151;
        var c = n % 10;
        var b = ((n-c)/10)%10;
        var a = Math.floor(n/100);
        
        // Fill in the blank cells of the matrix
        ctx.font = "50px Arial";
        ctx.fillText ( a , 785, 260);
        ctx.fillText ( b , 860, 260);
        ctx.fillText ( c , 860, 360);     
        
        // This is the cryptic string generated from the student's name.
        var cname = generate_key ( sname, -1 ) ;
    
        // Watermark
        var fontsize = 40;
        var strip = 0.6;
        var cols = 2 ;
        var hs = Math . floor ( canv.width / cols );
        
        var vs = fontsize + 5;
        var rows = Math . ceil ( (canv.height -fontsize/2) / vs );
        rows = Math.max ( rows , 1 ) ;
    
        //draw middle strip
        ctx.globalAlpha = 1 ;
        ctx.fillStyle='#bbbbbb';   
        ctx.fillRect(0, strip*canv.height, canv.width , 2*fontsize+10);
        ctx.fillStyle='#000000'; 
        ctx.font = fontsize . toString () + "px Courier"; 
        ctx.fillText ( sname , 10, strip*canv.height +fontsize +5 );
        ctx.fillText ( "Identifier: " +  cname , 10, strip*canv.height +2*fontsize +5 );
        
        
        // draw watermark
        ctx.globalAlpha = 0.05 ;	
        ctx.font = "bold " + fontsize . toString () + "px Courier";
        
        for ( var i=0; i != rows ; i++ ) {
          for ( var j=0 ; j != cols ; j++ ) {
                ctx.fillText ( cname , j*hs  , fontsize/2 + ( i + 0.5 )*vs );
          }
        }          

        var qimg2 = document . getElementById ( id );
        qimg2.src = canv . toDataURL () ;
    };

    qimg.src = document . getElementById ( id ). src;
    
}

// Caesar ciphering
function caesar ( text, shift ) {
    
    // Replace non-English characters, remove dots etc.
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

// Generate the cryptic "key"
function generate_key ( text , shift = 1 ) {
    
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
        output += String . fromCharCode ( 97 + word . length );
        output += word . charCodeAt ( 0 )  ;
        output += "-" ;
    }


    output += Math . pow ( text . length , 2 );
    output += Math . pow ( arrlen , 2);
    
    return output ;
    
}
