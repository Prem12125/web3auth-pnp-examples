import React from 'react';
import { View, Text } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import { G, Line, Rect } from 'react-native-svg';
import LineChartExample1 from './LineGraph1';

const LineChartExample = () => {
    const data = [
        { x: 'Jan', y: 70 },
        { x: 'Feb', y: 100 },
        { x: 'Mar', y: 300 },
        { x: 'Apr', y: 250 },
        { x: 'May', y: 600 },
        { x: 'Jun', y: 40 },
        { x: 'Jul', y: 300 },
        { x: 'Aug', y: 100 },
        { x: 'Sep', y: 300 },
    ];

    const xValues = data.map(item => item.x);
    const yValues = data.map(item => item.y);

    return (<>
        <View style={{ flexDirection: 'row', height: 300, padding: 20 }}>
            <YAxis
                data={yValues}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'white',
                    fontSize: 12,
                }}
                numberOfTicks={6}
                formatLabel={(value) => `${value}`}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={yValues}
                    curve={shape.curveNatural}
                    svg={{
                        strokeWidth: 2,
                        stroke: 'url(#gradient)',
                    }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                    <Defs key={'gradient'}>
                        <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'100%'} y2={'0%'}>
                            <Stop offset={'0%'} stopColor={'green'} />
                            <Stop offset={'100%'} stopColor={'yellow'} />
                        </LinearGradient>
                    </Defs>
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: 30 }}
                    data={xValues}
                    formatLabel={(index) => xValues[index]}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{ fontSize: 12, fill: 'white' }}
                />


            </View>


        </View>
        <View>
<LineChartExample1/>

        </View>
        </>
    );
};

export default LineChartExample;
