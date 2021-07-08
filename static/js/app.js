
function initialLoad() {
	// Use D3 fetch to read the JSON file - the data from the JSON file is arbitrarily named importedData as the argument
	d3.json("samples.json").then((importedData) => {
 
		var data = importedData;

		//console.log(data.names);
		//console.log(data.names[0], data.names[152]);
  		//console.log(data.samples[0].sample_values.slice(0,10));

		// Slice the first 10 objects for plotting
		firstTenSamples = data.samples[0].sample_values.slice(0,10);
  
		// Reverse the array due to Plotly's defaults
		firstTenSamples = firstTenSamples.reverse();
		//console.log(firstTenSamples);
	
		firstTenSampleIds = data.samples[0].otu_ids.slice(0,10)
		firstTenSampleIds = firstTenSampleIds.reverse();
		firstTenSampleLabels = data.samples[0].otu_labels.slice(0,10)
		firstTenSampleLabels = firstTenSampleLabels.reverse();
		//console.log(firstTenSampleIds);

		var trace1 = {
		  x: firstTenSamples.map(row => row),
		  y: firstTenSampleIds.map(row => ("OTU " + String(row))),
		  text: firstTenSampleLabels.map(row => row),
		  type: "bar",
		  orientation: "h"
		};
  
		// data
		var chartData = [trace1];
  
		// Apply the group bar mode to the layout
		var layout = {
		  title: "Top 10 OTUs for Selected Individual",
		  yaxis: {
			type: 'category',
			dtick: 1
		  },			  	
		  margin: {
			l: 100,
			r: 100,
			t: 100,
			b: 100
		  }
		};
  
		// Render the plot to the div tag with id "bar"
		Plotly.newPlot("bar", chartData, layout);

		d3.select("#selDataset")
		  .selectAll('myOptions')
		  .data(data.names)
		  .enter()
		  .append('option')
		  .text(function (d) { return d; }) 
		  .attr("value", function (d) { return d; }) 
	
		// Bubble chart preparation  
		var trace1 = {
			x: data.samples[0].otu_ids,
			y: data.samples[0].sample_values,
			text: data.samples[0].otu_labels,
			mode: 'markers',
			marker: {
				color: data.samples[0].otu_ids,	
				size: data.samples[0].sample_values
			}
		};
		  
		var bubbleData = [trace1];
		  
		var layout = {
			title: 'Bacteria Cultures per Sample',
			xaxis: {
				title: 'OTU ID',
				titlefont: {
				  family: 'Arial, sans-serif',
				  size: 16,
				  color: 'black'
				}
			},
			showlegend: false,
			height: 600,
			width: 2000
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

		// Metadata details

		var metadict = {};
		metadict = data.metadata[0];	
		for (var property in metadict) {
	 		if (metadict.hasOwnProperty(property)) {
			var x = document.createElement("H6");
			var t = document.createTextNode(String(property) + ': ' + String(metadict[property]));
			var parent  = document.getElementById('sample-metadata');
			parent.appendChild(t);
			var x = document.createElement("br");
			parent.appendChild(x);
			}
		}
		
		// Extra Gauge for Belly Button Washing

		var data = [
			{
				domain: { x: [0, 1], y: [0, 1] },
				value: data.metadata[0].wfreq,
				title: { text: "Belly Button Washing Frequency" },
				type: "indicator",
				mode: "gauge+number",
				gauge: {
					axis: { range: [null, 9],
						    nticks: 9,
							tick0: 0,
							dtick: 1
					},
					steps: [
					{ range: [0, 1], color: "#ffffe6" },
					{ range: [1, 2], color: "#ffffb3" },
					{ range: [2, 3], color: "#ffff80" },
					{ range: [3, 4], color: "#ffff4d" },
					{ range: [4, 5], color: "#ffff1a" },
					{ range: [5, 6], color: "#e6e600" },
					{ range: [6, 7], color: "#b3b300" },
					{ range: [7, 8], color: "#808000" },
					{ range: [8, 9], color: "#4d4d00" }
					]
				}	
			}
		];
		var layout = { width: 600, height: 500, margin: { t: 25, r: 25, l: 25, b: 25 } };
		Plotly.newPlot('gauge', data, layout);
	});
};

function optionChanged(selectedSample) {
	//console.log(selectedSample);
	d3.json("samples.json").then((importedData) => {
		var data = importedData;
		//console.log(data.names);
		for (let i = 0; i < (data.names).length; i++) {
			if (data.names[i] == selectedSample) sampleKey = i;
		}
		//console.log(sampleKey);

		// Slice the first 10 objects for plotting
		//console.log(data.samples[sampleKey].sample_values.slice(0,9));

		firstTenSamples = data.samples[sampleKey].sample_values.slice(0,10);
  
		// Reverse the array due to Plotly's defaults
		firstTenSamples = firstTenSamples.reverse();
		//console.log(firstTenSamples);
	
		firstTenSampleIds = data.samples[sampleKey].otu_ids.slice(0,10)
		firstTenSampleIds = firstTenSampleIds.reverse();
		firstTenSampleLabels = data.samples[sampleKey].otu_labels.slice(0,10)
		firstTenSampleLabels = firstTenSampleLabels.reverse();
		//console.log(firstTenSampleIds);

		var trace1 = {
		  x: firstTenSamples.map(row => row),
		  y: firstTenSampleIds.map(row => ("OTU " + String(row))),
		  text: firstTenSampleLabels.map(row => row),
		  type: "bar",
		  orientation: "h"
		};
  
		// data
		var chartData = [trace1];
  
		// Apply the group bar mode to the layout
		var layout = {
		  title: "Top 10 OTUs for Selected Individual",
		  yaxis: {
			type: 'category',
			dtick: 1
		  },			  	
		  margin: {
			l: 100,
			r: 100,
			t: 100,
			b: 100
		  }
		};
  
		// Render the plot to the div tag with id "bar"
		Plotly.newPlot("bar", chartData, layout);

		// Bubble chart preparation  
		var trace1 = {
			x: data.samples[sampleKey].otu_ids,
			y: data.samples[sampleKey].sample_values,
			text: data.samples[sampleKey].otu_labels,
			mode: 'markers',
			marker: {
				color: data.samples[sampleKey].otu_ids,	
				size: data.samples[sampleKey].sample_values
			}
		};

		var bubbleData = [trace1];
		  
		var layout = {
			title: 'Bacteria Cultures Per Sample',
			xaxis: {
				title: 'OTU ID',
				titlefont: {
				  family: 'Arial, sans-serif',
				  size: 16,
				  color: 'black'
				}
			},
			showlegend: false,
			height: 600,
			width: 2000
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

		// Metadata details

		var metadict = {};

		var div = document.getElementById('sample-metadata');
		while(div.firstChild){
   			 div.removeChild(div.firstChild);
		}	
		metadict = data.metadata[sampleKey];	
		for (var property in metadict) {
	 		if (metadict.hasOwnProperty(property)) {
				var x = document.createElement("H6");
				var t = document.createTextNode(String(property) + ': ' + String(metadict[property]));
				var parent  = document.getElementById('sample-metadata');
				parent.appendChild(t);
				var x = document.createElement("br");
				parent.appendChild(x);
			}
		}
	
		// Extra Gauge for Belly Button Washing

		var data = [
			{
				domain: { x: [0, 1], y: [0, 1] },
				value: data.metadata[sampleKey].wfreq,
				title: { text: "Belly Button Washing Frequency" },
				type: "indicator",
				mode: "gauge+number",
				gauge: {
					axis: { range: [null, 9],
						    nticks: 9,
							tick0: 0,
							dtick: 1
					},
					steps: [
					{ range: [0, 1], color: "#ffffe6" },
					{ range: [1, 2], color: "#ffffb3" },
					{ range: [2, 3], color: "#ffff80" },
					{ range: [3, 4], color: "#ffff4d" },
					{ range: [4, 5], color: "#ffff1a" },
					{ range: [5, 6], color: "#e6e600" },
					{ range: [6, 7], color: "#b3b300" },
					{ range: [7, 8], color: "#808000" },
					{ range: [8, 9], color: "#4d4d00" }
					]
				}	
			}
		];
		var layout = { width: 600, height: 500, margin: { t: 25, r: 25, l: 25, b: 25 } };
		Plotly.newPlot('gauge', data, layout);
	});
};

initialLoad();
  