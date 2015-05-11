function getCookieVal( offset )
{
  var endstr = document.cookie.indexOf( ";", offset );

  if( endstr == -1 )
  {
    endstr = document.cookie.length;
  }

  return unescape( document.cookie.substring( offset, endstr ) );
}

function FixCookieDate( date )
{
  var base = new Date( 0 );
  var skew = base.getTime(); // dawn of( Unix) time - should be 0

  if( skew > 0 )  // Except on the Mac - ahead of its time
  {
    date.setTime( date.getTime() - skew );
  }
}

function GetCookie( name )
{
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;

  while( i < clen )
  {
    var j = i + alen;

    if( document.cookie.substring( i, j ) == arg )
    {
      return getCookieVal( j );
    }

    i = document.cookie.indexOf(" ", i ) + 1;

    if( i == 0 )
    {
      break;
    }
  }

  return null;
}

function SetCookie( name, value, expires, path, domain, secure )
{
   document.cookie = name + "=" + escape( value ) +
   ( ( expires ) ? "; expires=" + expires.toGMTString() : "" ) +
   ( ( path ) ? "; path=" + path : "" ) +
   ( ( domain ) ? "; domain=" + domain : "" ) +
   ( ( secure ) ? "; secure" : "" );
}

function DeleteCookie( name, path, domain )
{
  if( GetCookie( name ) )
  {
    document.cookie = name + "=" +
     ( ( path ) ? "; path=" + path : "" ) +
     ( ( domain ) ? "; domain=" + domain : "" ) +
     "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}


function zpad( num )
{
  return( ( num < 10 ) ? "0"+num : num );
}


function urlDecode( str )
{

    str=str.replace( new RegExp( '\\+', 'g' ),' ' );

    return unescape( str );

}

function urlEncode( str )
{

    str=escape( str );

    str=str.replace( new RegExp( '\\+', 'g' ), '%2B' );

    return str.replace( new RegExp( '%20', 'g' ), '+' );

}
