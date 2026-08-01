import db from './db.js'

const getAllServiceCategories = async() => {
    const query = `
            SELECT 
                c.category_id,
                c.name
            FROM public.categories c;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async(categoryId) => {
    const query = `
            SELECT
                c.category_id,
                c.name
            FROM public.categories c
            WHERE c.category_id = $1;
        `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
}

const getCategoriesByProjectId = async(projectId) => {
        const query = `
                SELECT c.category_id, c.name 
                FROM categories c
                JOIN project_categories pc ON c.category_id = pc.category_id
                WHERE pc.project_id = $1
                ORDER BY c.name ASC;
            `;

    const result = await db.query(query, [projectId]);

    return result.rows;
}

const getProjectsByCategoryId = async(categoryId) => {
    const query = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.project_date AS date,
                p.project_location AS location,
                p.organization_id,
                o.username AS organization_name
            FROM service_projects p
            JOIN project_categories pc ON p.project_id = pc.project_id
            JOIN organization o ON p.organization_id = o.organization_id
            WHERE pc.category_id = $1
            ORDER BY p.project_date ASC;
        `;
        
    const result = await db.query(query, [categoryId]);

    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;
    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found or update failed');
    }

    return result.rows[0];
};

export {getAllServiceCategories, 
        getCategoryById, 
        getCategoriesByProjectId, 
        getProjectsByCategoryId, 
        assignCategoryToProject, 
        updateCategoryAssignments, 
        createCategory, 
        updateCategory};