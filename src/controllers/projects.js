// Import any needed model functions
import { getAllServiceProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const projectCategories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';

    res.render('project', { title, project: projectDetails, categories: projectCategories });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };