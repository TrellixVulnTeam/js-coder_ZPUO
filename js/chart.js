const DUMMY_DATA = [
    {id: 'd1', region: 'USA', value:10},
    {id: 'd2', region: 'INDIA', value:12},
    {id: 'd3', region: 'CHINA', value:11},
    {id: 'd4', region: 'COLOMBIA', value:15}
];

const MARGINS = {top:10, bottom:10};
const CHART_WIDTH = 350;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

const x = d3
    .scaleBand()
    .rangeRound([0,CHART_WIDTH])
    .padding(0.1); //between the items

const y = d3
    .scaleLinear()
    .range([CHART_HEIGHT, 0]);


const chartContainer = d3
    .select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

    x.domain(DUMMY_DATA.map((d) => d.region));
    y.domain([0, d3.max(DUMMY_DATA, (d) => d.value) + 3]);

const chart = chartContainer.append('g');

chart
    .append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color',"#4f009e");

    function renderChart() {
        chart
    .selectAll('.bar')
    .data(selectedData, (data) => data.id)
    .enter()
    .append('rect') //for a rectangle
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => CHART_HEIGHT - y(data.value))
    .attr('x', (data)=> x(data.region))
    .attr('y', (data) => y(data.value));

    chart.selectAll('.bar').data(selectedData, (data) => data.id).exit().remove();

    chart
        .selectAll('.label')
        .data(selectedData, (data) => data.id)
        .enter()
        .append('text') //No agrega 'text' sino el objeto de tipo string
        .text((data) => data.value)
        .attr('x', (data) => x(data.region) + x.bandwidth()/2)
        .attr('y', (data) => y(data.value) - 20)
        .attr('text-anchor', 'middle')
        .classed('label',true);

    chart.selectAll('.label').data(selectedData, (data) => data.id).exit().remove();
    }

    renderChart();

    let unselectedIds = [];

    const listItems = d3
        .select('#data')
        .select('ul')
        .selectAll('li')
        .data(DUMMY_DATA)
        .enter()
        .append('li');

    listItems.append('span').text((data)=>data.region)

    listItems
        .append('input')
        .attr('type', 'checkbox')
        .attr('checked', true)
        .on('change', (data) => {
            if (unselectedIds.indexOf(data.id) === -1){
                unselectedIds.push(data.id);
            }else {
                unselectedIds = unselectedIds.filter((id) => id !== data.id);
            }
            selectedData = DUMMY_DATA.filter(
                (d) => unselectedIds.indexOf(d.id) === -1
            );

            renderChart();
        });




// d3 = require("d3@6")


// chart = () => {
//     const svg = d3.create("svg")
//         .attr("viewBox", [0, 0, width, height]);

//     const rect = svg.selectAll("g")
//         .data(y01z)
//         .join("g")
//         .attr("fill", (d, i) => z(i))
//         .selectAll("rect")
//         .data(d => d)
//         .join("rect")
//         .attr("x", (d, i) => x(i))
//         .attr("y", height - margin.bottom)
//         .attr("width", x.bandwidth())
//         .attr("height", 0);

//     svg.append("g")
//         .call(xAxis);

//     function transitionGrouped() {
//     y.domain([0, yMax]);

//     rect.transition()
//         .duration(500)
//         .delay((d, i) => i * 20)
//         .attr("x", (d, i) => x(i) + x.bandwidth() / n * d[2])
//         .attr("width", x.bandwidth() / n)
//         .transition()
//         .attr("y", d => y(d[1] - d[0]))
//         .attr("height", d => y(0) - y(d[1] - d[0]));
// }

// function transitionStacked() {
//     y.domain([0, y1Max]);

//     rect.transition()
//         .duration(500)
//         .delay((d, i) => i * 20)
//         .attr("y", d => y(d[1]))
//         .attr("height", d => y(d[0]) - y(d[1]))
//         .transition()
//         .attr("x", (d, i) => x(i))
//         .attr("width", x.bandwidth());
// }

// function update(layout) {
//     if (layout === "stacked") transitionStacked();
//     else transitionGrouped();
// }

// return Object.assign(svg.node(), { update });
// }


// update = chart.update(layout)

// xz = d3.range(m) // the x-values shared by all series

// yz = d3.range(n).map(() => bumps(m)) // the y-values of each of the n series


// y01z = d3.stack()
//     .keys(d3.range(n))
//     (d3.transpose(yz)) // stacked yz
//     .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]))

// yMax = d3.max(yz, y => d3.max(y))

// y1Max = d3.max(y01z, y => d3.max(y, d => d[1]))

// x = d3.scaleBand()
//     .domain(xz)
//     .rangeRound([margin.left, width - margin.right])
//     .padding(0.08)


// y = d3.scaleLinear()
//     .domain([0, y1Max])
//     .range([height - margin.bottom, margin.top])

// z = d3.scaleSequential(d3.interpolateBlues)
//     .domain([-0.5 * n, 1.5 * n])

// xAxis = svg => svg.append("g")
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ""))

// n = 5 // number of series

// m = 58 // number of values per series

// height = 500

// margin = ({ top: 0, right: 0, bottom: 10, left: 0 })

// // Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// // Inspired by Lee Byron’s test data generator.
// // http://leebyron.com/streamgraph/
// function bumps(m) {
//     const values = [];

//     // Initialize with uniform random values in [0.1, 0.2).
//     for (let i = 0; i < m; ++i) {
//         values[i] = 0.1 + 0.1 * Math.random();
//     }

//     // Add five random bumps.
//     for (let j = 0; j < 5; ++j) {
//         const x = 1 / (0.1 + Math.random());
//         const y = 2 * Math.random() - 0.5;
//         const z = 10 / (0.1 + Math.random());
//         for (let i = 0; i < m; i++) {
//             const w = (i / m - y) * z;
//             values[i] += x * Math.exp(-w * w);
//         }
//     }

//     // Ensure all values are positive.
//     for (let i = 0; i < m; ++i) {
//         values[i] = Math.max(0, values[i]);
//     }

//     return values;
// }