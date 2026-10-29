import {
  UserProfile,
  Course,
  Skill,
  Lesson,
  Question,
  Assessment,
  Assignment,
  Project,
  Rubric,
  Submission,
  Certificate,
  JobListing,
  InterviewQuestion,
  RefundRequest,
  AuditLog,
  AppNotification,
  IntegrationStatus,
  ResumeData
} from './types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'user-student-1',
    email: 'student@prepkaro.com',
    fullName: 'Sneha Sharma',
    username: 'snehasharma',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Aspiring Full Stack & AI Engineer. Passionate about Next.js, TypeScript, and modern web architectures.',
    phone: '+91 98765 43210',
    professionalSummary: 'Computer Science graduate preparing for high-impact software engineering roles. Built 4 production projects with 95%+ assessment scores.',
    skillsInterests: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'AI Engineering'],
    linkedinUrl: 'https://linkedin.com/in/snehasharma',
    githubUrl: 'https://github.com/snehasharma',
    portfolioUrl: 'https://snehasharma.dev',
    notifyEmail: true,
    role: 'student',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'user-reviewer-1',
    email: 'reviewer@prepkaro.com',
    fullName: 'Dr. Rajesh Verma',
    username: 'rajeshverma',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Technical Lead & Evaluation Specialist with 12+ years of distributed systems and web experience.',
    phone: '+91 91234 56789',
    professionalSummary: 'Former Staff Engineer at Flipkart. Evaluator for PrepKaro engineering tracks.',
    skillsInterests: ['System Design', 'Code Quality', 'Clean Architecture', 'Review Rubrics'],
    linkedinUrl: 'https://linkedin.com/in/rajeshverma',
    githubUrl: 'https://github.com/rajeshverma',
    notifyEmail: true,
    role: 'reviewer',
    createdAt: '2026-01-05T08:30:00Z',
  },
  {
    id: 'user-admin-1',
    email: 'admin@prepkaro.com',
    fullName: 'Priya Mehta',
    username: 'priyamehta',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Director of Academic Operations & Curriculum Strategy at PrepKaro.',
    phone: '+91 99887 76655',
    professionalSummary: 'Leading edtech operations, curriculum standards, and enterprise hiring partner relations across India.',
    skillsInterests: ['LMS Operations', 'Curriculum Design', 'Quality Assurance', 'Career Placement'],
    linkedinUrl: 'https://linkedin.com/in/priyamehta',
    notifyEmail: true,
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'full-stack-nextjs-ai',
    title: 'Full Stack Next.js & AI Web Engineering',
    description: 'Master modern full-stack engineering with TypeScript, React 19, Next.js App Router, Server Actions, Supabase, and real-world LLM Agent integrations.',
    category: 'Web Development',
    level: 'Intermediate',
    estHours: 64,
    coverImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    instructorName: 'Aman Singhania',
    instructorRole: 'Ex-Google Staff Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'published',
    completionNote: 'Satisfies all requirements for Senior Junior/Mid Full Stack Engineer placement tracks.',
    price: 0,
    currency: 'INR',
    prerequisites: ['Basic JavaScript (ES6+)', 'HTML & CSS Fundamentals', 'Git version control basics'],
    learningOutcomes: [
      'Architect full-stack applications with React 19 Server Components and Next.js',
      'Design relational schemas, migrations, and Row Level Security with Supabase & PostgreSQL',
      'Integrate AI tool calling, streaming responses, and autonomous agent loops',
      'Deploy production-ready apps with automated CI/CD and zero downtime',
    ],
    createdAt: '2026-01-10T12:00:00Z',
    updatedAt: '2026-02-01T15:30:00Z',
  },
  {
    id: 'course-2',
    slug: 'genai-llm-systems',
    title: 'Generative AI & LLM Systems Architect',
    description: 'Build enterprise-grade Retrieval-Augmented Generation (RAG), multimodal AI pipelines, vector database embeddings, and autonomous multi-agent networks.',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    estHours: 48,
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    instructorName: 'Dr. Ananya Roy',
    instructorRole: 'AI Research Lead, PrepKaro Labs',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'published',
    completionNote: 'Capstone evaluated by industry AI practitioners for senior engineer eligibility.',
    price: 0,
    currency: 'INR',
    prerequisites: ['Python or TypeScript proficiency', 'Basic API & database understanding'],
    learningOutcomes: [
      'Implement production RAG pipelines with semantic search and re-ranking',
      'Design autonomous multi-agent workflows with LangGraph and tool calling',
      'Evaluate model hallucinations, latency metrics, and guardrail protections',
      'Fine-tune small open-weight LLMs for specialized domain tasks',
    ],
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-02-05T12:00:00Z',
  },
  {
    id: 'course-3',
    slug: 'data-science-ml-bootcamp',
    title: 'Data Science & Machine Learning Career Bootcamp',
    description: 'Transform raw data into predictive intelligence. Master Pandas, NumPy, Scikit-learn, exploratory data analysis, feature engineering, and MLOps deployment.',
    category: 'Data Science',
    level: 'Beginner',
    estHours: 72,
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    instructorName: 'Vikram Patel',
    instructorRole: 'Principal Data Scientist',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'published',
    completionNote: 'Includes 5 real-world industry datasets (Finance, Healthcare, E-Commerce).',
    price: 0,
    currency: 'INR',
    prerequisites: ['High school mathematics', 'Curiosity about data & problem solving'],
    learningOutcomes: [
      'Perform rigorous statistical analysis and exploratory data visualization',
      'Train supervised regression and classification models with Scikit-learn',
      'Engineer predictive features and evaluate model ROC/AUC metrics',
      'Deploy machine learning models as production REST APIs with FastAPI',
    ],
    createdAt: '2026-01-15T14:00:00Z',
    updatedAt: '2026-02-10T09:00:00Z',
  },
];

export const INITIAL_SKILLS: Skill[] = [
  // Course 1 Skills
  {
    id: 'skill-1-1',
    courseId: 'course-1',
    title: 'Modern React 19 & TypeScript Core',
    description: 'Deep dive into React 19 hooks, compiler optimizations, strict TypeScript typing, and performant component architecture.',
    position: 0,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: true,
    passScore: 70,
    status: 'published',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'skill-1-2',
    courseId: 'course-1',
    title: 'Next.js Server Actions & Database Architecture',
    description: 'Server Components vs Client Components, form actions, optimistic UI mutations, and PostgreSQL relational schemas with Supabase.',
    position: 1,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: true,
    passScore: 75,
    status: 'published',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'skill-1-3',
    courseId: 'course-1',
    title: 'AI Tool Calling & Real-Time Streaming',
    description: 'Integrating LLM APIs, function calling, tool use, JSON structured outputs, and streaming responses to the frontend.',
    position: 2,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: true,
    passScore: 80,
    status: 'published',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'skill-1-4',
    courseId: 'course-1',
    title: 'Production Deployment & Cloud DevOps',
    description: 'Dockerization, CI/CD pipeline automation, edge caching, error monitoring, and security hardening.',
    position: 3,
    requiresPracticeTest: true,
    requiresAssignment: false,
    requiresProject: true,
    passScore: 75,
    status: 'published',
    createdAt: '2026-01-10T12:00:00Z',
  },

  // Course 2 Skills
  {
    id: 'skill-2-1',
    courseId: 'course-2',
    title: 'Prompt Engineering & Embedding Foundations',
    description: 'Zero-shot, few-shot prompting, chain-of-thought, text embedding models, and similarity distance metrics.',
    position: 0,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: false,
    passScore: 70,
    status: 'published',
    createdAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'skill-2-2',
    courseId: 'course-2',
    title: 'Vector Databases & Production RAG Pipelines',
    description: 'Chunking strategies, Pinecone/pgvector indexing, semantic search, hybrid search, and context re-ranking.',
    position: 1,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: true,
    passScore: 75,
    status: 'published',
    createdAt: '2026-01-12T10:00:00Z',
  },

  // Course 3 Skills
  {
    id: 'skill-3-1',
    courseId: 'course-3',
    title: 'Python for Data Analysis & Statistical Modeling',
    description: 'Pandas dataframes, data cleaning, missing value imputation, statistical summaries, and exploratory visualization with Seaborn.',
    position: 0,
    requiresPracticeTest: true,
    requiresAssignment: true,
    requiresProject: true,
    passScore: 70,
    status: 'published',
    createdAt: '2026-01-15T14:00:00Z',
  },
];

export const INITIAL_LESSONS: Lesson[] = [
  // Skill 1-1 Lessons
  {
    id: 'lesson-1-1-1',
    skillId: 'skill-1-1',
    title: 'React 19 Mental Model: Server vs Client Boundaries',
    position: 0,
    contentType: 'text',
    durationMins: 15,
    isFreePreview: true,
    content: `
# React 19 Mental Model & Component Boundaries

Welcome to PrepKaro's Full Stack Engineering curriculum. In React 19, components are **Server Components by default** in modern frameworks like Next.js.

### Key Conceptual Differences
1. **Server Components**:
   - Execute exclusively on the server at request time or build time.
   - Zero bundle size added to client JavaScript.
   - Can directly read environment variables, connect to databases, and query private microservices.
   - Cannot use browser state hooks (\`useState\`, \`useEffect\`) or DOM event handlers (\`onClick\`).

2. **Client Components** (\`'use client'\` directive):
   - Hydrated in the browser to provide interactivity, state, and browser API bindings.
   - Should be kept as small leaf nodes in your component tree.

\`\`\`tsx
// Example of a clean boundary:
// Server Component fetching data directly
export default async function ProfilePage() {
  const user = await db.users.findFirst();
  return (
    <div className="p-6">
      <h1>Hello, {user.name}</h1>
      {/* Interactive client component child */}
      <FollowButton userId={user.id} />
    </div>
  );
}
\`\`\`

### Rule of Thumb
Pass data down from Server Components as serializable props to Client Components, rather than fetching on the client side with unnecessary loading spinners!
`,
    resources: [
      { id: 'res-1', lessonId: 'lesson-1-1-1', title: 'React 19 Official Architecture Cheat Sheet', url: 'https://react.dev', kind: 'link' },
      { id: 'res-2', lessonId: 'lesson-1-1-1', title: 'Component Boundary Diagram (PDF)', url: '/docs/react-19-boundaries.pdf', kind: 'pdf' },
    ],
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'lesson-1-1-2',
    skillId: 'skill-1-1',
    title: 'Advanced TypeScript Generics & Type Narrowing',
    position: 1,
    contentType: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder instructional embed
    durationMins: 22,
    isFreePreview: false,
    content: `
# Advanced TypeScript Patterns for Production

In this lesson, we explore type safety patterns essential for large-scale enterprise codebases:

### 1. Discriminated Unions for Clean State Handling
\`\`\`typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
\`\`\`

### 2. Generics with Constraints
Ensure your reusable components accept strictly typed properties without sacrificing safety:
\`\`\`typescript
interface Identifiable {
  id: string;
}

function findEntityById<T extends Identifiable>(items: T[], targetId: string): T | undefined {
  return items.find(item => item.id === targetId);
}
\`\`\`
`,
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'lesson-1-1-3',
    skillId: 'skill-1-1',
    title: 'Hooks in Practice: useActionState & useOptimistic',
    position: 2,
    contentType: 'text',
    durationMins: 18,
    isFreePreview: false,
    content: `
# Modern Form Mutations in React 19

Say goodbye to manual \`isSubmitting\` state management and messy \`useEffect\` form handlers.

### \`useActionState\`
Integrates natively with HTML \`<form action={formAction}>\` and updates pending state automatically:

\`\`\`tsx
const [state, formAction, isPending] = useActionState(updateProfileServerAction, initialState);
\`\`\`

### \`useOptimistic\`
Provides instant zero-latency feedback to users while the server transaction processes in the background!
`,
    createdAt: '2026-01-10T12:00:00Z',
  },

  // Skill 1-2 Lessons
  {
    id: 'lesson-1-2-1',
    skillId: 'skill-1-2',
    title: 'Next.js App Router Architecture & Routing Cache',
    position: 0,
    contentType: 'text',
    durationMins: 20,
    isFreePreview: false,
    content: `
# App Router Cache Hierarchy
Understand the 4 caching layers in Next.js:
1. **Request Memoization** (per request React fetch deduplication)
2. **Data Cache** (persistent across requests)
3. **Full Route Cache** (HTML & RSC payload on server)
4. **Router Cache** (client-side in-memory session cache)
`,
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'lesson-1-2-2',
    skillId: 'skill-1-2',
    title: 'PostgreSQL Relational Design & Row Level Security (RLS)',
    position: 1,
    contentType: 'text',
    durationMins: 25,
    isFreePreview: false,
    content: `
# Securing Data with Row Level Security

Never trust the frontend with authorization. Write deterministic PostgreSQL policies that enforce tenant boundaries directly at the database engine level.
`,
    createdAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_RUBRICS: Rubric[] = [
  {
    id: 'rubric-1',
    title: 'Full Stack Web App Evaluation Rubric',
    criteria: [
      { id: 'crit-1', name: 'Architecture & Component Design', description: 'Clean separation of concerns, proper server/client component boundaries, modular file structure.', maxPoints: 25, weight: 25 },
      { id: 'crit-2', name: 'Type Safety & Code Quality', description: 'Strict TypeScript without \`any\`, well-named functions, consistent error handling.', maxPoints: 25, weight: 25 },
      { id: 'crit-3', name: 'Functional Requirements & UX', description: 'All prompt requirements met, smooth loading states, accessible forms, mobile responsiveness.', maxPoints: 30, weight: 30 },
      { id: 'crit-4', name: 'Testing & Verification', description: 'Unit or integration tests present, test cases cover edge cases and error states.', maxPoints: 20, weight: 20 },
    ],
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'rubric-2',
    title: 'AI Engineering & Agent Pipeline Rubric',
    criteria: [
      { id: 'crit-2-1', name: 'Prompt & Schema Robustness', description: 'Deterministic structured output schema validation, prompt injection mitigations.', maxPoints: 35, weight: 35 },
      { id: 'crit-2-2', name: 'Tool Execution & Error Handling', description: 'Safe tool calling, timeout handling, error retries.', maxPoints: 35, weight: 35 },
      { id: 'crit-2-3', name: 'User Experience & Streaming', description: 'Low latency, progressive streaming UI, clear feedback on tool invocations.', maxPoints: 30, weight: 30 },
    ],
    createdAt: '2026-01-05T10:00:00Z',
  },
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    skillId: 'skill-1-1',
    type: 'mcq',
    prompt: 'In React 19, what happens when a Server Component renders a Client Component marked with "use client"?',
    options: [
      { id: 'opt-1', text: 'The Server Component re-executes inside the browser during hydration.' },
      { id: 'opt-2', text: 'The Server Component passes serializable props across the boundary, and only the Client Component hydrates on the client.' },
      { id: 'opt-3', text: 'An error is thrown because Server Components cannot import Client Components.' },
      { id: 'opt-4', text: 'The entire application bundle is converted to a Single Page Application.' },
    ],
    correctAnswers: ['opt-2'],
    explanation: 'Server Components execute on the server and pass serialized props across the network boundary to Client Components, which hydrate in the browser.',
    difficulty: 'medium',
    points: 10,
    status: 'active',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'q-2',
    skillId: 'skill-1-1',
    type: 'mcq',
    prompt: 'Which TypeScript utility type constructs a type with all properties of Type set to optional?',
    options: [
      { id: 'opt-2-1', text: 'Readonly<T>' },
      { id: 'opt-2-2', text: 'Partial<T>' },
      { id: 'opt-2-3', text: 'Required<T>' },
      { id: 'opt-2-4', text: 'Pick<T, K>' },
    ],
    correctAnswers: ['opt-2-2'],
    explanation: 'Partial<T> marks all properties of type T as optional by applying the ? modifier.',
    difficulty: 'easy',
    points: 10,
    status: 'active',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'q-3',
    skillId: 'skill-1-1',
    type: 'multi_select',
    prompt: 'Which of the following are valid benefits of React Server Components (RSC)? (Select all that apply)',
    options: [
      { id: 'opt-3-1', text: 'Zero client bundle size for server dependencies and libraries' },
      { id: 'opt-3-2', text: 'Direct access to server-side backend resources like databases and file systems' },
      { id: 'opt-3-3', text: 'Ability to attach browser onClick listeners directly on the server' },
      { id: 'opt-3-4', text: 'Automatic code splitting and progressive streaming with React Suspense' },
    ],
    correctAnswers: ['opt-3-1', 'opt-3-2', 'opt-3-4'],
    explanation: 'Server components reduce client bundle size, access server resources directly, and support streaming with Suspense. However, they cannot bind browser event handlers like onClick.',
    difficulty: 'hard',
    points: 15,
    status: 'active',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'q-4',
    skillId: 'skill-1-1',
    type: 'true_false',
    prompt: 'True or False: In React 19, useActionState replaces the need for custom useState management when handling HTML form submission pending states.',
    options: [
      { id: 'opt-4-1', text: 'True' },
      { id: 'opt-4-2', text: 'False' },
    ],
    correctAnswers: ['opt-4-1'],
    explanation: 'True. useActionState tracks the returned state, the formAction trigger, and the isPending boolean automatically.',
    difficulty: 'easy',
    points: 10,
    status: 'active',
    createdAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'assess-1-1',
    courseId: 'course-1',
    skillId: 'skill-1-1',
    title: 'Skill Assessment: React 19 & TypeScript Mastery',
    description: 'Verify your understanding of modern React architecture, server-client boundaries, TypeScript generics, and modern form hooks.',
    kind: 'practice_test',
    timeLimitMins: 20,
    maxAttempts: 3,
    passScore: 70,
    randomizeQuestions: true,
    randomizeOptions: true,
    status: 'published',
    questionIds: ['q-1', 'q-2', 'q-3', 'q-4'],
    createdAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1-1',
    skillId: 'skill-1-1',
    title: 'Assignment 1: Reusable Type-Safe Component Library',
    instructions: `
### Assignment Requirements
1. Build a set of 3 reusable, highly-typed React components:
   - \`DataTable<T>\`: accepts generic data items, column definitions, and sort handler.
   - \`AsyncButton\`: handles loading, success, and error states with accessibility labels.
   - \`ModalDialog\`: supports keyboard escape navigation and focus trap.
2. Provide full TypeScript interface definitions without any \`any\` types.
3. Submit your GitHub repository link and a short walkthrough explaining your design choices.
`,
    deadline: '2026-11-15T23:59:59Z',
    allowedTypes: 'github,zip,pdf',
    maxFileMb: 15,
    required: true,
    rubricId: 'rubric-1',
    createdAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1-1',
    skillId: 'skill-1-1',
    title: 'Case Study Project: Real-Time Collaborative Workspace',
    brief: 'Build a production-grade workspace application featuring live collaborative notes, optimistic UI updates, and strict role-based access permissions.',
    objectives: 'Demonstrate end-to-end mastery of React 19 client/server component boundaries, TypeScript type narrowing, and resilient UX states.',
    deliverables: '1. Working public demo URL (e.g. Vercel/Cloudflare)\n2. Clean GitHub repository with README and setup guide\n3. Comprehensive test suite demonstrating component behavior\n4. Architectural design document',
    deadline: '2026-11-30T23:59:59Z',
    rubricId: 'rubric-1',
    createdAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    kind: 'assignment',
    targetId: 'assign-1-1',
    targetTitle: 'Assignment 1: Reusable Type-Safe Component Library',
    courseId: 'course-1',
    skillId: 'skill-1-1',
    userId: 'user-student-1',
    userName: 'Sneha Sharma',
    userEmail: 'student@prepkaro.com',
    status: 'approved',
    textResponse: 'Completed all 3 generic components with full TypeScript 5.8 inference and Vitest unit tests. Added accessibility keyboard navigation according to WAI-ARIA standards.',
    repoUrl: 'https://github.com/snehasharma/prepkaro-typed-components',
    demoUrl: 'https://typed-components-demo.vercel.app',
    fileName: 'components-walkthrough.pdf',
    fileSize: '1.8 MB',
    attempt: 1,
    submittedAt: '2026-02-01T14:30:00Z',
    reviewerId: 'user-reviewer-1',
    reviewerName: 'Dr. Rajesh Verma',
    reviewedAt: '2026-02-02T10:15:00Z',
    score: 94,
    feedback: 'Exceptional work, Sneha! The generics on DataTable are properly constrained, and the discriminated union pattern for async button states is textbook quality. Approved!',
    rubricScores: {
      'crit-1': 24,
      'crit-2': 25,
      'crit-3': 28,
      'crit-4': 17,
    },
    plagiarismScore: 3,
    plagiarismStatus: 'clear',
    isPublishedInPortfolio: true,
    createdAt: '2026-02-01T14:30:00Z',
    updatedAt: '2026-02-02T10:15:00Z',
  },
  {
    id: 'sub-2',
    kind: 'project',
    targetId: 'proj-1-1',
    targetTitle: 'Case Study Project: Real-Time Collaborative Workspace',
    courseId: 'course-1',
    skillId: 'skill-1-1',
    userId: 'user-student-1',
    userName: 'Sneha Sharma',
    userEmail: 'student@prepkaro.com',
    status: 'approved',
    textResponse: 'Deployed full-stack collaborative workspace on Cloudflare Pages. Features optimistic conflict resolution and WCAG AA accessible modal dialogs.',
    repoUrl: 'https://github.com/snehasharma/collaborative-workspace',
    demoUrl: 'https://collab-workspace-live.dev',
    fileName: 'architecture-diagram.pdf',
    fileSize: '3.4 MB',
    attempt: 1,
    submittedAt: '2026-02-04T18:00:00Z',
    reviewerId: 'user-reviewer-1',
    reviewerName: 'Dr. Rajesh Verma',
    reviewedAt: '2026-02-05T11:20:00Z',
    score: 92,
    feedback: 'High caliber implementation. The optimistic UI mutations handle offline reconnects smoothly. Skill 1 requirements fully satisfied!',
    rubricScores: {
      'crit-1': 23,
      'crit-2': 24,
      'crit-3': 28,
      'crit-4': 17,
    },
    plagiarismScore: 5,
    plagiarismStatus: 'clear',
    isPublishedInPortfolio: true,
    createdAt: '2026-02-04T18:00:00Z',
    updatedAt: '2026-02-05T11:20:00Z',
  },
  {
    id: 'sub-3',
    kind: 'assignment',
    targetId: 'assign-1-1',
    targetTitle: 'Assignment 1: Reusable Type-Safe Component Library',
    courseId: 'course-1',
    skillId: 'skill-1-1',
    userId: 'user-student-2',
    userName: 'Aditya Kulkarni',
    userEmail: 'aditya.k@gmail.com',
    status: 'under_review',
    textResponse: 'Implemented DataTable with sorting and pagination, plus Accessible Modal. Please review the generics implementation in src/components/table.tsx.',
    repoUrl: 'https://github.com/adityak/component-lib',
    demoUrl: 'https://aditya-components.vercel.app',
    fileName: 'submission-notes.docx',
    fileSize: '820 KB',
    attempt: 1,
    submittedAt: '2026-02-12T09:40:00Z',
    reviewerId: 'user-reviewer-1',
    reviewerName: 'Dr. Rajesh Verma',
    plagiarismScore: 8,
    plagiarismStatus: 'clear',
    createdAt: '2026-02-12T09:40:00Z',
    updatedAt: '2026-02-12T09:40:00Z',
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    code: 'PK-2026-9F82A1',
    userId: 'user-student-1',
    recipientName: 'Sneha Sharma',
    courseId: 'course-1',
    courseTitle: 'Full Stack Next.js & AI Web Engineering',
    issuedAt: '2026-02-06T12:00:00Z',
    status: 'valid',
    finalGrade: 93,
    completedSkillsCount: 4,
    verificationUrl: '/verify/PK-2026-9F82A1',
    instructorName: 'Aman Singhania',
  },
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Full Stack Engineer (React / Next.js)',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: '1-2 years',
    salaryRange: '₹14,00,000 - ₹20,00,000 / year',
    description: 'Join the merchant dashboard experience team at Razorpay. Build high-reliability financial interfaces used by millions of Indian businesses every day.',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    responsibilities: [
      'Architect resilient frontend web applications with Next.js and TypeScript',
      'Collaborate with product and UX designers to craft high-conversion merchant flows',
      'Optimize core web vitals and client-side performance under high concurrent loads',
    ],
    qualifications: [
      'B.Tech / B.E. or equivalent practical experience',
      'Strong understanding of modern React state management and asynchronous APIs',
      'Experience with relational databases and secure RESTful/GraphQL APIs',
    ],
    deadline: '2026-11-30',
    status: 'active',
    postedAt: '2026-02-01T10:00:00Z',
    applicationsCount: 42,
  },
  {
    id: 'job-2',
    title: 'Associate AI Engineer (RAG & Agent Systems)',
    company: 'Swiggy',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru / Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Fresher',
    salaryRange: '₹16,00,000 - ₹24,00,000 / year',
    description: 'Work with the Swiggy AI Core team building conversational food discovery, customer support agent loops, and multimodal semantic search engines.',
    requiredSkills: ['AI Engineering', 'Python', 'TypeScript', 'Vector DBs', 'RAG'],
    responsibilities: [
      'Build and benchmark semantic retrieval and vector embeddings using pgvector and Pinecone',
      'Design structured tool calling workflows for multi-step agent actions',
      'Monitor and eliminate hallucinations through automated evaluation frameworks',
    ],
    qualifications: [
      'Demonstrated project portfolio in Generative AI or LLM tooling',
      'Solid foundations in data structures and algorithmic complexity',
    ],
    deadline: '2026-11-25',
    status: 'active',
    postedAt: '2026-02-03T11:30:00Z',
    applicationsCount: 78,
  },
  {
    id: 'job-3',
    title: 'Frontend Developer (UI/UX Systems)',
    company: 'Flipkart',
    companyLogo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka',
    workMode: 'On-site',
    employmentType: 'Full-time',
    experienceLevel: '1-2 years',
    salaryRange: '₹12,00,000 - ₹18,00,000 / year',
    description: 'Help build the next generation e-commerce browsing and checkout experiences for 500M+ Indian consumers.',
    requiredSkills: ['React', 'TypeScript', 'CSS/Tailwind', 'Performance Optimization'],
    responsibilities: [
      'Implement pixel-perfect, accessible UI components adhering to design system tokens',
      'Reduce page load times and ensure 60fps animations across low-end mobile devices',
    ],
    qualifications: [
      'Strong grasp of CSS Grid, Flexbox, responsive design, and DOM lifecycle',
    ],
    deadline: '2026-12-05',
    status: 'active',
    postedAt: '2026-02-05T09:00:00Z',
    applicationsCount: 31,
  },
  {
    id: 'job-4',
    title: 'Data Analyst & BI Specialist',
    company: 'Tata Consultancy Services (TCS)',
    companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    location: 'Mumbai / Pune / Hyderabad',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Fresher',
    salaryRange: '₹7,50,000 - ₹11,00,000 / year',
    description: 'Transform enterprise transaction logs into strategic executive dashboards and predictive intelligence.',
    requiredSkills: ['SQL', 'Python', 'Data Analysis', 'Tableau/PowerBI', 'Statistics'],
    responsibilities: [
      'Write complex SQL queries for multi-table cohort analysis and metrics aggregation',
      'Design clean executive dashboards that drive operational efficiency',
    ],
    qualifications: [
      'Degree in Computer Science, Statistics, Mathematics, or related fields',
    ],
    deadline: '2026-12-15',
    status: 'active',
    postedAt: '2026-02-08T14:00:00Z',
    applicationsCount: 110,
  },
];

export const INITIAL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    category: 'Frontend',
    company: 'Google',
    title: 'Explain the Virtual DOM reconciliation algorithm and how React 19 Fiber works.',
    question: 'How does React determine what changed in a component tree, and why did React migrate from the stack reconciler to the Fiber architecture?',
    difficulty: 'Hard',
    modelAnswer: 'React Fiber is a complete rewrite of the reconciliation algorithm that replaces synchronous stack-based recursion with an incremental, priority-based cooperative scheduling loop. Each Fiber node is a unit of work with child, sibling, and return pointers. This allows React to pause rendering during heavy computational tasks, prioritize user interactions (like typing), and resume work without blocking the main browser thread.',
    tips: [
      'Mention time-slicing and requestIdleCallback principles.',
      'Explain the difference between the render/reconciliation phase (interruptible) and the commit phase (synchronous DOM mutations).',
    ],
    relatedSkill: 'Modern React 19 & TypeScript Core',
  },
  {
    id: 'iq-2',
    category: 'System Design',
    company: 'Amazon',
    title: 'Design a High-Throughput Notification Service (Email, SMS, In-App).',
    question: 'How would you architect a distributed notification dispatch system that handles 100 million alerts per day with priority tiers and idempotency?',
    difficulty: 'Hard',
    modelAnswer: 'The architecture uses an API Gateway that pushes message payloads into partitioned Kafka or SQS queues categorized by priority (Critical/OTP, Transactional, Promotional). Dedicated worker pools consume messages and pass them through an Idempotency Service (backed by Redis with TTL) to prevent duplicate sends. Workers interface with provider adapters (SES, Twilio, Firebase) with rate-limiting token buckets and circuit breakers. Failed events route to a Dead Letter Queue (DLQ) for automated retry with exponential backoff.',
    tips: [
      'Highlight duplicate prevention using idempotency keys.',
      'Discuss rate limiting against third-party provider quotas.',
      'Emphasize fallback providers and dead letter queues for resilient failure handling.',
    ],
    relatedSkill: 'Production Deployment & Cloud DevOps',
  },
  {
    id: 'iq-3',
    category: 'Backend',
    company: 'TCS',
    title: 'Database Indexing: B-Tree vs Hash Indexes and Query Optimization',
    question: 'How does a B-Tree index work in PostgreSQL, and why is it preferred for range queries over Hash indexes?',
    difficulty: 'Medium',
    modelAnswer: 'A B-Tree (balanced tree) index maintains keys in sorted order across self-balancing nodes. This sorted property allows logarithmic O(log N) lookup not just for equality searches (WHERE id = 5), but crucially for range queries (WHERE age BETWEEN 20 AND 30) and sorting (ORDER BY). In contrast, Hash indexes compute an O(1) hash bucket which only supports strict equality checks and cannot perform range scans or index-assisted sorting.',
    tips: [
      'Explain EXPLAIN ANALYZE output (Seq Scan vs Index Scan).',
      'Mention composite indexes and column ordering (leftmost prefix rule).',
    ],
    relatedSkill: 'Next.js Server Actions & Database Architecture',
  },
  {
    id: 'iq-4',
    category: 'GenAI',
    company: 'Swiggy',
    title: 'Preventing Hallucinations in Production RAG Architectures',
    question: 'What strategies and evaluation metrics would you deploy to guarantee factual accuracy in an enterprise customer support LLM assistant?',
    difficulty: 'Hard',
    modelAnswer: '1. Chunking & Hybrid Search: Combine BM25 keyword search with dense vector embeddings to capture exact product codes as well as semantic meaning.\n2. Re-ranking: Pass the top 20 retrieved chunks through a cross-encoder model to retain only the top 3 most relevant passages.\n3. Grounded Prompt Engineering: Explicitly instruct the model: "Answer strictly based on the provided context. If the answer is not present, respond with \'I do not have verified information on this.\'"\n4. Guardrails & Evaluation: Run RAGAS metrics (Faithfulness, Answer Relevance, Context Precision) in a continuous CI evaluation suite before deploying prompt revisions.',
    tips: [
      'Reference RAGAS (Retrieval Augmented Generation Assessment System).',
      'Explain cross-encoders and semantic re-ranking.',
    ],
    relatedSkill: 'AI Tool Calling & Real-Time Streaming',
  },
];

export const INITIAL_RESUME: ResumeData = {
  userId: 'user-student-1',
  fullName: 'Sneha Sharma',
  email: 'sneha.sharma@prepkaro.com',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  title: 'Full Stack & AI Engineer',
  summary: 'Results-driven software engineer with proven mastery in React 19, TypeScript, Next.js, and GenAI agent systems. Certified graduate of PrepKaro engineering track with 95%+ pass rating across assessments and real-world case studies.',
  skills: [
    'React 19',
    'TypeScript',
    'Next.js App Router',
    'PostgreSQL / Supabase',
    'Tailwind CSS',
    'Python & GenAI Tools',
    'Docker & CI/CD',
    'REST & GraphQL APIs',
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Engineering Intern',
      company: 'TechFlow Solutions',
      duration: 'Jun 2025 - Dec 2025',
      description: 'Built customer analytics dashboard in Next.js and Tailwind. Optimized server action query latencies by 42% using Supabase connection pooling.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Visvesvaraya Technological University',
      year: '2022 - 2026',
    },
  ],
  projects: [
    {
      id: 'proj-res-1',
      title: 'Real-Time Collaborative Workspace',
      techStack: 'React 19, Next.js, Supabase, Tailwind CSS, TypeScript',
      description: 'Engineered a real-time collaborative workspace supporting live cursor sync, optimistic state mutations, and WAI-ARIA accessible design.',
      link: 'https://collab-workspace-live.dev',
    },
    {
      id: 'proj-res-2',
      title: 'Autonomous RAG Research Agent',
      techStack: 'Python, LangChain, Pinecone, OpenAI API',
      description: 'Developed an autonomous research synthesis agent capable of searching external documentation, scraping citations, and evaluating factual precision.',
      link: 'https://github.com/snehasharma/rag-research-agent',
    },
  ],
  socials: {
    github: 'https://github.com/snehasharma',
    linkedin: 'https://linkedin.com/in/snehasharma',
    portfolio: 'https://snehasharma.dev',
  },
};

export const INITIAL_REFUND_REQUESTS: RefundRequest[] = [
  {
    id: 'ref-1',
    userId: 'user-student-3',
    userEmail: 'karan.mehra@gmail.com',
    userName: 'Karan Mehra',
    courseId: 'course-2',
    courseTitle: 'Generative AI & LLM Systems Architect',
    amount: 4999,
    currency: 'INR',
    reason: 'Enrolled in error during duplicate purchase test. Requesting refund to original payment source.',
    reasonCategory: 'financial_need',
    status: 'approved',
    adminNotes: 'Verified enrollment within 7 days. 0 lessons completed. Approved per standard refund policy.',
    transactionRef: 'PAY_RZP_9823481239',
    eligibilityPassed: true,
    eligibilityDetails: 'Enrolled < 14 days ago. Less than 10% course progress. Zero certificates claimed.',
    createdAt: '2026-02-02T11:00:00Z',
    updatedAt: '2026-02-03T16:00:00Z',
  },
  {
    id: 'ref-2',
    userId: 'user-student-4',
    userEmail: 'rohit.gupta@yahoo.com',
    userName: 'Rohit Gupta',
    courseId: 'course-1',
    courseTitle: 'Full Stack Next.js & AI Web Engineering',
    amount: 5999,
    currency: 'INR',
    reason: 'Scheduling conflict due to college exam dates. Seeking postponement or fee return.',
    reasonCategory: 'scheduling_conflict',
    status: 'pending',
    transactionRef: 'PAY_RZP_1122334455',
    eligibilityPassed: true,
    eligibilityDetails: 'Enrolled 5 days ago. 1 lesson viewed. Meets refund review criteria.',
    createdAt: '2026-02-10T14:20:00Z',
    updatedAt: '2026-02-10T14:20:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    userId: 'user-admin-1',
    userEmail: 'admin@prepkaro.com',
    role: 'admin',
    action: 'COURSE_PUBLISHED',
    targetType: 'Course',
    targetId: 'course-1',
    details: 'Published course "Full Stack Next.js & AI Web Engineering" after curriculum review.',
    ipAddress: '103.21.244.12',
    timestamp: '2026-02-01T15:30:00Z',
  },
  {
    id: 'audit-2',
    userId: 'user-reviewer-1',
    userEmail: 'reviewer@prepkaro.com',
    role: 'reviewer',
    action: 'SUBMISSION_APPROVED',
    targetType: 'Submission',
    targetId: 'sub-2',
    details: 'Approved case study project for student Sneha Sharma with score 92/100.',
    ipAddress: '106.51.78.22',
    timestamp: '2026-02-05T11:20:00Z',
  },
  {
    id: 'audit-3',
    userId: 'user-admin-1',
    userEmail: 'admin@prepkaro.com',
    role: 'admin',
    action: 'CERTIFICATE_ISSUED',
    targetType: 'Certificate',
    targetId: 'cert-1',
    details: 'Issued Certificate PK-2026-9F82A1 to Sneha Sharma after verifying 100% completion.',
    ipAddress: '103.21.244.12',
    timestamp: '2026-02-06T12:00:00Z',
  },
  {
    id: 'audit-4',
    userId: 'user-admin-1',
    userEmail: 'admin@prepkaro.com',
    role: 'admin',
    action: 'REFUND_APPROVED',
    targetType: 'RefundRequest',
    targetId: 'ref-1',
    details: 'Approved refund request ref-1 for Karan Mehra (INR 4,999).',
    ipAddress: '103.21.244.12',
    timestamp: '2026-02-03T16:00:00Z',
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-student-1',
    type: 'certificate',
    title: 'Certificate Issued!',
    body: 'Congratulations! Your certificate for Full Stack Next.js & AI Web Engineering has been generated.',
    link: '/certificates',
    createdAt: '2026-02-06T12:05:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-student-1',
    type: 'review',
    title: 'Project Submission Approved',
    body: 'Dr. Rajesh Verma approved your Case Study Project: Real-Time Collaborative Workspace with score 92/100.',
    link: '/assignments-projects',
    createdAt: '2026-02-05T11:22:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-student-1',
    type: 'job',
    title: 'New Skill-Matched Job Opening',
    body: 'Razorpay posted a Full Stack Engineer opening matching 100% of your completed skills!',
    link: '/jobs',
    createdAt: '2026-02-07T09:00:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-reviewer-1',
    type: 'review',
    title: 'New Review Assigned',
    body: 'Student Aditya Kulkarni submitted Assignment 1 for your evaluation.',
    link: '/reviewer/submissions',
    createdAt: '2026-02-12T09:45:00Z',
  },
];

export const INITIAL_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'int-ai',
    name: 'AI Question & Interview Engine',
    category: 'ai',
    provider: 'OpenAI / Anthropic / Google Gemini Adapter',
    status: 'connected',
    lastChecked: '2026-02-12T10:00:00Z',
    description: 'Powers AI mock interview simulations, question bank auto-generation, and feedback explanations.',
    docsUrl: 'https://prepkaro.com/docs/integrations/ai',
  },
  {
    id: 'int-plagiarism',
    name: 'Plagiarism & Code Similarity Detection',
    category: 'plagiarism',
    provider: 'Copyleaks / MOSS Engine Adapter',
    status: 'connected',
    lastChecked: '2026-02-12T09:30:00Z',
    description: 'Scans student repository submissions against GitHub and prior cohorts for code similarity.',
    docsUrl: 'https://prepkaro.com/docs/integrations/plagiarism',
  },
  {
    id: 'int-payment',
    name: 'Payment Gateway & Instant Refunds',
    category: 'payment',
    provider: 'Razorpay India Gateway (Test / Sandbox Mode)',
    status: 'sandbox',
    lastChecked: '2026-02-12T08:15:00Z',
    description: 'UPI, NetBanking, Cards payment checkout and automated webhook refund reconciliation.',
    docsUrl: 'https://razorpay.com/docs',
  },
  {
    id: 'int-email',
    name: 'Transactional Notifications',
    category: 'email',
    provider: 'Resend / AWS SES Adapter',
    status: 'connected',
    lastChecked: '2026-02-12T07:45:00Z',
    description: 'Delivers enrollment receipts, review score alerts, and interview reminders.',
  },
  {
    id: 'int-storage',
    name: 'Private Object Storage',
    category: 'storage',
    provider: 'Supabase Storage / AWS S3',
    status: 'connected',
    lastChecked: '2026-02-12T06:00:00Z',
    description: 'Encrypted storage for student project zip files, code reviews, and generated certificate PDFs.',
  },
];
