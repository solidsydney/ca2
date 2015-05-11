function checkBeNeLux( AWB,uniqueId, brand ) {
	//benelux changes 
	if(brand !="DHL")
	{
		//since brand is other than dhl so no bunelex tracking will happen go back to normal flow of tracking 
		return true;
	}
	//end chnages
	
	//alert("awbsLengthinsidecheckBeNeLux:"+awbsLength);
	var countryCode_bnlx = countryCode_bnlx1;
	var Url =Url1;
	
	var awbValue_bnlx= fnFTTrim(AWB);
		
	//commented on 121109
    beneluxawbs=new Array();
        
    tmp=""; iterator=0; i=0;
     
    while(iterator<awbValue_bnlx.length)
    {
        c=awbValue_bnlx.charAt(iterator);
      
            if ( c != "," && c !="\t" && c !="\n"  && c !="\r"  )
            {
              tmp=tmp+c;
            }
            else if (tmp!="")
            {
              beneluxawbs[i]=tmp;
              tmp="";
              i++;
            }
       
        iterator++;
    }
    if (tmp!="")
    {
    	beneluxawbs[i]=tmp;
    }

    beneluxawbsLength = beneluxawbs.length;
    
    //alert("beneluxawbsLength>>"+beneluxawbsLength);
    	
	var awbValue_upper = awbValue_bnlx.toUpperCase();
	var features = 'height=800,width=900,left=100,top=100,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=no,resizable=yes';
	
	//set custom size if ie-6 browser
	var agent = navigator.userAgent;
	//alert("agent>>"+agent);
	if(agent.indexOf("MSIE 6.0")>=0)
	{
	 
	features = 'height=900,width=1200,left=100,top=100,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=no,resizable=yes';
	
	//alert("features:::"+features);
	}
		
	var newWindow = null;

		
	//var url_bnlx = Url+ awbValue_upper;
	
	   //alert("beneluxawbsLength222::"+beneluxawbsLength);
	
		if( countryCode_bnlx == "be" || countryCode_bnlx == "lu" || countryCode_bnlx == "nl" )
		{
			if (beneluxawbsLength==1)
			{
				if(langCode == "en" || langCode == "de")
				{
					Url = Url.replace("/NL/","/UK/");
				}
				else if(langCode == "fr")
				{
					Url = Url.replace("/NL/","/FR/");
				}
				var url_bnlx = Url+ beneluxawbs[0];

                document.getElementById("AWB_"+ uniqueId ).value = beneluxawbs[0];

			if (checkBeneluxNO(beneluxawbs[0]))
				{		
				 
				 newWindow = window.open(url_bnlx,'BeNeLux_Tracking',features);
				 return false;
				}else{
					return true;
				}
			}
			else
			{
				var no =0 ;
				for (i=0; i<beneluxawbsLength ; i++ )
				{
					var beneluxawbsdt= fnFTTrim(beneluxawbs[i]); 
					if(checkBeneluxNO(beneluxawbsdt))
					 {
						 no = no+1;
					 }
				}
				//alert("No::"+no);
				 //alert("beneluxawbsLength222::"+beneluxawbsLength);
				if (no == beneluxawbsLength )
				{
					      				      
			    	    	fnFTupdateUI( notMoreThanOnes,notMoreThanOnesBenelux,uniqueId);
			    	    	
			    	        return false;
			    	   
				}
				else
				{
					return true;
				}
				
			}
			
		}
		else
		{
			//alert("Inside If BENELUX1111");
			return true;	
		}
}

function fnFTTrim(inputString) {
     var tempString = "";
     var tempChar = "";
 	var count = "";
     var SINGLE_BLANK = " ";
     var inputWidth = 0;
     
     
         inputWidth = inputString.length;
               
         
             
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
            
        
     
 	return tempString;
}

//New Requirement for piece ids
function testPiece( pieceId) {
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
            if( isDIValidFt( valueBetweenBrackets ) )
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
                    if( isIACValidFt( pieceId, closingBracketIndex + 1 ) )
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
        if( isDIValidFt( diValue ) )
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
                if( isIACValidFt( pieceId, 2 ) )
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

function isValidDHLAWBFt(awbNum) {
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

function isZeroValueFt() {
	//alert("awbsLength"+awbsLength);
	
	for( i=0 ; i < awbsLength ; i++ )
	{
		//alert("parseInt"+parseInt( awbs[i] ));
		//Added on 200210
		var awbNumLn = fnTrim(awbs[i], 2);
		//alert("awbNumLn"+awbNumLn);
		//alert("ln::"+awbNumLn.length);
		
		for(j=0;j<awbNumLn.length;j++){
			 
			myzeroArray[j] = awbNumLn.charAt(j);
			 //alert(myzeroArray[j]);
		}
		
		if( awbNumLn.length == 1 && parseInt( awbs[i] ) == 0 )
		{
			return true;
		}else if(awbNumLn.length > 1){
			
			inc = 0;
			
			for( k= 0;k<myzeroArray.length;k++){
							
				if(parseInt( myzeroArray[k] ) == 0){
					
					
					inc = inc+1;
					//alert("Inside Inc"+inc);
				}
				
			}
			if(inc == myzeroArray.length){
				return true;
			}
		}
	}
}

function fnFTstrip( instring ) {
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

function isDuplicateFt() {
	//alert("Inside isDuplicate()");
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

function fnTrim(inputString, side) {
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
}


function isIACValidFt( pieceId, startingIndex ) {

    //Check if the IAC starts with a character

    var iacAsNumber = new Number(pieceId.charAt(startingIndex));

    if( iacAsNumber.toString() != "NaN" )
    {
        reasonForReject = "First IAC char is a number";
        return false;
    }

    var validIACList = validIACList1;
    

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

function isDIValidFt(diValue) {
    var validDIList = validDIList1;

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

function validatePieceidFt(pieceid) {
    var pid = " ";
    pid = pieceid.toUpperCase();
    //alert("pid::"+pid);

    if(!testPiece(pid))
    {
        
        return false;
    }
    else
    {
    	pid =  pid.replace(/[^a-zA-Z0-9]+/g,'');
      
        return true ;
    }
}

function fnFTupdateUI(header, message ,uniqueID) {
	var elementid = "errorDivfastTrack_"+uniqueID;
	document.getElementById(elementid).innerHTML=
        "<p class=\"error\"><strong>" + header + "</strong></p><p class=\"error\">" + message + "</p>";
   
    document.getElementById(elementid).style.display="block";
}

function fnFTDHL(form ,uniqueID) {
 //alert("inside fnFTDHL");
	
	var finalPieceStr  = "";
	var trimmedPid     = "";
	var upperCasePid   = "";
	errors="";
	var isAwbFound = false;
	var isPieceFound = false;
	var invalidEntryFound = false;
	var errorMessage = "";
	var newline = "<br>";
	var space   = " ";
	var i =0;
	var elementid1= "AWB_"+uniqueID;
	//alert(elementid1);
	var elementidBrand = "brand_"+uniqueID;
	
	
	
	if ( (awbsLength > 10) || ((flagSpaceEnter) && (awbsLength==10)) )
	{
		
		//alert("awbsLength more than 10");
		//alert("brandText::"+brandText);
		fnFTupdateUI( toomanyNumberFt, lessthanTenNumberFt + " ",uniqueID );
		//updateUI( toomanyNumber, lessthanTenNumber + " " + brandText+"s." );
	    return false;
	}
	finalPieceStrFT =" ";
	for (i=0;i<awbsLength;i++)
	{
    
		awbs[i] = awbs[i].replace(/\s+/g,'');
		
		//alert("awbs["+i+"]"+awbs[i]);
		if( awbs[i].length !=0)
		{

			if (!isValidDHLAWBFt(awbs[i]))
			{
				//alert("inside fnFTDHL1");
				if(!validatePieceidFt(awbs[i]))
				{
					//alert("inside fnFTDHL21");
					var pieceIdLen = awbs[i];
					if(pieceIdLen.length != 0)
					{
						//var notAwb =  notAWBs;
						//var notPieceId =  notPieceIdS;
						
						invalidEntryFound = true;
						errorMessage = errorMessage + 
						 space + (i+1) +newline;
						
						//errorMessage = errorMessage + 
						 //space + (i+1) + notAwb + 
						//notPieceId +newline;
      
						if( errors == "" ) errors=""+(i+1);
						else errors+=(  ", " + (i+1) );
					}
				}
				else
				{
					//alert("inside fnFTDHL31");
					errorMessage = errorMessage + 
					 space +(i+1) +newline;
					
					//errorMessage = errorMessage + 
					 //space +(i+1) + isPieceIds +newline;
					
					isPieceFound = true;
				}
     
			}
			else
			{
				//alert("inside fnFTDHL41");
				errorMessage = errorMessage + 
				 space+ (i+1)  +newline;
				//errorMessage = errorMessage + 
				// space+ (i+1) + isAwbs +newline;
				
				isAwbFound = true;
			}
		}
		//alert("inside fnFTDHL51");
		trimmedPid = awbs[i].replace(/[^a-zA-Z0-9]+/g,'');
		
		upperCasePid =  trimmedPid.toUpperCase();
		
		//finalPieceStr = finalPieceStr + upperCasePid + " ";
		
		finalPieceStrFT = finalPieceStrFT + upperCasePid + "\n";
		finalPieceStrFT = fnTrim(finalPieceStrFT,2);
		
		
		//alert("finalPieceStrFT" + finalPieceStrFT);
		
		//document.getElementById(elementid1).value = finalPieceStr;

        
		if( i == awbsLength - 1 )
		{
		  //document.getElementById(elementid1).value = finalPieceStr;
		}
		 
	}

    if( errorMessage != "" )
    {     
		if( isAwbFound && isPieceFound )
		{
			//alert("inside fnFTDHL61");
			
			fnFTupdateUI(combinationNotAllowedFt," "+ errMixedFt,uniqueID );
			//fnFTupdateUI(combinationNotAlloweds, errorMessage + " " +"<br>"+ errMixeds );
		    return false;
		}
	}

	if( errors != "" )
	{
    
		showRed = true;
		
		
		numbad=errors.split( ", " );
		if( numbad.length == 1 )
			fnFTupdateUI( invalidEntryFt, entryFt + " " + numbad[0] + " " + isNotValidAWBorPieceFt,uniqueID);
			//fnFTupdateUI( invalidEntrys, entrys + " " + numbad[0] + " " + isNotValidAWBorPieces,uniqueID );
		else
		{
			fnFTupdateUI( invalidEntryFt, entriesFt + " " + errors + " " + areNotValidAWBorPieceFt +"<br>"+ correctAWBFt,uniqueID);
			//fnFTupdateUI( invalidEntrys, entriess + " " + errors + " " + areNotValidAWBorPieces +"<br>"+ correctAWBs);
		}  
		return false;
	}
	if (isZeroValueFt())
	{
		//alert("inside fnFTDHL71");
		fnFTupdateUI(invalidValuesFt,errZeroFt+"<br>"+correctRemoveFt,uniqueID);
		
		//fnFTupdateUI(invalidValuess,errorZeros+"<br>"+correctRemoves,uniqueID);
		return false;
	}
	
	if (isDuplicateFt())
	{
		//alert("Duplicate Number true::");		
		fnFTupdateUI(duplicatevalueFt,errorDuplicateNumberFt+"<br>"+correctRemoveFt,uniqueID);
		return false;
	}

  return true;
}

function fnDPEE(uniqueid) {
	//alert("inside fnDPEE");
	if ( (awbsLength > 10) || ((flagSpaceEnter) && (awbsLength==10)) )
	{
		
		//+ brandText+"s."
		fnFTupdateUI( toomanyNumbers, lessthanTenNumbers + " ",uniqueid );
		return false;
	}
	if (isZeroValueFt())
	{
		
		fnFTupdateUI(invalidValuesFt,errZeroFt+"<br>"+correctRemoveFt,uniqueid);
		return false;
	}
	if (isDuplicateFt())
	{
				
		fnFTupdateUI(duplicatevalueFt,errorDuplicateNumberFt+"<br>"+correctRemoveFt,uniqueid);
		//fnFTupdateUI(duplicatevalues, errorDuplicateNumbers+"<br>"+correctRemoves);
		return false;
	}
	return true;
}

function fnDanzas(brand,uniqueid) {
	
	if ( (flagSpaceEnter) || (awbsLength>1) )
	{
		fnFTupdateUI( toomanyInputs, pleaseEnters + " " + onlyOnes + " ",uniqueid );
		return false;
	}
	
	if (isZeroValueFt())
	{
		fnFTupdateUI(invalidValuesFt,errZeroFt+"<br>"+correctRemoveFt,uniqueid);
		return false;
	}
	
	return true;
}

function fnExel(uniqueid) {
	//alert("inside fnExel");
	if ( (awbsLength>1) || ((flagSpaceEnter) && (awbsLength==2)) )
	{
		
		fnFTupdateUI( toomanyInputs, pleaseEnters + " " + onlyOnes + " ", uniqueid);
		return false;
	}
	if (isZeroValueFt())
	{
		
		fnFTupdateUI(invalidValuesFt,errZeroFt+"<br>"+correctRemoveFt,uniqueid);
		return false;
	}
	return true;
}             

function checkBeneluxNO(awbValue_bnlx) {
	 //alert("inside checkBeneluxNO ---"+awbValue_bnlx);
			var trackNo = awbValue_bnlx.length;
			var lpNo = awbValue_bnlx.substring(0,2);
			var lpNumber = awbValue_bnlx.substring(0,4);
			if ( trackNo == 8 )
			{
				var pickupNo = awbValue_bnlx.substring(7);
				if( pickupNo == "P" || pickupNo == "p" )
				{
					//alert("Inside P");
					//newWindow = window.open(url_bnlx,'BeNeLux_Tracking',features);
					return true;
				}
				else
				{
					//alert("Else P");
					return false;
				}
			}
			else if((lpNo == "3S" || lpNo == "3s") && trackNo <= 15 )
			{
				return true;
			}
			else if(lpNumber == "3232" && trackNo == 24)
			{
				return true;
			}
			else if( trackNo > 10 )
			{
				var licensePlate = awbValue_bnlx.substring(0,3);
				if( licensePlate == "JVG" || licensePlate == "jvg" )
				{
					//alert("Inside JVG");
					//newWindow = window.open(url_bnlx,'BeNeLux_Tracking',features);
					return true;
				}
				else if( licensePlate == "JJD" || licensePlate == "jjd" )
				{
				   //alert(" inside  JJD ");
					//newWindow = window.open(url_bnlx,'BeNeLux_Tracking',features);
					return true;
				}
				else if( trackNo > 15 && trackNo <= 20 )
				{
					 //alert(" inside  Else if JJD ");
					//newWindow = window.open(url_bnlx,'BeNeLux_Tracking',features);
					return true;
				}
				else
				{
					//alert(" inside  Else if JJD1 ");
					return false;
				}
			}else
			{
				//alert(" inside Long Else if JJD ");
				return false;
			}
}

function fnreterivebenexData(checkdata,uniqueID) {
	var checkbeneluxawbs=new Array();
      
	    tmp=""; iterator=0; i=0;
	     
	    while(iterator<checkdata.length)
	    {
	        c=checkdata.charAt(iterator);
	      
	            if ( c != "," && c !="\t" && c !="\n"  && c !="\r"  )
	            {
	              tmp=tmp+c;
	            }
	            else if (tmp!="")
	            {
	             checkbeneluxawbs[i]=tmp;
	              tmp="";
	              i++;
	            }
	       
	        iterator++;
	    }
	    if (tmp!="")
	    {
	    	checkbeneluxawbs[i]=tmp;
	    }
	    //alert("checkbeneluxawbs");
	    var no =0 ;
		for (i=0; i<checkbeneluxawbs.length ; i++ )
		{
			var benelxchkdata = fnFTTrim(checkbeneluxawbs[i]);
			if(checkBeneluxNO(benelxchkdata))
			 {
				 no = no+1;
			 }
		}
		if (no == checkbeneluxawbs.length )
		{
			  //alert("Inside fnreterivebenexData"); 
			  if(no > 1){
			  fnFTupdateUI( notMoreThanOnes,notMoreThanOnesBenelux,uniqueID);
			  //}else{
	    	        return true;
			  }
			  return true;
		}
		
	    return false;
}

function ChengeTheActionFT(uniqueid , action, selectedVal ) {
    //alert(" hi inside the ChengeTheAction");
    //var brandid ="brand_"+uniqueid;
    //alert("brandid___>"+brandid);
	//var brand=document.getElementById(brandid).options[document.getElementById(brandid).selectedIndex].value;
	//alert("brand---->"+brand);

	 if(!(selectedVal=="I" || selectedVal=="R" ||selectedVal=="DHL"))
	 {
		 var newaction = action+".html";
		 var formname = "trackingIndex_fast_"+uniqueid;
		 //document.getElementById(formname).action;
		 //alert("old action---->"+ document.getElementById(formname).action);

		 document.getElementById(formname).action = newaction;

		// alert("modefied action ---->"+document.getElementById(formname).action );
	 }
}

function zpadFt(num) {
    return ((num<10)?"0"+num:num);
}

function getCookieFt(Name) {
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

function setCookieFt(name, value, expire) {
    document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire));
}

function initFormFt(form, uid, brandHidden) {
  var awbVal = getCookieFt("AWBS_"+uid);
  
  if( fnFTTrim(awbVal) != "" )
  {
	  document.getElementById("AWB_"+uid ).value = awbVal;
	  
	  if( !brandHidden )
	  {
	    BRAND = getCookieFt("BRAND_" + uid);//form.brand.options[form.brand.selectedIndex].value ;
	    brandlength = document.getElementById("brand_"+uid).length;
	    for ( j=0 ; j < brandlength ; j++ )
	    {
	      if ( document.getElementById("brand_"+uid).options[j].text == BRAND )
	      {
	    	  document.getElementById("brand_"+uid).options[j].selected = true;
	        break;
	      }
	    }
	  }
	    
  }
}