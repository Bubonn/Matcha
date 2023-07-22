const acceptJsonOnly = (req: any, res: any, next: any) => {
	console.log('OK');
	if (req.is('json')) {
	  next();
	} else {
	  res.status(400).json({ error: 'Requête accepte uniquement le format JSON.' });
	}
};

export default acceptJsonOnly;