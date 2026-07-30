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
            SELECT
                c.category_id,
                c.name
            FROM public.categories c
            JOIN public.project_categories pc ON c.category_id = pc.category_id
            WHERE pc.project_id = $1;
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

export {getAllServiceCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId};