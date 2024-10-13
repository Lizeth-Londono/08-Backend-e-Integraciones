const express = require('express');
const { categories, news } = require('./data');
const router = express.Router();

// Aqui obtengo todas las categor�as
router.get('/categories', (req, res) => {
    res.json(categories);
});

// Aqui obtengo todas las noticias
router.get('/news', (req, res) => {
    res.json(news);
});

// Aqui se crear una nueva categor�a
router.post('/categories', (req, res) => {
    const { title } = req.body;

    // Validaci�n nueva categor�a
    if (!title) {
        return res.status(400).json({ message: 'El t�tulo es requerido' });
    }

    const newCategory = { id: categories.length + 1, title, news: [] };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// Aqui se crea una nueva noticia
router.post('/news', (req, res) => {
    const { title, description, categoryId } = req.body;

    // Validaci�n nueva noticia
    if (!title || !description || !categoryId) {
        return res.status(400).json({ message: 'El t�tulo, la descripci�n y el categoryId son requeridos' });
    }

    const newNews = { id: news.length + 1, title, description, categoryId: parseInt(categoryId) };
    news.push(newNews);

    // Aqui se a�ade la noticia a la categor�a correspondiente
    const category = categories.find(c => c.id === parseInt(categoryId));
    if (category) {
        category.news.push(newNews);
    } else {
        return res.status(404).json({ message: 'Categor�a no encontrada' });
    }

    res.status(201).json(newNews);
});

// Aqui se actualiza una categor�a
router.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const category = categories.find(c => c.id === parseInt(id));

    if (category) {
        category.title = title;
        res.json(category);
    } else {
        res.status(404).json({ message: 'Categor�a no encontrada' });
    }
});

// Aqui se actualiza una noticia
router.put('/news/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;
    const noticia = news.find(n => n.id === parseInt(id));

    if (noticia) {
        noticia.title = title;
        noticia.description = description;
        noticia.categoryId = parseInt(categoryId);
        res.json(noticia);
    } else {
        res.status(404).json({ message: 'Noticia no encontrada' });
    }
});

// Aqui se elimina una categor�a
router.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(c => c.id === parseInt(id));

    if (categoryIndex !== -1) {
        const deletedCategory = categories.splice(categoryIndex, 1);
        res.json({ message: 'Categor�a eliminada', deletedCategory });
    } else {
        res.status(404).json({ message: 'Categor�a no encontrada' });
    }
});

// Aqui se elimina una noticia
router.delete('/news/:id', (req, res) => {
    const { id } = req.params;
    const newsIndex = news.findIndex(n => n.id === parseInt(id));

    if (newsIndex !== -1) {
        const deletedNews = news.splice(newsIndex, 1);
        res.json({ message: 'Noticia eliminada', deletedNews });
    } else {
        res.status(404).json({ message: 'Noticia no encontrada' });
    }
});

module.exports = router;
