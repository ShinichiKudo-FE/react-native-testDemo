/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
  ImageBackground,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

let REQUEST_URL = 'https://raw.githubusercontent.com/LeoMobileDeveloper/React-Native-Files/master/person.json';

export default class App extends Component {
  render() {
    return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: '主页',
                    component: ListScreen,
                }}
            />
    );
  }
}
class ListScreen extends Component {
    constructor (props){
        super(props);
        this.state = {
            loaded: false,
            users: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: this.state.users.cloneWithRows(responseData),
                    loaded: true,
                });
            })
            .done();
    }

    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView()
        }
        return this.renderList()
    }

    renderLoadingView() {
        return (
            <ImageBackground source={require('./img/timg.jpeg')} style={styles.backgroundLoading}>
                <ActivityIndicator
                    style={[styles.centering, {height: 80}]}
                    size="large"
                    color="#ffffff"
                />
            </ImageBackground>
        );
    }

    renderList(){
        return (
            <ImageBackground source={require('./img/timg.jpeg')} style={styles.backgroundImg}>
                <ListView
                    dataSource={this.state.users}
                    renderRow={this.renderRow.bind(this)}
                    style={styles.fullList}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                />
            </ImageBackground>
        );
    }
    renderRow(user){
        return (
            <TouchableHighlight
                onPress={() => this.rowClicked(user)}
                underlayColor = '#ddd'>
                <View style={styles.rightCongtainer}>
                    <Text style={styles.whiteText}>{user.nickname}</Text>
                    <Text style={styles.whiteText}>{user.realname}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    rowClicked(user){
        // console.log(user);
        this.props.navigator.push({
            title: "详情页",
            component: DetailScreen,
            passProps: {user:user},
        });
    }


}
class DetailScreen extends Component{
    render(){
        return (
            <View style= {styles.container}>
                <Text style={styles.blackText}>{this.props.user.nickname}</Text>
                <Text style={styles.blackText}>{this.props.user.realname}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImg:{
        flex:1,
        width: null,
        height: null,
        flexDirection: 'row'
    },
    backgroundLoading:{
        flex:1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    thumbnail: {
        width: 60,
        height: 60,
    },
    rightCongtainer:{
        flex:1,
    },
    fullList:{
        flex:1,
        paddingTop: 64,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteText:{
        fontSize:20,
        color:'rgb(0,0,0)',
        backgroundColor:'rgba(255,255,255,0)',
        textAlign:'left',
        marginLeft:10,
    },
    blackText:{
        fontSize:20,
        color:'rgb(0,0,0)',
        backgroundColor:'rgba(255,255,255,0)',
        textAlign:'center',
        marginLeft:10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
});
