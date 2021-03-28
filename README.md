# SpotifyOverlayAndCommandToLiveStream
API for using in LiveStreams on Twitch with COMMANDS on StreamElements
  The idea is create a command on StreamElements ,or other plattform that allows creating commands for your Live , and this command will answer with your actual playing track 
  on spotify.
  HOW USE:
    requirements:
      Create an app on Spotify API https://developer.spotify.com/dashboard/applications and copy the clientId and clientSecret.Use that two information on your .env
      Add {url}/authorization and {url}/authorization/token on URI valids on the dashboard of spotifyAPI where url is your localhost.
      I had use ngrok to open my localhost to internet.
    Using:
      Call the route {url}/authorization and make login on spotify.Copy the access token that will be retrive.
      Call the route {url}/currentPlayingTrack?accessToken={acessToken}
      That route will be assign to the command on StreamElements
      To use a api on StreamElements its necessary create a command and on response ${urlfetch "url"} 
        example:  ${urlfetch https://802741093792.ngrok.io/currentPlayingTrack?accessToken=xxxxxx}
      
      
 Im still working on this project so on the next updates will have some frontend application and a overlay to use.In the nexts patchs won't be necessary the requirements because
 I will upload this project on heroku.
