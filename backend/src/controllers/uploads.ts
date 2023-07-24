import { getConnection } from '../services/db';
import { Request, Response } from 'express';
import * as fs from 'fs';

export const setPhoto = async (req: Request, res: Response) => {
	const { id } = req.params;
	const file = req.file;
	if (file) {
		const extension = file.originalname.split('.').pop();
		const newFileName = `${id}-${Date.now()}.${extension}`;
		console.log('Test node', newFileName);

		fs.rename(file.path, `uploads/${newFileName}`, (err: any) => {
			if (err) {
				console.error('Error while renaming the file', err);
				res.status(500).json({ error: 'An error occurred while saving the file' });
			} else {
				console.log('File saved successfully');
				res.status(200).json({ message: 'File saved successfully' });
			}
		});
	}

	// try {
	// 	const connection = getConnection();
	// 	console.log('UPLOADDDDDDDDDDDDD');
	// 	return res.json({ message: 'Photo successfully upload' });

	// } catch (error) {
	// 	return res.status(500).json({ message: 'An error occurred while updating Photo``' });
	// }
};
