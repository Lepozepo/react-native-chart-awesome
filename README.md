## React Native Chart Awesome

[![Greenkeeper badge](https://badges.greenkeeper.io/Lepozepo/react-native-chart-awesome.svg)](https://greenkeeper.io/)

### Documentation

#### ChartCanvas
The `ChartCanvas` component creates a canvas for your chart. This is used to set limits on what your chart is drawn against.

##### ChartCanvas Props
height: required, used by subcomponents to identify their height
width: required, used by subcomponents to identify their width
scrollHorizontal: default true, if the charts inside the canvas overflow, they will be horizontally scrollable 
scrollEnabled: default true
min: smallest value found in the charts
max: largest value found in the charts

#### BarChart Props
data: required, should look like this: [[1,2,3], [4,5,6]] where each array in the array is a set of bars
isStacked: optional, whether a bar chart is stacked or not
accessor: optional, function that's used to identify what data to place in the chart (so if you have [[{value: 3}, {value: 4}], [{value: 1}, {value: 2}]] you can pass a function through here that returns value)
pathProps: optional, a list of dynamic properties passed on to each path, you can use this to set fills and events
min: smallest value found in the charts
max: largest value found in the charts

``` jsx
<ChartCanvas>
	<BarChart {...props} />
</ChartCanvas>
```
