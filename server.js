import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllServiceProjects } from './src/models/projects.js';
import { getAllServiceCategories } from './src/models/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Define the directory path for the server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
try {
        const projects = await getAllServiceProjects(); 
        
        const title = 'Service Projects';
        
        res.render('projects', { title, projects }); 
        
    } catch (error) {
        console.error("Erro ao buscar projetos de serviço:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.get('/categories', async (req, res) => {
    const title = 'Service Categories';
    res.render('categories', { title });
});

app.get('/categories/:categoryId', async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10);

    try {
        const categories = await getAllServiceCategories();
        const category = categories.find(c => c.category_id === categoryId);

        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' }); 
        }

        const title = category.name;
        res.render('category', { title, category });

    } catch (error) {
        console.error("Error: Category not found:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});