/**
 * Created by caasjj on 11/13/15.
 */
'use strict'

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports.User = {

  attributes: {
    email:'STRING',
    password:{
      type: 'STRING',
      required: true
    },
    accounts:{
      collection: 'account',
      via: 'owner'
    }
  }
}

