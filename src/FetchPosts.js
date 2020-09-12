import React, {Component} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import PostDataTable from './PostDataTable';

export default class FetchPosts extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      responseList: [],
      searchedData: [],
      search: '',
      fetchingStatus: false,
      setOnLoad: false,
    };
    this.page = -1;
  }

  componentDidMount() {
    this.apiCall();
    this._interval = setInterval(() => {
      this.apiCall();
    }, 10000);
  }

  apiCall = () => {
    var that = this;
    that.page = that.page + 1;

    that.setState({fetching_Status: true});
    fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' +
        that.page,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        that.setState({
          responseList: [...this.state.responseList, ...responseJson.hits],
          searchedData: [...this.state.searchedData, ...responseJson.hits],
          isLoading: false,
          setOnLoad: true,
        });
      })
      .catch(error => {
        console.error(error);
        that.setState({setOnLoad: false, fetching_Status: false});
      });
  };
  footer = () => {
    return (
      <View style={styles.bottomLoader}>
        {this.state.fetchingStatus ? (
          <ActivityIndicator size="large" color="#6CD0FA" />
        ) : null}
      </View>
    );
  };

    
 updateSearch = (value, type) => {
        console.log('-----', value, type)
        this.setState({search: value})

        const data = this.state.responseList

        var newData = []
        //passing the inserted text in textinput
        newData = data.filter(function (item) {
            //console.log('22222222222', item)
            //applying filter for the inserted text in search bar
            const itemData = item.author ? item.author.toUpperCase() : ''.toUpperCase();
            const textData = value.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({searchedData: newData})
    };

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>

        <View style={{backgroundColor: '#d3dde0', height: 60, width: '100%', alignItems: 'center',justifyContent: 'center'}}>
            <TextInput style={styles.serachInput}
                placeholder= 'Search by author name'
                placeholderTextColor = 'grey'
                color = 'black'
                onChangeText={search =>this.updateSearch(search)}
                value={this.state.search}>
            </TextInput>
        </View>    
        

        {this.state.isLoading ? (
          <View style={styles.bottomLoader}>
            <ActivityIndicator
              size={100}
              color="#6CD0FA"
              style={styles.loader}
            />
          </View>
        ) : (
          <FlatList
            style={{width: '100%'}}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.searchedData}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => (
              <View style={{backgroundColor: '#dcedf2'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DisplayPost', {
                      data: item,
                    });
                  }}>
                  <View style={styles.viewStyle}>
                    <PostDataTable
                      title={item.title}
                      URL={item.url}
                      created_at={item.created_at}
                      author={item.author}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{backgroundColor: 'white', width: '100%', height:16}}></View>
              </View>
            )}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomLoader: {
    marginTop: '70%',
  },
  container: 
  {
    backgroundColor: '#f2f2f2'
  },
  serachInput:{
    width: '90%',
    height:  50,
    paddingLeft: '1%',
    fontSize: 20,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.3,
    borderRadius: 10,
    color: 'white'
  }
});