// initial variable setup
var awbs = null;
var awbsLength = 0;//3DTrack
var flagSpaceEnter = false;//3DTrack
var myzeroArrayTrack = new Array();
var pieceIdDiField = "00|J|1J|2J|3J|4J|5J|6J";
var pieceIdIacField = "|0|1|2|3|4|5|6|7|8|9|D|J|KNO|LA|LB|LE|LF|LH|ND|NL|OD|PA|SI|ST|UN|UT|VGL|VIB|";



function updateUI( header, message ) {
    if ( can.$( '.tracking-form-error' ).length == 0 ) {
        can.$( '.shipment_type' ).before( '<div class="tracking-form-error hd"/>' );
    }
    can.$( '.tracking-form-error' ).html( '<p class="error"><strong>' + header + '</strong></p><p class="error">' + message + '</p>' ).removeClass( 'hd' );

    // These two variables are set to enable the live chat popup window to come up.
    // Variables submission using lpAddVars
    if ( typeof(lpAddVars) == 'function' ) {
        lpAddVars('page','lp_Page_Name','sPage');
        lpAddVars('page','lp_Page_Error','True');
    }
}


function fnTrim(inputString, side)
{
    var tempString = "";
    var tempChar = "";
    var count = "";
    var SINGLE_BLANK = " ";
    var inputWidth = 0;
    if (null == inputString)
    {
        tempString = "";
    }
    else
    {
        inputWidth = inputString.length;
        switch (side)
        {
            case 0:
                //left trim
                for (count = 0; count < inputWidth; count++)
                {
                    tempChar = inputString.charAt (count);
                    if (SINGLE_BLANK != tempChar )
                    {
                        tempString = inputString.substring (count, inputWidth);
                        break;
                    }
                }
                break;

            case 1:
                //right trim
                for (count = inputWidth - 1; count >= 0 ; count--)
                {
                    tempChar = inputString.charAt (count);
                    if (SINGLE_BLANK != tempChar )
                    {
                        tempString = inputString.substring (0, count+1);
                        break;
                    }
                }
                break;
            case 2:
                //both trim
                for (count = 0; count < inputWidth; count++)
                {
                    tempChar = inputString.charAt (count);
                    if (SINGLE_BLANK != tempChar )
                    {
                        tempString = inputString.substring (count, inputWidth);
                        break;
                    }
                }
                inputWidth = tempString.length;
                for (count = inputWidth - 1; count >= 0 ; count--)
                {
                    tempChar = tempString.charAt (count);
                    if (SINGLE_BLANK != tempChar )
                    {
                        tempString = tempString.substring (0, count+1);
                        break;
                    }
                }
                break;
        }
    }
    return tempString;
} // end of fnTrim

function strip( instring )
{
    var outstring="";
    var bit="";
    var founddigit=false;
    for( j=0;j<instring.length;j++ )
    {
        c=instring.charAt(j);
        if( c != "," && c != " " && c !="\t" && c !="\n"  && c !="\r" )
        {
            if( founddigit == true )
            {
                outstring+=bit;
            }
            bit="";
            outstring+=c;
            founddigit=true;
        }
        else if( founddigit == true )
        {
            bit+=c;
        }
    }
    return outstring;
}

function isZeroValue()
{
    for( i=0 ; i < awbsLength ; i++ )
    {
        //changed on 200210
        var awbNumTrackLn = fnTrim(awbs[i], 2);
        for(j=0;j<awbNumTrackLn.length;j++){
             
            myzeroArrayTrack[j] = awbNumTrackLn.charAt(j);
             
        }
        
        if( awbNumTrackLn.length == 1 && parseInt( awbs[i] ) == 0 )
        {
            return true;
        }else if(awbNumTrackLn.length > 1){
            
            incTk = 0;
            
            for( k= 0;k<myzeroArrayTrack.length;k++){
                            
                if(parseInt( myzeroArrayTrack[k] ) == 0){
                    
                    
                    incTk = incTk+1;
                    //alert("Inside Inc"+inc);
                }
                
            }
            if(incTk == myzeroArrayTrack.length){
                return true;
            }
        }
    }
}

function isDuplicate()
{
    for( i=0 ; i< awbsLength - 1 ; i++ )
    { 
        awbs[i] = awbs[i].replace(/\s+/g,'');
        awbs[i] = fnTrim(awbs[i], 2);
        for( j=(i+1) ; j< awbsLength ; j++ )
        {
            awbs[j] = fnTrim(awbs[j], 2);
            if(awbs[i].length !=0 && awbs[j].length !=0 )
            {
                if (awbs[i] == awbs[j])
                {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function isDIValid(diValue)
{
    
    var validDIList = pieceIdDiField;

    if( validDIList.indexOf( "|" + diValue + "|" ) != -1
                || validDIList.indexOf( diValue + "|" ) != -1
                ||validDIList.indexOf( "|" + diValue) != -1 )
    {
        return true;
    }
    else
    {
        reasonForReject = "Invalid AI/DI";
        return false;
    }

}

function isIACValid( pieceId, startingIndex )
{

    //Check if the IAC starts with a character

    var iacAsNumber = new Number(pieceId.charAt(startingIndex));

    if( iacAsNumber.toString() != "NaN" )
    {
        reasonForReject = "First IAC char is a number";
        return false;
    }

    var validIACList = pieceIdIacField;

    //Check if the IAC is valid
    if( validIACList.indexOf( "|" + pieceId.substring( startingIndex, startingIndex+3) + "|" ) != -1 )
    {
        //3 digit IAC handled here
        return true;
    }
    else if( validIACList.indexOf( "|" + pieceId.substring( startingIndex, startingIndex + 2) + "|" ) != -1 )
    {
        //2 digit IAC handled here
        return true;
    }
    else if( validIACList.indexOf( "|" + pieceId.substring( startingIndex, startingIndex + 1) + "|" ) != -1 )
    {
        //1 digit IAC handled here
        return true;
                                                                
    }
    else
    {
        reasonForReject = "Invalid IAC";
        return false;
    }
}



function testPiece( pieceId)
{
    //check the max length of teh piece-id along with the special characters and ().
    var pieceIdTmp = pieceId.replace(/[^a-zA-Z0-9]+/g,'');

    //check the min max rule
    if( pieceIdTmp.length < 7 || pieceIdTmp.length > 37 )
    {
        reasonForReject = "Piece id length < 7 or > 37";

        return false;
    }

    //Replace special characters apart from ()
    //var pieceId = "this is a (te)!!!!st st>r23ing**%";
    pieceId =  pieceId.replace(/[^a-zA-Z0-9()]+/g,'');
    
    pieceId = fnTrim(pieceId, 2);

    //Check if piece id starts with "("
    if( pieceId.indexOf("(") == 0 )
    {

        var closingBracketIndex = pieceId.indexOf(")");
        
        //If there is no char between starting and closing bracket
        if( closingBracketIndex != 1 )
        {

            //get the value between brackets
            var valueBetweenBrackets = pieceId.substring(1, closingBracketIndex);
            
            //Check if the DI is present in the valid DI list
            if( isDIValid( valueBetweenBrackets ) )
            {

                //If the DI is 00
                if( valueBetweenBrackets == "00" )
                {

                    var tmpPid = pieceId.substring(closingBracketIndex + 1);
                    
                    var pidAsNumber = new Number(tmpPid);
                    
                    //if this is a valid number
                    if( pidAsNumber.toString() != "NaN" )
                    {
                        var pidlength = pieceId.length;

                        //length must be 22 including ( AI/DI )
                        if( pidlength == 22 )
                        {
                            reasonForSuccess = "Piece id meets all criteria";

                            //Piece Id is valid
                            return true;
                        }
                        else
                        {
                            reasonForReject = "Piece Id length is not 18";
                        }
                    }
                    else
                    {
                        reasonForReject = "Piece Id is not numeric";
                    }

                }
                else
                {
                    //Check if IAC is valid
                    if( isIACValid( pieceId, closingBracketIndex + 1 ) )
                    {
                        //Now check length
                        //get the length of the piece Id
                        pidlength = pieceId.length;

                        if( valueBetweenBrackets == "5J" || 
                        valueBetweenBrackets == "6J" )
                        {       
                            //length must be less than or equal to 24 including ( AI/DI )
                            if( pidlength <= 24 )
                            {
                                reasonForSuccess = "Piece id meets all criteria";

                                //Piece Id is valid
                                return true;
                            }
                            else
                            {
                                reasonForReject = "Piece Id length is  > 20";
                            }
                        }
                        else
                        {

                            if( valueBetweenBrackets == "J" )
                            {
                                //length must be less than or equal to 38 including ( AI/DI )   
                                if( pidlength <= 38 )
                                {
                                    reasonForSuccess = "Piece id meets all criteria";

                                    //Piece Id is valid
                                    return true;
                                }
                                else
                                {
                                    reasonForReject = "Piece Id length is > 35";
                                }
                            }
                            else
                            {
                                //length must be less than or equal to 39 including ( AI/DI )   
                                if( pidlength <= 39 )
                                {
                                    reasonForSuccess = "Piece id meets all criteria";

                                    //Piece Id is valid
                                    return true;
                                }
                                else
                                {
                                    reasonForReject = "Piece Id length is > 35";
                                }
                            }

                            
                        }
                    }
                }
            }
        }
        
    }//End of ( check
    else 
    {

        var diValue = pieceId.substring(0,1);

        if( diValue == "J" )
        {
            reasonForSuccess = "Since it starts with J. No Validation at NGW end.";

            return true;
        }
        else
        {
            diValue = pieceId.substring(0,2);
        }
        
        //Check if the DI is present in the valid DI list
        if( isDIValid( diValue ) )
        {
            //If the DI is 00
            if( diValue == "00" )
            {
                
                pidAsNumber = new Number(pieceId);
                
                //if this is a valid number
                if( pidAsNumber.toString() != "NaN" )
                {
                    pidlength = pieceId.length;

                    //length must be 20 or 18 including AI/DI
                    if( pidlength == 20 || pidlength == 18 )
                    {
                        reasonForSuccess = "Piece id meets all criteria";

                        //Piece Id is valid
                        return true;
                    }
                    else
                    {
                        reasonForReject = "Piece Id length is not 18 or 20";
                    }
                }
                else
                {
                    reasonForReject = "Piece Id is not numeric";
                }
                

            }
            else
            {
                //Check if IAC is valid
                if( isIACValid( pieceId, 2 ) )
                {
                    //Now check length
                    //get the length of the piece Id
                    pidlength = pieceId.length;

                    if( diValue == "5J" || 
                    diValue == "6J" )
                    {           
                        //length must be less than or equal to 22 including AI/DI
                        if( pidlength <= 22 )
                        {
                            reasonForSuccess = "Piece id meets all criteria";

                            //Piece Id is valid
                            return true;
                        }
                        else
                        {
                            reasonForReject = "Piece Id length is not > 20";
                        }
                    }
                    else if( diValue != "J" )
                    {
                        //length must be less than or equal to 37 including AI/DI
                        if( pidlength <= 37 )
                        {
                            reasonForSuccess = "Piece id meets all criteria";

                            //Piece Id is valid
                            return true;
                        }
                        else
                        {
                            reasonForReject = "Piece Id length is > 35";
                        }
                    }
                }
            }
        }
        else
        {
            //alert(" pidlength  :"+pieceIdTmp.length );
            
            if(pieceIdTmp.length  <= 35)
            {
                reasonForSuccess = "Invalid AI/DI. No Validation at NGW end.";
                return true;
            }
            else
            {
                reasonForReject = " Even AI/DI not present,yet length is greter than 35 characters.";
                return false;
            }
        }
    }
}



function validatePieceid(pieceid)
{   
    var pid = " ";
    pid = pieceid.toUpperCase();

    if(!testPiece(pid))
    {
       //alert("Sorry!! Piece Id - "+pid +" would NOT be sent to ITS\nReason: " + reasonForReject);
        return false;
    }
    else
    {
        pid =  pid.replace(/[^a-zA-Z0-9]+/g,'');
        
       //alert("Bingo!! Piece Id - "+pid + " WOULD BE sent to ITS\nReason: " + reasonForSuccess);
        return true ;
    }

}

function isValidDHLAWB(awbNum)
{
    awbNum = fnTrim(awbNum, 2);
    //awbNum = awbNum.replace(/\s+/g,'');
    //awbNum = awbNum.replace(/[^a-zA-Z0-9]+/g,'');
    if(isNaN( awbNum ))
    {
      //alert(" this is string !!! Invalid AWB..go for piece id validation");
        return false;
    }
    if (awbNum.length != 10 )
    {
        return false;
    }
    check1=awbNum.substring(9,10);
    tocheck=awbNum.substring(0,9);
    check2=tocheck % 7;
    if( check1 != check2  && awbNum != "" )
    {
        return false;
    }
    return true;
}

function fnDHL(form)
{
    //var finalPieceStr  = "";
    var trimmedPid     = "";
    var upperCasePid   = "";
    errors="";
    var isAwbFound = false;
    var isPieceFound = false;
    var invalidEntryFound = false;
    var errorMessage = "";
    var newline = "<br>";
    var space   = " ";

    if ( (awbsLength > 10) || ((flagSpaceEnter) && (awbsLength==10)) )
    {
        updateUI( toomanyNumber, lessthanTenNumber + " " );
        return false;
    }
    finalPieceStr =" ";
    for (i=0;i<awbsLength;i++)
    {
    
        awbs[i] = awbs[i].replace(/\s+/g,'');
        //alert("AWB inside fndhl replace all the special char"+)
        if( awbs[i].length !=0)
        {

            if (!isValidDHLAWB(awbs[i]))
            {
                if(!validatePieceid(awbs[i]))
                {
                    var pieceIdLen = awbs[i];
                    if(pieceIdLen.length != 0)
                    {
                        var notAwb = notAwb1;
                        var notPieceId = notPieceId1;
                        
                        invalidEntryFound = true;
                        errorMessage = errorMessage + entry + space + (i+1) + space + notAwb + space + notPieceId + newline;
      
                        if( errors == "" ) errors=""+(i+1);
                        else errors+=(  ", " + (i+1) );
                    }
                }
                else
                {
                    
                    errorMessage = errorMessage + 
                    entry + space +(i+1) + space + isPieceId +newline;
                    
                    isPieceFound = true;
                }
     
            }
            else
            {
                
                errorMessage = errorMessage + 
                entry + space+ (i+1) + space+ isAwb +newline;
                
                isAwbFound = true;
            }
        }

        trimmedPid = awbs[i].replace(/[^a-zA-Z0-9]+/g,'');
        
        upperCasePid =  trimmedPid.toUpperCase();
        
        finalPieceStr = finalPieceStr + upperCasePid + "\n";
        finalPieceStr = fnTrim(finalPieceStr,2);
        //alert(" final piece string ="+finalPieceStr);
    

        if( i == awbsLength - 1 )
        {   
            
           //document.getElementById("AWB").value = finalPieceStr;
            
        } 
    }

    if( errorMessage != "" )
    {     
        if( isAwbFound && isPieceFound )
        {
            
            updateUI(combinationNotAllowed, errorMessage + " " +"<br>"+ errorMixed );
            return false;
        }
    }

    if( errors != "" )
    {
    
        numbad=errors.split( ", " );
        if( numbad.length == 1 )
          updateUI( invalidEntry, entry + " " + numbad[0] + " " + isNotValidAWBorPiece );
        else
          updateUI( invalidEntry, entries + " " + errors + " " + areNotValidAWBorPiece +"<br>"+ correctAWB);
          
        return false;
    }
    if (isZeroValue())
    {
        
        updateUI(invalidValues,errorZero+"<br>"+correctRemove);
        return false;
    }
    
    if (isDuplicate())
    {
        //alert("Duplicate Number::");
        
        updateUI(duplicatevalue,errorDuplicateNumber+"<br>"+correctRemove);
        return false;
    }

  return true;
}

function fnDPEE()
{
    if ( (awbsLength > 10) || ((flagSpaceEnter) && (awbsLength==10)) )
    {
        updateUI( toomanyNumber, lessthanTenNumber + " ");
        return false;
    }
    if (isZeroValue())
    {
        
        updateUI(invalidValues, errorZero);
        return false;
    }
    if (isDuplicate())
    {
                
        updateUI(duplicatevalue, errorDuplicateNumber+"<br>"+correctRemove);
        return false;
    }
    return true;
}

function fnDanzas(brand)
{
    if ( (flagSpaceEnter) || (awbsLength>1) )
    {
        
        updateUI( toomanyInput, pleaseEnter + " " + onlyOne + " " );
        return false;
    }
    
    
    if (isZeroValue())
    {
        
        updateUI(invalidValues, errorZero);
        return false;
    }
    
    return true;
}

function fnExel()
{
    if ( (awbsLength>1) || ((flagSpaceEnter) && (awbsLength==2)) )
    {
        
        updateUI( toomanyInput, pleaseEnter + " " + onlyOne + " ");
        return false;
    }
    if (isZeroValue())
    {
        
        updateUI(invalidValues, errorZero+"<br>"+correctRemove);
        return false;
    }
    return true;
}

function checkForm(form)
{
    if( typeof( form ) == "undefined" ) form = document.forms[0];
    var taval = document.getElementById("AWB").value ;
    //alert("awb before processing "+taval);
    awb=strip( taval );
    //alert("awb after processing "+awb);

    if(shipmentnumbersfield == awb){
        awb = "";
    }
    
    if (awb=="")
    {
        
        updateUI( noValues, errorEmpty);
         
         return false;
    }

    var brand=document.getElementById("brand").options[document.getElementById("brand").selectedIndex].value;
    
    awbs=new Array();
    tmp=""; iterator=0; i=0;
     
    while(iterator<awb.length)
    {
        c=awb.charAt(iterator);
        if( brand=="HBN" || brand=="CRN" ) 
        {
            if ( c !="\t" && c !="\n"  && c !="\r"  )
            {
              tmp=tmp+c;
            }
            else if (tmp!="")
            {
              awbs[i]=tmp;
              tmp="";
              i++;
            }
        }
        else
        {
            if ( c != "," && c !="\t" && c !="\n"  && c !="\r"  )
            {
              tmp=tmp+c;
            }
            else if (tmp!="")
            {
              awbs[i]=tmp;
              tmp="";
              i++;
            }
        }
        iterator++;
    }
    if (tmp!="")
    {
      awbs[i]=tmp;
    }
    
    
    awbsLength = awbs.length;
    
 
    if (brand=="")
    {
        
        updateUI( shipType,selectShipType );
        return false;
    }
    else if ( (brand=="DHL") && !fnDHL(form) )
    {
      return false;
    }
    else if ( (brand=="I" || brand=="R") && !fnDPEE() )
    {
      return false;
    }
    else if ( (brand=="HBN" || brand=="CRN") && !fnExel() )
    {
      return false;
    }
    else if ( (brand=="CN" || brand=="BOLN" || brand=="DOC") && !fnDanzas(brand) )
    {
      return false;
    }

    flagSpaceEnter = false;
    
    //Added By sawan on 11th May for cookie fix
    dd=new Date();
    ms=dd.getTime()+600*86400000;
    dd.setTime(ms);
    days=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    mons=new Array("Jan","Tue","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    if( typeof( dd.getFullYear ) != "undefined" ) year=dd.getFullYear();
    else { year=dd.getYear(); if( year < 1900 ) year+=1900; }
    year+="";
    expire=days[dd.getDay()]+", "+zpad(dd.getDate())+"-"+mons[dd.getMonth()]+"-"+year.substring(2,year.length)+" 00:00:00 GMT";
    setCookie( "AWBS", awb, expire );
    setCookie( "BRAND", document.getElementById("brand").options[document.getElementById("brand").selectedIndex].text, expire );
  //End add By sawan on 11th May for cookie fix
    
    return true;
}

function zpad(num)
{
 return ((num<10)?"0"+num:num);
}

function getCookie(Name)
{
 var search = Name + "=";
 if (0 < document.cookie.length)
 {
  offset = document.cookie.indexOf(search); 
  if (offset != -1)
  {
   offset += search.length;
   end = document.cookie.indexOf(";", offset); 
   if (end == -1) 
    end = document.cookie.length;
    return unescape(document.cookie.substring(offset, end));
  } 
 }
 return "";
}
function setCookie(name, value, expire) {
 document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire));
}


function fnCheckEnter( event, form ) {
    //clear the error message present on screen
    can.$( '.tracking-form-error' ).empty();

    return ( event.keyCode == "13" || event.keyCode == "44" ) ? checkForm(form) : true;
}


function initForm(form) {
    var awbVal = getCookie("AWBS");
  
    if( fnTrim(awbVal,2) != "" ) {
        form.AWB.value = awbVal;
      
        if ( form.brand.options[0].text != "Please Select" ) {
            BRAND = getCookie("BRAND");
            brandlength = form.brand.length;
    
            for ( j=0 ; j < brandlength ; j++ ) {
                if ( form.brand.options[j].text == BRAND ) {
                    form.brand.options[j].selected = true;
                    break;
                }
            }
        }
    }
}
