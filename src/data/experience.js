// Experience data - STRICTLY from resume
export const experiences = [
    {
        id: 'exp-001',
        deploymentId: 'DEPLOY-2022-07',
        title: 'Cloud DevOps Engineer',
        company: 'Motherson Technology Services Limited',
        location: 'Noida, UP',
        period: 'July 2022 – Present',
        status: 'running',
        tags: ['AWS', 'DevOps', 'CI/CD', 'CloudWatch', 'Jenkins', 'VPC', 'IAM', 'Disaster Recovery'],
        achievements: [
            'Architected and deployed secure, scalable cloud infrastructure on AWS serving multiple business units, reducing infrastructure costs by implementing resource optimization strategies and right-sizing recommendations',
            'Led cloud migration initiatives from on-premises to AWS, executing lift-and-shift and re-platforming strategies while ensuring zero data loss and minimal downtime during transitions',
            'Designed and implemented comprehensive backup management and disaster recovery solutions across production environments, achieving 99.9% data integrity and RTO/RPO compliance',
            'Established monitoring and alerting systems using CloudWatch, creating custom dashboards and automated responses to reduce incident response time by 40%',
            'Built and maintained CI/CD pipelines using Jenkins and AWS CodePipeline, automating deployment processes and reducing manual deployment time by 60%',
            'Configured and managed VPC networks, security groups, IAM policies, and network ACLs following AWS Well-Architected Framework principles',
            'Performed regular security audits, vulnerability assessments, and compliance checks, implementing remediation strategies',
            'Managed multi-environment infrastructure (dev, staging, production) across Linux and Windows systems',
            'Provided technical mentorship to team members on AWS services, cloud best practices, and automation techniques'
        ],
        metrics: {
            uptime: '99.9%',
            incidentsResolved: '-40%',
            costSavings: '-60%'
        },
        logs: [
            '[INFO] Initializing cloud infrastructure deployment...',
            '[SUCCESS] AWS multi-environment setup complete',
            '[INFO] Configuring VPC, security groups, and IAM policies...',
            '[SUCCESS] CloudWatch monitoring dashboards created',
            '[SUCCESS] CI/CD pipelines operational - 60% time reduction',
            '[SUCCESS] 99.9% data integrity compliance achieved'
        ]
    },
    {
        id: 'exp-002',
        deploymentId: 'DEPLOY-2021-09',
        title: 'Front End Web Developer Intern',
        company: 'HELPY MOTO',
        location: 'New Delhi',
        period: 'Sep 2021 – Nov 2021',
        status: 'completed',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Development'],
        achievements: [
            'Developed responsive user interfaces for startup web applications using HTML, CSS, and JavaScript, ensuring cross-browser compatibility and optimal user experience',
            'Mentored new interns on front-end development best practices, code reviews, and agile development methodologies',
            'Collaborated closely with design and backend teams to implement features, troubleshoot issues, and deliver high-quality web solutions within tight deadlines'
        ],
        metrics: {
            uptime: '100%',
            incidentsResolved: 'N/A',
            costSavings: 'N/A'
        },
        logs: [
            '[INFO] Starting frontend development...',
            '[SUCCESS] Responsive UI components developed',
            '[SUCCESS] Internship completed successfully'
        ]
    }
];

// Education data - STRICTLY from resume
export const education = [
    {
        id: 'edu-001',
        institution: 'Guru Gobind Singh Indraprastha University',
        degree: 'Bachelor of Technology in Computer Science',
        period: '2018 – 2022',
        location: 'New Delhi, India',
        score: '85.81%',
        status: 'completed'
    },
    {
        id: 'edu-002',
        institution: 'BGS International Public School',
        degree: 'Senior Secondary Education (XII)',
        period: '2018',
        location: 'New Delhi, India',
        score: '66.8%',
        status: 'completed'
    },
    {
        id: 'edu-003',
        institution: 'BGS International Public School',
        degree: 'Secondary Education (X)',
        period: '2016',
        location: 'New Delhi, India',
        score: '79.8%',
        status: 'completed'
    }
];
