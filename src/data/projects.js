// Projects based on resume work achievements at Motherson
export const projectCategories = {
    'cloud-infra': {
        label: 'Cloud Infrastructure',
        icon: '☁️',
        color: '#FF9900'
    },
    'devops': {
        label: 'DevOps & CI/CD',
        icon: '🔄',
        color: '#00D9FF'
    },
    'monitoring': {
        label: 'Monitoring & Security',
        icon: '📊',
        color: '#00FF41'
    },
    'migration': {
        label: 'Cloud Migration',
        icon: '🚀',
        color: '#9B59B6'
    }
};

export const projects = [
    {
        instanceId: 'i-aws-infra-001',
        name: 'Enterprise AWS Infrastructure',
        description: 'Architected and deployed secure, scalable cloud infrastructure on AWS serving multiple business units, implementing resource optimization strategies and right-sizing recommendations to reduce infrastructure costs.',
        category: 'cloud-infra',
        status: 'running',
        instanceType: 't3.large',
        launchTime: '2022-07',
        technologies: ['AWS EC2', 'VPC', 'IAM', 'Security Groups', 'CloudFormation', 'S3', 'RDS'],
        highlights: [
            'Secure, scalable infrastructure for multiple business units',
            'Resource optimization and right-sizing',
            'Cost reduction through strategic planning'
        ],
        metrics: {
            businessUnits: 'Multiple',
            costReduction: 'Optimized',
            security: 'AWS Well-Architected'
        }
    },
    {
        instanceId: 'i-migration-001',
        name: 'On-Premises to AWS Migration',
        description: 'Led cloud migration initiatives from on-premises to AWS, executing lift-and-shift and re-platforming strategies while ensuring zero data loss and minimal downtime during transitions.',
        category: 'migration',
        status: 'running',
        instanceType: 'm5.xlarge',
        launchTime: '2022-08',
        technologies: ['AWS', 'Migration Strategies', 'Lift-and-Shift', 'Re-platforming'],
        highlights: [
            'Zero data loss during migrations',
            'Minimal downtime transitions',
            'Lift-and-shift and re-platforming strategies'
        ],
        metrics: {
            dataLoss: '0%',
            downtime: 'Minimal',
            strategy: 'Hybrid'
        }
    },
    {
        instanceId: 'i-backup-dr-001',
        name: 'Backup & Disaster Recovery',
        description: 'Designed and implemented comprehensive backup management and disaster recovery solutions across production environments, achieving 99.9% data integrity and RTO/RPO compliance.',
        category: 'cloud-infra',
        status: 'running',
        instanceType: 'm5.large',
        launchTime: '2022-09',
        technologies: ['AWS Backup', 'S3', 'Disaster Recovery', 'RTO/RPO Planning'],
        highlights: [
            '99.9% data integrity achieved',
            'RTO/RPO compliance maintained',
            'Production environment coverage'
        ],
        metrics: {
            dataIntegrity: '99.9%',
            compliance: 'RTO/RPO',
            coverage: 'Production'
        }
    },
    {
        instanceId: 'i-monitoring-001',
        name: 'CloudWatch Monitoring System',
        description: 'Established monitoring and alerting systems using CloudWatch, creating custom dashboards and automated responses to reduce incident response time by 40% and prevent service disruptions.',
        category: 'monitoring',
        status: 'running',
        instanceType: 't3.medium',
        launchTime: '2022-10',
        technologies: ['CloudWatch', 'Custom Dashboards', 'Automated Alerting', 'SNS'],
        highlights: [
            '40% reduction in incident response time',
            'Custom dashboards created',
            'Automated responses configured'
        ],
        metrics: {
            responseTime: '-40%',
            dashboards: 'Custom',
            alerts: 'Automated'
        }
    },
    {
        instanceId: 'i-cicd-001',
        name: 'CI/CD Pipeline Automation',
        description: 'Built and maintained CI/CD pipelines using Jenkins and AWS CodePipeline, automating deployment processes and reducing manual deployment time by 60%.',
        category: 'devops',
        status: 'running',
        instanceType: 't3.medium',
        launchTime: '2022-11',
        technologies: ['Jenkins', 'AWS CodePipeline', 'Git', 'Automation'],
        highlights: [
            '60% reduction in manual deployment time',
            'Automated deployment processes',
            'Jenkins and CodePipeline integration'
        ],
        metrics: {
            deploymentTime: '-60%',
            automation: 'Full',
            tools: 'Jenkins + CodePipeline'
        }
    },
    {
        instanceId: 'i-security-001',
        name: 'Security & Compliance Framework',
        description: 'Configured and managed VPC networks, security groups, IAM policies, and network ACLs following AWS Well-Architected Framework principles. Performed regular security audits and vulnerability assessments.',
        category: 'monitoring',
        status: 'running',
        instanceType: 't3.small',
        launchTime: '2023-01',
        technologies: ['VPC', 'Security Groups', 'IAM', 'Network ACLs', 'AWS Well-Architected'],
        highlights: [
            'AWS Well-Architected Framework compliance',
            'Regular security audits performed',
            'Vulnerability assessments conducted'
        ],
        metrics: {
            framework: 'AWS Well-Architected',
            audits: 'Regular',
            compliance: 'Industry Best Practices'
        }
    }
];
