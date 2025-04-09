console.log("javascript");
let currentSong= new Audio();

async function getSongs(){

    let a=await fetch("http://192.168.0.102:5503/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
        
        }
        return songs;

    }

    const playMusic = (track)=>{
        // let audio = new Audio("/songs/" + track)
        currentSong.src = "/songs/" + track;
        currentSong.play();
    }


async function main() {

    

    let songs = await getSongs();
     console.log(songs);

     let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0]
     for (const song of songs) {
        
      

        songUL.innerHTML = songUL.innerHTML +  ` 
        <li>
        <img class="invert" src="img/music.svg" alt="" >
                      <div class="info">
                        <div> ${song.replaceAll("%20", " ")}</div>
                        <div>Aditya</div>
                      </div>
                      <div><img class="invert" src="img/mplay.svg" alt=""></div>
                      
        </li> `;
     }

     //~Attach an event listener to each song
     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
        
     });

     //Attach an event listener to play, next and previous
     playpause.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
     })
}  
main()

    
 
    

    






// main();
