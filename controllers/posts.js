const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Post = require('../models/post')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
  module.exports.getById = async function(req, res) {
    try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
  module.exports.remove = async function(req, res) {
    try {
      await Post.remove({_id: req.params.id})
      res.status(200).json({
        message: 'Категория удалена.'
      })
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
  module.exports.dashboard = async function(req, res) {
    const post = new Post({
      category: req.body.category,
      title: req.body.title,
      image: req.file ? req.file.path : '',
      text: req.body.text,
      author : req.body.author
    })
  
    try {
      await post.save()
      res.status(201).json(post)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
  module.exports.update = async function(req, res) {
    const updated = {
        category: req.body.category,
        title: req.body.title,
        text: req.body.text,
        author : req.body.author,
        date: req.body.date
    }
  
    if (req.file) {
      updated.photo = req.file.path
    }
  
    try {
      const post = await Post.findOneAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
      )
      res.status(200).json(post)
    } catch (e) {
      errorHandler(res, e)
    }
  }