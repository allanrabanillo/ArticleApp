import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  FlatList
} from 'react-native';
import { WebBrowser,AppLoading } from 'expo';
import {List,ListItem} from 'react-native-elements';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  state = {
    isLoadingComplete: false,
    articleData: [],
    page: 1,
    loading: false
  };

  componentWillMount(){
    this.fetchArticle();
  }

  fetchArticle = async () => {
    const response = await fetch(`http://10.139.5.106/articleAPI/public/api/articles?page=${this.state.page}`,
        {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
     const json = await response.json();
     this.setState(state => ({
       articleData: [...state.articleData,...json.data],
       loading: false 
      }));
      //console.log(this.state.articleData)
      // this.setState({articleData:json.data})
  }

  handleEnd = () => {
    console.log('event called');
    this.setState(state => ({ page:state.page + 1 }),() => this.fetchArticle());
  }

  render() {
     return (
         <View style={styles.container}>

          <List>
            <FlatList
            data = {this.state.articleData}
            keyExtractor = {(x,i) => i}
            onEndReached={this.handleEnd}
            onEndReachedThreshold={0}
            renderItem = {({item}) => 
              <ListItem
                title={item.title}
              />           
              }
            />
          </List>
        </View>
      );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginTop:0,
    backgroundColor: '#fff',
  },
});


