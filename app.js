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
    console.log(movies[0]["data"]);

    let create = d3.treemap().size([1000,600]);
    create(hierarchy);

    canvas.selectAll("g")
            .data(movies)
            .enter()
            .append("g")
            .append("rect")
            .attr("class", "tile")
            .attr("fill", (e, i) => {
                let category = movies[i]["data"]["category"];
                switch (category) {
                    case "Action":
                        return "rgb(76, 146, 195)";
                    case "Adventure":
                        return "rgb(190, 210, 237)";
                    case "Comedy":
                        return "rgb(255, 153, 62)";
                    case "Drama":
                        return "rgb(255, 201, 147)";
                    case "Animation":
                        return "rgb(86, 179, 86)";
                    case "Family":
                        return "rgb(173, 229, 161)";
                    default:
                        return "rgb(222, 82, 83)";
                }
            })
            .attr("data-name", (e, i) => {movies[i]["data"]["name"]})
            .attr("data-category", (e, i) => {movies[i]["data"]["category"]})
};

fetch(urlMS)
    .then(response => response.json())
    .then(data => {
        ms = data;
        treeMap();
    })
    .catch(error => console.error("Error fetching the information:", error));