const urlED = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlCD = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let ed;
let cd;
let canvas = d3.select("#canvas");
let legend = d3.select("#legend");
let tooltip = d3.select("#tooltip");

let colors = [
    "#7bd3f3",
    "#54c8f3",
    "#30ace2",
    "#1e70b6",
    "#0f599b",
    "#0c3459",  
    "#0e202e"
  ]

let map = () => {
    canvas.selectAll("path")
            .data(cd)
            .enter()
            .append("path")
            .attr("d", d3.geoPath())
            .attr("class", "county")
            .attr("fill", (i) => {
                let id = i["id"];
                let county = ed.find((i) => {
                    return i["fips"] == id;
                })
                let number = county["bachelorsOrHigher"];
                let lim = 12;
                for (var i = 0; i <= 6; i++) {
                    if (number <= lim) {
                        return colors[i];
                    }
                    lim += 9;
                }
            })
            .attr("data-fips", (i) => {return i["id"]})
            .attr("data-education", (i) => {
                let id = i["id"];
                let county = ed.find((i) => {
                    return i["fips"] == id;
                })
                return county["bachelorsOrHigher"];
            })
            .on("mouseover", (e, i) => {
                tooltip.transition()
                    .style("visibility", "visible")

                let id = i["id"];
                let county = ed.find((i) => {
                    return i["fips"] == id;
                })

                tooltip.text(county["fips"] + " - " + county["area_name"] + ", " + county["state"] + " : " + county["bachelorsOrHigher"] + "%");
                tooltip.attr("data-education", county["bachelorsOrHigher"]);
            })
            .on("mouseout", (e, i) => {
                tooltip.transition()
                    .style("visibility", "hidden");
            })
};

let desc = () => {
    legend.selectAll("rect")
                    .data(colors)
                    .enter()
                    .append("rect")
                    .attr("fill", (i) => {return i})
                    .attr("width", (i) => {
                        return colors.indexOf(i) % 2 == 0 ? 33 : 32;
                    })
                    .attr("x", (i) => {
                        let index = colors.indexOf(i);
                        let num = Math.trunc(index/2);
                        return index % 2 == 0 ? 600 + num * 65 : 600 + num * 65 + 33;
                    })
}

fetch(urlCD)
    .then(response => response.json())
    .then(data => {
        cd = topojson.feature(data, data.objects.counties).features;
        console.log(cd);
        fetch(urlED)
            .then(response => response.json())
            .then(dat => {
                ed = dat;
                map();
                desc();
            })
            .catch(err => console.error("Error fetching the information: ", err))
    })
    .catch(error => console.error("Error fetching the information:", error));