import type { ResumeData } from '~/types'
import type { CustomSectionItem, LeftColumnSectionItem } from '~/types/editor'

export const resumeTemplate1: ResumeData = {
  id: '0',
  themeColor: '',
  profileImage: '/images/img.png', // заменил на реальный путь
  name: 'Name',
  lastName: 'Last Name',
  jobTitle: 'Software Engineer',

  contact: {
    label: 'contact',
    list: [
      {
        icon: 'phone',
        phone: '+1 2345 6789',
      },
      {
        icon: 'email_outline',
        email: 'example@gmail.com',
      },
      {
        icon: 'location_pin',
        address: '#1 road, city/state-0011',
      },
    ],
  },

  skills: {
    show: true,
    label: 'skills',
    content: [
      'SQL Database Management',
      'Linux/Unix Command line',
      'Python',
      'C++',
      'JAVA',
    ],
  },

  profile: {
    show: true,
    label: 'profile',
    aboutMe: `I am a software engineer with experience in a variety of programming languages and a track record of delivering high-quality code. I am skilled in problem-solving and have a strong background in computer science. I am a strong communicator and enjoy working collaboratively with others.`,
  },

  languages: {
    show: true,
    label: 'languages',
    list: [
      { lang: 'English', level: 'Proficient' },
      { lang: 'Hindi', level: 'Proficient' },
    ],
  },

  hobbies: {
    show: true,
    label: 'hobbies',
    content: ['Writing', 'Cricket', 'Music'],
  },

  experience: {
    show: true,
    label: 'work experience',
    list: [
      {
        id: 1,
        title: 'Senior Software Developer',
        dates: {
          start: new Date('Jan 2022'),
          end: new Date('Dec 2023'),
          current: false,
        },
        company: 'Company',
        country: 'Country',
        content: {
          tag: 'ul',
          content: [
            'Developed and maintained software using Java, Python, and C++',
            'Led cross-functional teams to deliver successful software projects',
            'Wrote work experience of a senior software engineer in bullet points',
          ],
        },
      },
      {
        id: 2,
        title: 'Web Developer',
        dates: {
          start: new Date('Jan 2021'),
          end: new Date('Dec 2021'),
          current: false,
        },
        company: 'Company',
        country: 'Country',
        content: {
          tag: 'ul',
          content: [
            'Developed and maintained various web applications using languages such as HTML, CSS, JavaScript, and PHP',
            'Worked with cross-functional teams to gather requirements and design user interfaces',
          ],
        },
      },
    ],
  },

  education: {
    show: true,
    label: 'education',
    list: [
      {
        id: 1,
        title: 'Masters in Software Engineering',
        dates: {
          start: new Date('Jan 2019'),
          end: new Date('Dec 2020'),
          current: false,
        },
        location: 'XYX University, Bangalore',
      },
      {
        id: 2,
        title: 'Bachelor in Computer Science',
        dates: {
          start: new Date('Jan 2015'),
          end: new Date('Dec 2018'),
          current: false,
        },
        location: 'XYX University, Bangalore',
      },
    ],
  },
  leftColumnSections: [],
  customSections: [] as CustomSectionItem[],
  additionalSections: {},
}

export const resumeTemplate2: ResumeData = {
  id: '1',
  themeColor: '',
  name: 'JACKSON',
  lastName: 'WRIGHT',
  contact: {
    label: 'contact',
    list: [
      {
        icon: 'phone',
        phone: '555-555-5555',
      },
      {
        icon: 'email',
        email: 'example@example.com',
      },
      {
        icon: 'person',
        address: 'Port Townsend, WA 98368',
      },
    ],
  },

  profile: {
    show: true,
    label: 'PROFESSIONAL SUMMARY',
    aboutMe: `Software engineer with 12 years of experience contributing great technical solutions that directly impact businesses. Skilled in generating creative ideas to improve products and services. Takes ownership and is comfortable making decisions, and building consensus.`,
  },

  skills: {
    show: true,
    label: 'skills',
    content: [
      'Strong PostgreSQL proficiency',
      'Troubleshooting',
      'Feedback application',
      'Continuous delivery and deployment',
      'Senior and junior teamwork',
      'Code reviews',
      'Technical presentations',
      'Modern and responsive web user interfaces',
    ],
  },

  certificates: {
    show: true,
    label: 'certificates',
    content: [
      'Oracle MySQL certified professional',
      'CareerFoundry Full-Stack Web Development Certification',
      'Microsoft Azure fundamentals',
      'Amazon Web Services (AWS)',
      'C programming certificate',
      'CIW Web Development Professional',
    ],
  },

  languages: {
    show: true,
    label: 'languages',
    list: [
      { lang: 'English', level: 'Native' },
      { lang: 'Mandarin', level: 'Advanced' },
    ],
  },

  experience: {
    show: true,
    label: 'work experience',
    list: [
      {
        id: 1,
        title: 'SENIOR STAFF SOFTWARE ENGINEER',
        company: 'Signal Hound',
        country: 'Battle Ground, WA',
        dates: {
          start: new Date('January 2023'),
          end: new Date(),
          current: true,
        },
        content: {
          tag: 'ul',
          content: [
            'Builds compelling features using modern tools and technologies emphasizing on increasing user experiences by 30% annually.',
            'Oversees product lifecycle alongside a cross-functional team to understand and solve problems.',
            'Created highly scalable, robust and maintainable services, and APIs by using tests and behavior data.',
          ],
        },
      },
      {
        id: 2,
        title: 'STAFF SOFTWARE ENGINEER',
        company: 'Digital Control, Inc.',
        country: 'Kent, WA',
        dates: {
          start: new Date('January 2019'),
          end: new Date('December 2022'),
          current: false,
        },
        content: {
          tag: 'ul',
          content: [
            'Collaborated with product, data science, policy and UXR teams to develop strategies for machine learning (ML) products.',
            'Designed and created 100% functional ML systems for retrieval, ranking and personalization using MLOps stacks like TFX.',
            'Determined system performance standards.',
          ],
        },
      },
      {
        id: 3,
        title: 'MID-LEVEL SOFTWARE ENGINEER',
        company: 'JPMorgan Chase & Co',
        country: 'Seattle, WA',
        dates: {
          start: new Date('January 2015'),
          end: new Date('December 2018'),
          current: false,
        },
        content: {
          tag: 'ul',
          content: [
            'Managed program design, coding, testing, debugging and daily documentation.',
            'Provided recommendations and utilized programming languages based on performance requirements, supportability, integration with existing components and maintainability.',
            'Created software verification test plans to design reviews.',
          ],
        },
      },
    ],
  },

  education: {
    show: true,
    label: 'education',
    list: [
      {
        id: 1,
        title: 'BACHELOR OF SCIENCE: SOFTWARE ENGINEER',
        location: 'Washington State University\nPullman, WA',
        dates: {
          start: new Date('feb 2014'),
          end: new Date('jan 2018'),
          current: false,
        },
      },
    ],
  },

  awards: {
    label: 'awards',
    contentHTML: [
      'SIGBED/SIGSOFT Frank Anger Award 2023',
      '2022 IEEE CS TCSE Distinguished Service Award',
      'ACM Software System Award 2021',
    ],
  },

  affiliations: {
    label: 'MEMBERSHIPS AND AFFILIATIONS',
    contentHTML: [
      'IACSIT Software Engineering Society (SES)',
      'Association for Computing Machinery',
      'International Association of Engineers (IAENG)',
    ],
  },

  leftColumnSections: [] as LeftColumnSectionItem[],
  customSections: [] as CustomSectionItem[],
  additionalSections: {},
}

export const resumeTemplate3: ResumeData = {
  id: '2',
  themeColor: '',
  profileImage: '/images/img.png',
  name: 'ROHAN',
  lastName: 'KAPOOR',
  jobTitle: 'Accountant',

  profile: {
    show: true,
    label: 'profile',
    aboutMe: `Skilled and experienced accountant with a proven track record of success in the financial services industry. Expertise in all aspects of accounting, including financial statement preparation, auditing, and taxation. Strong analytical and problem-solving skills.`,
  },

  contact: {
    label: 'contact',
    list: [
      { icon: 'phone', phone: '+91 9876543210' },
      { icon: 'email_outline', email: 'rohan.kapoor@gmail.com' },
      { icon: 'linkedin', link: 'linkedin/in/rohan-kapoor' },
      { icon: 'location_pin', address: 'Delhi, India' },
    ],
  },

  experience: {
    show: true,
    label: 'work experience',
    list: [
      {
        id: 1,
        title: 'Accountant',
        company: 'ABC Company',
        country: 'Bangalore',
        dates: {
          start: new Date('Jan 2022'),
          end: new Date('Dec 2023'),
          current: false,
        },
        content: {
          tag: 'p',
          content: [
            'Provided accurate financial analysis and reporting for informed decision-making.',
            'Managed full-cycle accounting processes, including accounts payable/receivable, general ledger entries, and bank reconciliations.',
          ],
        },
      },
      {
        id: 2,
        title: 'Junior Accountant',
        company: 'XYZ Company',
        country: 'Delhi',
        dates: {
          start: new Date('Jan 2020'),
          end: new Date('Dec 2021'),
          current: false,
        },
        content: {
          tag: 'p',
          content: [
            'Collaborated with colleagues to improve documentation and streamline month-end procedures, resulting in enhanced efficiency and accuracy.',
          ],
        },
      },
    ],
  },
  education: {
    show: true,
    label: 'education',
    list: [
      {
        id: 1,
        title: 'Masters in Accounting',
        dates: {
          start: new Date('Jan 2018'),
          end: new Date('Dec 2019'),
          current: false,
        },
        location: 'University of Delhi – Delhi',
      },
      {
        id: 2,
        title: 'Bachelor in BBA',
        dates: {
          start: new Date('Jan 2014'),
          end: new Date('Dec 2017'),
          current: false,
        },
        location: 'Amity University – Noida',
      },
    ],
  },
  customSections: [],

  skills: {
    show: true,
    label: 'Technical skills',
    content: [
      'Accounting Principles',
      'Financial Statement Prep',
      'Auditing',
      'Tax Compliance',
      'Data Analysis',
      'Microsoft Excel',
      'SAP',
      'Analytical Thinking',
      'Problem-Solving',
      'Communication',
    ],
  },

  additionalSections: {
    softSkills: {
      label: 'Soft skills',
      content: ['Analytical Thinking', 'Problem-Solving', 'Communication'],
    },
  },

  languages: {
    show: true,
    label: 'languages',
    list: [
      { lang: 'English', level: 'Advanced' },
      { lang: 'Hindi', level: 'Proficient' },
      { lang: 'Spanish', level: 'Intermediate' },
    ],
  },

  hobbies: {
    show: true,
    label: 'hobbies',
    content: ['Football', 'Volunteer Projects', 'Video Games'],
  },

  leftColumnSections: [],
}

export const customTemplate: ResumeData = {
  id: 'custom-template',
  themeColor: '#DB2777',
  profileImage: '/images/img.png',
  name: 'Name',
  lastName: 'Last Name',
  jobTitle: 'Senior Data Analyst',
  layout: 'oneColumn',

  contact: {
    label: 'contact',
    list: [
      {
        email: 'hello@reallygreatsite.com',
      },
      {
        address: '123 Anywhere St., Any City',
      },
      {
        phone: '+123-456-7890',
      },
    ],
  },
  languages: {
    show: true,
    label: 'languages',
    list: [
      { lang: 'English', level: 'Advanced' },
      { lang: 'Hindi', level: 'Proficient' },
      { lang: 'Spanish', level: 'Intermediate' },
    ],
  },
  profile: {
    show: true,
    label: 'summary',
    aboutMe: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie orci ac nulla dapibus, eget suscipit felis porta. Suspendisse fringilla et libero nec commodo. In hac habitasse platea dictumst. Ut dictum faucibus urna id varius. Fusce ac felis ut diam elementum bibendum ac eu arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
  },
  experience: {
    show: true,
    label: 'experience',
    list: [
      {
        id: 1,
        title: 'Senior Data Analyst',
        dates: {
          start: new Date('Jan 2018'),
          end: new Date(),
          current: true,
        },
        company: 'INGOUDE COMPANY',
        country: 'ANY CITY',
        content: {
          tag: 'ul',
          content: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Praesent molestie orci ac nulla dapibus, eget suscipit felis porta.',
            'Suspendisse fringilla et libero nec commodo. In hac habitasse platea dictumst.',
          ],
        },
      },
      {
        id: 2,
        title: 'Junior Data Analyst',
        dates: {
          start: new Date('Jan 2016'),
          end: new Date('Jan 2018'),
          current: false,
        },
        company: 'THYNK UNLIMITED',
        country: 'ANY CITY',
        content: {
          tag: 'ul',
          content: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Praesent molestie orci ac nulla dapibus, eget suscipit felis porta.',
            'Suspendisse fringilla et libero nec commodo. In hac habitasse platea dictumst.',
          ],
        },
      },
    ],
  },
  education: {
    show: true,
    label: 'education',
    list: [
      {
        id: 1,
        title: 'Bachelor of Statistics',
        dates: {
          start: new Date('Jan 2013'),
          end: new Date('Dec 2015'),
          current: false,
        },
        location: 'ARROWAI UNIVERSITY',
      },
    ],
  },
  certificates: {
    show: true,
    label: 'certification',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Praesent molestie orci ac nulla dapibus, eget suscipit felis porta.',
      'Suspendisse fringilla et libero nec commodo. In hac habitasse platea dictumst.',
    ],
  },

  skills: {
    show: true,
    label: 'skills',
    content: [
      'Operating Software',
      'Good communication skill',
      'Structured Query Language (SQL)',
      'Able to work in a team',
      'Statistics',
      'Great problem solving skill',
    ],
  },

  customSections: [
    {
      id: 1,
      title: 'Achievements',
      description: '',
      dates: {
        start: new Date('Jan 2013'),
        end: new Date(),
        current: false,
      },
      contentHTML: [
        '<strong>Best Employee Award (2022):</strong> Awarded by ABC Company for exceptional performance.',
        '<strong>Implemented New Accounting System (2021):</strong> Led to a 30% increase in efficiency.',
      ],
    },
  ],
  leftColumnSections: [
    {
      id: 1,
      title: 'hobbies',
      description: '',
      contentHTML: ['Football', 'Volunteer Projects', 'Video Games'],
    },
  ],
}
