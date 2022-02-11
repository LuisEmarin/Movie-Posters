let song;
let playSong;


const clientId = 'cbdb4c4356f243c785dba13e468c6d53';
const clientSecret ='52c965225feb49f7816246ae0bb712d7';

const getToken = async () =>{
    let result = await  fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' ,
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    let data = await result.json()
    console.log(data.access_token)
    return data.access_token
};




const clickedEvent = async(img_index, item_index)=> {
    //testing to see if i can query the api for a testsong
    let token = await getToken();
    let track = document.getElementsByTagName('img')[img_index].alt;
    let result = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method:  'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
    let response = await result.json();
    let song = response.tracks.items[item_index].preview_url
    console.log(song)


    // TODO: play this song funcionality
    if(playSong){
        stopSnippet()
    }
    songSnippet(song)
}

/**
 * 
 *  @param id
 *  @param event
 */


 const getSong = (id, event) =>{
    switch(id){ 
        case 'fig1': {
            event.stopPropagation()
            clickedEvent(0,3)
            break
        }
        case 'fig2':{
            event.stopPropagation()
            clickedEvent(1,0)
            break
        }   event.stopPropagation()
        case 'fig3': {
            clickedEvent(2,3)
            break
        }
        case 'fig4':{
            event.stopPropagation()
            clickedEvent(3,1)
            break
        }   event.stopPropagation()
        case 'fig5': {
            clickedEvent(4,0)
            break
            
        }
        case 'fig6':{
            event.stopPropagation()
            clickedEvent(5,5)
            break
        }
    }
}

const songSnippet = (url) =>{
    playSong = new Audio(url);
    return playSong.play()
};

const stopSnippet = () =>{
    return playSong.pause()
};