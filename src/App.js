import React from 'react';

//Material-ui
import {Grid} from '@material-ui/core';

import {SearchBar, VideoList, VideoDetail} from './components';

import YT from'./api/YT';

import './App.css'

class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handleSubmit('JavaScript')
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo:video})
    }

    handleSubmit = async(st) => {
        const response = await YT.get('search', {
            params: {
                part: 'snippet',
                maxResults: '5',
                key: 'AIzaSyBgscOtI7NBXMikk5MX2kdsqxVnL9l-qkQ',
                q : st,
            }
        });

        this.setState({videos : response.data.items, selectedVideo: response.data.items[0]});
    }

    render (){

        const {selectedVideo, videos} = this.state;

        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={11} >
                    <Grid container space={10} >
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;