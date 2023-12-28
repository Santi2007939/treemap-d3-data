const urlMS = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let ms;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let colors = [

];

let treeMap = () => {
    let hierarchy = d3.hierarchy(ms, (node) => {
        return node["children"];
    }).sum((node) => {
        return node["value"];
    }).sort((nod1, nod2) => {
        return nod2["value"] - nod1["value"];
    })

    let movies = hierarchy.leaves();

    let create = d3.treemap().size([1000,600]);
    create(hierarchy);

    canvas.selectAll("g")
            .data(movies)
            .enter()
            .append("g")
            .append("rect")
            .attr("class", "tile")
};

fetch(urlMS)
    .then(response => response.json())
    .then(data => {
        ms = data;
        treeMap();
    })
    .catch(error => console.error("Error fetching the information:", error));