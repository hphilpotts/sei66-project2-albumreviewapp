// -- Requires:
const express= require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const albumsCtrl = require('../controllers/albums');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
  let upload = multer({ storage: storage })

const isLoggedIn = require('../helpers/isLoggedIn');

// -- Routes:
router.get('/album/add', isLoggedIn, albumsCtrl.album_create_get);
router.post('/album/add', upload.single('image'), albumsCtrl.album_create_post);

router.get('/album/index', albumsCtrl.album_index_get);
router.get('/album/genre_index', albumsCtrl.album_genre_get);
router.get('/album/detail', albumsCtrl.album_detail_get);

router.get('/album/edit', isLoggedIn, albumsCtrl.album_edit_get);
router.post('/album/update', albumsCtrl.album_edit_post);

router.get('/album/delete', isLoggedIn, albumsCtrl.album_delete);

module.exports = router;