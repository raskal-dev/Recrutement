import { QueryInterface } from "sequelize";

export = {
    async up(queryInterface: QueryInterface) {
        const competences = [
            { name: "JavaScript", createdAt: new Date(), updatedAt: new Date() },
            { name: "Python", createdAt: new Date(), updatedAt: new Date() },
            { name: "Java", createdAt: new Date(), updatedAt: new Date() },
            { name: "C++", createdAt: new Date(), updatedAt: new Date() },
            { name: "PHP", createdAt: new Date(), updatedAt: new Date() },
            { name: "HTML", createdAt: new Date(), updatedAt: new Date() },
            { name: "CSS", createdAt: new Date(), updatedAt: new Date() },
            { name: "React", createdAt: new Date(), updatedAt: new Date() },
            { name: "Angular", createdAt: new Date(), updatedAt: new Date() },
            { name: "Vue.js", createdAt: new Date(), updatedAt: new Date() },
            { name: "Node.js", createdAt: new Date(), updatedAt: new Date() },
            { name: "Express.js", createdAt: new Date(), updatedAt: new Date() },
            { name: "Laravel", createdAt: new Date(), updatedAt: new Date() },
            { name: "Django", createdAt: new Date(), updatedAt: new Date() },
            { name: "Flask", createdAt: new Date(), updatedAt: new Date() },
            { name: "Spring Boot", createdAt: new Date(), updatedAt: new Date() },
            { name: "MySQL", createdAt: new Date(), updatedAt: new Date() },
            { name: "PostgreSQL", createdAt: new Date(), updatedAt: new Date() },
            { name: "MongoDB", createdAt: new Date(), updatedAt: new Date() },
            { name: "Docker", createdAt: new Date(), updatedAt: new Date() },
            { name: "Kubernetes", createdAt: new Date(), updatedAt: new Date() },
            { name: "AWS", createdAt: new Date(), updatedAt: new Date() },
            { name: "Azure", createdAt: new Date(), updatedAt: new Date() },
            { name: "Git", createdAt: new Date(), updatedAt: new Date() },
            { name: "GitHub", createdAt: new Date(), updatedAt: new Date() },
            { name: "CI/CD", createdAt: new Date(), updatedAt: new Date() },
            { name: "TypeScript", createdAt: new Date(), updatedAt: new Date() },
            { name: "Sass", createdAt: new Date(), updatedAt: new Date() },
            { name: "Tailwind CSS", createdAt: new Date(), updatedAt: new Date() },
            { name: "Redis", createdAt: new Date(), updatedAt: new Date() },
            { name: "GraphQL", createdAt: new Date(), updatedAt: new Date() },
            { name: "Jenkins", createdAt: new Date(), updatedAt: new Date() },
            { name: "Webpack", createdAt: new Date(), updatedAt: new Date() },
            { name: "Gulp", createdAt: new Date(), updatedAt: new Date() },
            { name: "Nginx", createdAt: new Date(), updatedAt: new Date() },
            { name: "Apache", createdAt: new Date(), updatedAt: new Date() },
            { name: "Agile Methodology", createdAt: new Date(), updatedAt: new Date() },
            { name: "Scrum", createdAt: new Date(), updatedAt: new Date() },
            { name: "Unit Testing", createdAt: new Date(), updatedAt: new Date() },
            { name: "Integration Testing", createdAt: new Date(), updatedAt: new Date() },
            { name: "Machine Learning", createdAt: new Date(), updatedAt: new Date() },
            { name: "Data Analysis", createdAt: new Date(), updatedAt: new Date() },
            { name: "Big Data", createdAt: new Date(), updatedAt: new Date() },
            { name: "REST API", createdAt: new Date(), updatedAt: new Date() },
            { name: "SOAP", createdAt: new Date(), updatedAt: new Date() },
            { name: "Microservices", createdAt: new Date(), updatedAt: new Date() },
            { name: "UI/UX Design", createdAt: new Date(), updatedAt: new Date() },
            { name: "Figma", createdAt: new Date(), updatedAt: new Date() },
            { name: "Adobe XD", createdAt: new Date(), updatedAt: new Date() }
        ];

        await queryInterface.bulkInsert('Competences', competences, {});
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('Competences', {});
    }
};
