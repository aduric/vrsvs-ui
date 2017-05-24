'use strict';

import React, { PropTypes } from 'react'
import RecordRTC from 'recordrtc';
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import Replay from 'material-ui/svg-icons/av/replay';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Record from 'material-ui/svg-icons/av/album';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

function captureUserMedia(callback) {
  var params = { audio: false, video: true };

  navigator.getUserMedia(params, callback, (error) => {
    alert(JSON.stringify(error));
  });
};

// Path within Database for metadata (also used for file Storage path)
const filesPath = 'uploadedFiles'

@firebaseConnect([
  filesPath
])
@connect(
  ({ firebase }) => ({
    uploadedFiles: dataToJS(firebase, filesPath)
  })
)
export default class Recorder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          recordVideo: null,
          src: null,
          uploadSuccess: null,
          uploading: false,
          previewPath: null
        };

        this.updateUploadedPath = this.updateUploadedPath.bind(this);
        this.updatePreviewPath = this.updatePreviewPath.bind(this);
        this.discardCurrentVideo = this.discardCurrentVideo.bind(this);
        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
    }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  discardCurrentVideo() {
    this.setState({ uploadSuccess: null, uploading: false });    
    this.updateUploadedPath(null);
  }

  updateUploadedPath(path) {
    this.props.changeVideoPath(path);
  }

  updatePreviewPath(path) {
    this.props.changePreviewPath(path);
  }

  stopRecord() {
        this.state.recordVideo.stopRecording(() => {
        let params = {
            type: 'video/webm',
            data: this.state.recordVideo.blob,
            id: Math.floor(Math.random()*90000) + 10000
        }

        this.setState({ uploading: true });
        var filePath = filesPath;
        this.props.firebase.uploadFile(filePath, params.data, filePath)
            .then(file => {
                this.setState({ uploadSuccess: true, uploading: false, previewPath: file.File.downloadURL });
                this.updatePreviewPath(file.File.downloadURL);
                this.updateUploadedPath(file.key);
            })
            .catch(error => {
                console.log(error, 'error occurred while uploading files')
            })
    });
}

  render() {
    if(this.state.uploadSuccess) {
      return(
        <div>
          <ReactPlayer url={this.state.previewPath} controls playing loop muted playsinline width={320} height={200}/>
        <Toolbar>
          <ToolbarGroup 
            firstChild={true}
            style={{
              margin: '0 auto',
            }}>
            <FloatingActionButton
                mini={true}
                onTouchTap={() => this.discardCurrentVideo()}>
                <Replay />
            </FloatingActionButton>
            </ToolbarGroup>
          </Toolbar>
        </div>
      )
    } else {
      return(
        <div>
          <div><video src={this.state.src} width="320" height="200" autoPlay></video></div>
          <Toolbar>
          <ToolbarGroup
            firstChild={true}
            style={{
              margin: '0 auto',
            }}>
            <FloatingActionButton 
              mini={true}
              onTouchTap={this.startRecord}>
              <Record />
            </FloatingActionButton>
            </ToolbarGroup>
          </Toolbar>
          {this.state.uploading ?
            <div>Uploading...</div> : null}
          <div>
        </div>
        </div>
      )
    }
  }
}
