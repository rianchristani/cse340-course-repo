import db from './db.js'

const getAllServiceProjects = async() => {
    const query = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.project_location,
                p.project_date,
                o.username AS organization_name,
                o.logo_filename
            FROM public.service_projects p
            INNER JOIN public.organization o ON p.organization_id = o.organization_id;
        `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllServiceProjects}  