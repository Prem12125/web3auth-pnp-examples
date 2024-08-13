import React from 'react';
import { View , StyleSheet} from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient, Stop, Defs } from 'react-native-svg';

const LineChartExample1 = () => {
    const data1 = [70, 100, 200, 150, 250, 10, 300, 20, 70];
    const data2 = [100, 250, 200, 500, 300, 300, 100, 150, 100];

    const xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

    return (
        <View style={{ flexDirection: 'row', height: 300, padding: 20 }}>
            <YAxis
                data={[...data1, ...data2]}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'white',
                    fontSize: 12,
                }}
                numberOfTicks={6}
                formatLabel={(value) => `${value}`}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                {/* First LineChart */}
                <LineChart
                    style={{ flex: 1 }}
                    data={data1}
                    curve={shape.curveNatural}
                    svg={{
                        strokeWidth: 2,
                        stroke: 'url(#gradient1)',
                    }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                    <Defs key={'gradient1'}>
                        <LinearGradient id={'gradient1'} x1={'0%'} y={'0%'} x2={'100%'} y2={'0%'}>
                            <Stop offset={'0%'} stopColor={'green'} />
                            <Stop offset={'100%'} stopColor={'yellow'} />
                        </LinearGradient>
                    </Defs>
                </LineChart>

                {/* Second LineChart */}
                <LineChart
                    style={StyleSheet.absoluteFill}
                    data={data2}
                    curve={shape.curveNatural}
                    svg={{
                        strokeWidth: 2,
                        stroke: 'blue',  // Solid blue color for the second line
                    }}
                    contentInset={{ top: 20, bottom: 20 }}
                />

                <XAxis
                    style={{ marginHorizontal: -10, height: 30 }}
                    data={xValues}
                    formatLabel={(index) => xValues[index]}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{ fontSize: 12, fill: 'white' }}
                />
            </View>
        </View>
    );
};

export default LineChartExample1;
