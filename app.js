const urlKP = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const urlMS = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const urlGS = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let kp;
let ms;
let gs; 

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let colors = [

];

let aaa = () => {
    
};

fetch(urlKP)
    .then(response => response.json())
    .then(data => {
        kp = data;
        console.log(kp);
        fetch(urlMS)
            .then(response => response.json())
            .then(data => {
                ms = data;
                console.log(ms);
                fetch(urlGS)
                    .then(response => response.json())
                    .then(data => {
                        gs = data;
                        console.log(gs);
                    })
                    .catch(err => console.error("Error fetching the information: ", err));
            })
            .catch(err => console.error("Error fetching the information: ", err));
    })
    .catch(error => console.error("Error fetching the information:", error));