import express from 'express';
import { setPhoto } from '../controllers/uploads';
import multer from 'multer';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({
	dest: 'uploads/',
	fileFilter: (req, file, cb) => {
		// Vérifiez le type de fichier pour vous assurer que c'est une image valide
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
			return cb(new Error('Seules les images au format JPG, JPEG, PNG et GIF sont autorisées.'));
		}
		cb(null, true);
	}
});

router.post('/:id', upload.single('photo_profil'), setPhoto);

export default router;
