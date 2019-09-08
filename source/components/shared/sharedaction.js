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

export var setcategoriservice = (categori, indexID) => {
  var categorix = Object.assign({}, categori);
  categorix['indexID'] = indexID.toString();
  return categorix
}

export var titleCase = (str) => {
 var splitStr = str.toLowerCase().split(' ');
 for (var i = 0; i < splitStr.length; i++) {
     // You do not need to check if i is larger than splitStr length, as your for does that for you
     // Assign it back to the array
     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
 }
 // Directly return the joined string
 return splitStr.join(' ');
}


export var getTextMonth = (date) => {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var enddate = new Date(date);
  return `${monthNames[enddate.getMonth()]}, ${enddate.getDate()} ${enddate.getFullYear()}`
}


export var countDiscount = (date) => {
  var toDay = new Date();
  var targetDay = new Date(date);
  var oneDay = 1000 * 3600 * 24;
  var finalDay = Math.round((targetDay.getTime() - toDay.getTime()) / oneDay);
  return finalDay;
}
