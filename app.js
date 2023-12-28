const urlMS = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let ms;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

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

    let block = canvas.selectAll("g")
                    .data(movies)
                    .enter()
                    .append("g")
                    .attr("transform", (i) => {
                            return "translate(" + i["x0"] + ", " + i["y0"] + ")"
                    });
    block.append("rect")
            .attr("class", "tile")
            .attr("fill", (i) => {
                let category = i["data"]["category"];
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
            .attr("data-name", (i) => {return i["data"]["name"]})
            .attr("data-category", (i) => {return i["data"]["category"]})
            .attr("data-value", (i) => {return i["data"]["value"]})
            .attr("width", (i) => {return i["x1"] - i["x0"]})
            .attr("height", (i) => {return i["y1"] - i["y0"]})
            .on("mouseover", (e, i) => {
                tooltip.transition()
                            .style("visibility", "visible")
                let value = i["data"]["value"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                tooltip.html(
                    "$ " + value + "<hr />" + i["data"]["name"]
                )
                tooltip.attr("data-value", i["data"]["value"]); 
            })
            .on("mouseout", (e, i) => {
                tooltip.transition()
                            .style("visibility", "hidden")
            })

    block.append("text")
            .text((i) => {
                return i["data"]["name"];
            })
            .attr("x", 5)
            .attr("y", 20)
};

fetch(urlMS)
    .then(response => response.json())
    .then(data => {
        ms = data;
        treeMap();
    })
    .catch(error => console.error("Error fetching the information:", error));