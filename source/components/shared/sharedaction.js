import React, { Component } from 'react';
import {
  Animated
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import { CLOUDINARY } from '../../shared/config';

export var firstlook = (translate, opaciti) => {
  Animated.parallel([
    Animated.timing(translate, {
      toValue: 1,
      duration: 1000
    }),
    Animated.timing(opaciti, {
      toValue: 1,
      duration: 500,
      delay: 150
    })
  ]).start()
};

export var absoluteform = (translate1, translate2) => {
  Animated.timing(translate1, {
    toValue: 2,
    duration: 900
  }).start(() => {
    translate2.setValue(0)
  });
  return true
};

export var setpicture = async(file) => {
  var status = true;
  var upload = new FormData();
  upload.append('file', {
    uri: file.image.uri,
    type: file.type,
    name: Date.now().toString()
  });
  upload.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
  upload.append('api_key', CLOUDINARY.API_KEY_CLOUDINARY);
  var result = await axios.post(CLOUDINARY.CLOUDINARY_FETCH_POST, upload);
  return {result};
};
