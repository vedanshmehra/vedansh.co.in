// Skills - STRICTLY from resume Technical Skills section
export const skillRegions = {
    'ap-south-1': {
        name: 'Cloud Platforms',
        color: '#FF9900',
        skills: [
            { name: 'AWS EC2', proficiency: 95, category: 'Compute' },
            { name: 'AWS S3', proficiency: 95, category: 'Storage' },
            { name: 'AWS RDS', proficiency: 90, category: 'Database' },
            { name: 'AWS VPC', proficiency: 95, category: 'Networking' },
            { name: 'AWS IAM', proficiency: 95, category: 'Security' },
            { name: 'AWS CloudWatch', proficiency: 90, category: 'Monitoring' },
            { name: 'AWS Lambda', proficiency: 85, category: 'Serverless' },
            { name: 'AWS ECS', proficiency: 85, category: 'Containers' },
            { name: 'AWS CloudFormation', proficiency: 88, category: 'IaC' },
            { name: 'AWS CodePipeline', proficiency: 90, category: 'CI/CD' },
            { name: 'Google Cloud Platform', proficiency: 70, category: 'Cloud' },
            { name: 'Microsoft Azure', proficiency: 65, category: 'Cloud' }
        ]
    },
    'eu-west-1': {
        name: 'DevOps & Automation',
        color: '#00D9FF',
        skills: [
            { name: 'Jenkins', proficiency: 90, category: 'CI/CD' },
            { name: 'Git', proficiency: 95, category: 'Version Control' },
            { name: 'AWS CodePipeline', proficiency: 90, category: 'CI/CD' },
            { name: 'CI/CD Pipelines', proficiency: 92, category: 'Automation' },
            { name: 'Infrastructure as Code', proficiency: 88, category: 'IaC' },
            { name: 'Configuration Management', proficiency: 85, category: 'Automation' }
        ]
    },
    'us-east-1': {
        name: 'Backup & Recovery',
        color: '#00FF41',
        skills: [
            { name: 'Disaster Recovery Planning', proficiency: 92, category: 'DR' },
            { name: 'Data Integrity Management', proficiency: 95, category: 'Operations' },
            { name: 'High Availability Architecture', proficiency: 90, category: 'Architecture' }
        ]
    },
    'ap-northeast-1': {
        name: 'Monitoring & Security',
        color: '#FF6B6B',
        skills: [
            { name: 'CloudWatch', proficiency: 92, category: 'Monitoring' },
            { name: 'IAM Security', proficiency: 95, category: 'Security' },
            { name: 'Performance Monitoring', proficiency: 90, category: 'Monitoring' },
            { name: 'Cost Optimization', proficiency: 88, category: 'FinOps' },
            { name: 'Troubleshooting', proficiency: 92, category: 'Operations' }
        ]
    },
    'sa-east-1': {
        name: 'Operating Systems',
        color: '#9B59B6',
        skills: [
            { name: 'Linux (Ubuntu)', proficiency: 95, category: 'OS' },
            { name: 'Linux (CentOS)', proficiency: 90, category: 'OS' },
            { name: 'Linux (RHEL)', proficiency: 88, category: 'OS' },
            { name: 'Windows Server', proficiency: 85, category: 'OS' }
        ]
    },
    'ca-central-1': {
        name: 'Development',
        color: '#E67E22',
        skills: [
            { name: 'HTML', proficiency: 90, category: 'Frontend' },
            { name: 'CSS', proficiency: 88, category: 'Frontend' },
            { name: 'JavaScript', proficiency: 85, category: 'Frontend' },
            { name: 'Python', proficiency: 80, category: 'Programming' },
            { name: 'Bash Scripting', proficiency: 92, category: 'Scripting' }
        ]
    }
};

// Flat skill list for other uses
export const allSkills = Object.values(skillRegions).flatMap(region =>
    region.skills.map(skill => ({ ...skill, region: region.name }))
);
