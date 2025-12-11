import type { PortfolioData } from '../types';

// Import JSON data - TypeScript will handle this with resolveJsonModule
import data from '../../info.json';

// Load and export the portfolio data
export const portfolioData: PortfolioData = data as PortfolioData;

// Helper functions to access specific data sections
export const getPersonalInfo = () => portfolioData.info;
export const getExperience = () => portfolioData.experience;
export const getEducation = () => portfolioData.education;
export const getProjects = () => portfolioData.projects;
export const getSkills = () => portfolioData.skills;
export const getAwards = () => portfolioData.awards;
export const getReferences = () => portfolioData.references;

