import * as d3 from 'd3';

export class App {
  data: any;

  constructor() {
    this.data = {
      name: 'capabilities',
      children: [{
        name: 'project',
        children: [{
          name: 'repository',
          children: [{
            name: 'user',
            children: [{
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }, {
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }, {
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }]
          }]
        }, {
          name: 'repository',
          children: [{
            name: 'user',
            children: [{
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }, {
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }, {
              name: 'commit id',
              children: [{
                name: 'g4h56dh3g2j3h4gj2h3g4j2hg34j2hg34',
                url: 'http://www.newegg.com',
                value: 33
              }, {
                name: 'g4h56dh3gkj2h34kjh23k4hj23j4hk23',
                url: 'http://www.amazon.com',
                value: 10
              }]
            }]
          }]
        }]
      }]
    };
  }

  attached() {
    const width = 800;
    const height = 600;
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([0, height]);
    const app = d3.select('#app');
    const svg = app.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('overflow', 'hidden');

    const rectGroup = svg.append('g');

    let root = d3.hierarchy(this.data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    let partition = d3.partition()
      .size([height, width])
      .round(true);

    partition(root);

    const createdRects = rectGroup.selectAll('rect').data(root.descendants()).enter().append('rect')
      .attr('x', d => d.y0)
      .attr('y', d => d.x0)
      .attr('width', d => d.y1 - d.y0)
      .attr('height', d => d.x1 - d.x0)
      .attr('class', d => d.children ? 'parent' : 'child')
      .on('click', click);

    // const textGroup = app.append('div')
    //   .attr('class', 'text-group')
    //   .style('width', width)
    //   .style('height', height);

    // const createdDivs = textGroup.selectAll('div').data(root.descendants()).enter().append('div')
    //   .html(d => d.data.url ? `<a href="${d.data.url}">${d.data.name}</a>` : d.data.name)
    //   .attr('class', d => `text-box${d.children ? '' : ' child'}`)
    //   .style('left', d => `${d.y0}px`)
    //   .style('top', d => `${d.x0}px`)
    //   .style('width', d => `${d.y1 - d.y0}px`)
    //   .style('height', d => `${d.x1 - d.x0}px`)
    //   .style('line-height', d => `${d.x1 - d.x0}px`)
    //   .style('opacity', d => (d.x1 - d.x0) > 16 ? '1' : '0');

    function click(d) {
      x.domain([d.y0, width]).range([d.parent ? 40 : 0, width]);
      y.domain([d.x0, d.x1]).range([0, height]);

      rectGroup.selectAll('rect').data(root.descendants()).transition().duration(750)
        .attr('x', d => Math.round(x(d.y0)))
        .attr('y', d => Math.round(y(d.x0)))
        .attr('width', d => Math.round(x(d.y1)) - Math.round(x(d.y0)))
        .attr('height', d => Math.round(y(d.x1)) - Math.round(y(d.x0)));
    }
  }
}
