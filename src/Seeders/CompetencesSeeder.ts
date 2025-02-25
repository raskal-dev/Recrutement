'use strict';

import { Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: any, sequelize: Sequelize) => {
    const competences = [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "PHP" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "React" },
      { name: "Angular" },
      { name: "Vue.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Laravel" },
      { name: "Django" },
      { name: "Flask" },
      { name: "Spring Boot" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "AWS" },
      { name: "Azure" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "CI/CD" },
      { name: "TypeScript" },
      { name: "Sass" },
      { name: "Tailwind CSS" },
      { name: "Redis" },
      { name: "GraphQL" },
      { name: "Jenkins" },
      { name: "Webpack" },
      { name: "Gulp" },
      { name: "Nginx" },
      { name: "Apache" },
      { name: "Agile Methodology" },
      { name: "Scrum" },
      { name: "Unit Testing" },
      { name: "Integration Testing" },
      { name: "Machine Learning" },
      { name: "Data Analysis" },
      { name: "Big Data" },
      { name: "REST API" },
      { name: "SOAP" },
      { name: "Microservices" },
      { name: "UI/UX Design" },
      { name: "Figma" },
      { name: "Adobe XD" }
    ];

    await queryInterface.bulkInsert('Competences', competences, {});
  },

  down: async (queryInterface: any, sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Competences', null, {});
  }
};
