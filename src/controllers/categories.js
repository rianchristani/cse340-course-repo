// Import any needed model functions
import { getAllServiceCategories } from '../models/categories.js';
import { getCategoryById } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';


// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllServiceCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projectsInCategory = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, category: categoryDetails, projects: projectsInCategory });
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };