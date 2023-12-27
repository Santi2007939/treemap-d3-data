const urlED = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlCD = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let ed;
let cd;
let canvas = d3.select("#canvas");

let map = () => {
    
};

fetch(urlED)
    .then(response => response.json())
    .then(data => {
        ed = data;
        fetch(urlCD)
            .then(response => response.json())
            .then(dat => {
                cd = dat;
                map();
            })
            .catch(err => console.error("Error fetching the information: ", err))
    })
    .catch(error => console.error("Error fetching the information:", error));