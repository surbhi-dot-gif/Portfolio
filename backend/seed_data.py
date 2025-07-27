from models import Profile, Project, Skill, About, Settings, Highlight
from datetime import datetime

# Seed data based on mock.js
seed_profile = Profile(
    name="Surabhi Priya",
    title="Data Analyst",
    tagline="Driven by data, powered by curiosity",
    intro="I turn raw data into real insights. With hands-on experience in SQL, Excel, and analytics, I help businesses make smarter, data-driven decisions.",
    profileImage="https://customer-assets.emergentagent.com/job_9633820c-c554-4343-8229-266ff3161521/artifacts/rxgpfmzl_Snappy.jpg"
)

seed_projects = [
    Project(
        title="Zomato Data Analysis",
        description="Gathered, cleaned, and analyzed restaurant data using Python, Excel, and SQL. Helped identify top cuisine hotspots in Ahmedabad.",
        tools=["Python", "Excel", "SQL", "Data Visualization"],
        problem="Understanding restaurant distribution and cuisine preferences across different locations in India",
        solution="Comprehensive data analysis pipeline to process and visualize restaurant data",
        impact="Identified top cuisine hotspots in Ahmedabad and provided actionable insights for market expansion",
        visual="🗺️",
        featured=True,
        order=1
    ),
    Project(
        title="Business Insights 360",
        description="Handled 4 million records, connected multiple tools, and enabled clear decision-making through Power BI dashboards.",
        tools=["Power BI", "SQL", "Excel", "Data Modeling"],
        problem="Managing massive datasets and creating actionable business intelligence",
        solution="Built comprehensive Power BI dashboard system with automated data connections",
        impact="Enabled data-driven decision making for business stakeholders with clear visualizations",
        visual="📊",
        featured=True,
        order=2
    )
]

seed_skills = [
    Skill(name="SQL", level="advanced", icon="🟢", progress=90, order=1),
    Skill(name="Excel", level="advanced", icon="🟢", progress=95, order=2),
    Skill(name="Power BI", level="advanced", icon="🟢", progress=85, order=3),
    Skill(name="Python", level="intermediate", icon="🟢", progress=80, order=4),
    Skill(name="Generative AI", level="intermediate", icon="🟢", progress=75, order=5),
    Skill(name="JavaScript", level="learning", icon="🟡", progress=60, order=6)
]

seed_highlights = [
    Highlight(
        title="Problem Solver",
        description="I approach every data challenge with curiosity and systematic thinking",
        icon="Code"
    ),
    Highlight(
        title="Growth Mindset",
        description="Continuously learning new tools and techniques to stay ahead in the field",
        icon="TrendingUp"
    ),
    Highlight(
        title="Team Player",
        description="Experience working in startup environments with cross-functional teams",
        icon="Users"
    ),
    Highlight(
        title="Results Driven",
        description="Focused on delivering actionable insights that drive business decisions",
        icon="Award"
    )
]

seed_about = About(
    summary="I'm a data professional who brings clarity from complexity – using analysis, technology, and a designer's sense of presentation.",
    experience="My journey started at Minerva Infotech, where I learned by doing and handled real business data in a startup environment. This hands-on experience taught me to be adaptable and think creatively about data challenges.",
    learning="I've continuously expanded my skills through Coding Ninjas, Udemy courses, and problem-solving on LeetCode. I believe in learning by building and solving real-world problems.",
    passion="I'm passionate about finding insights that others miss and presenting data in ways that tell compelling stories.",
    highlights=seed_highlights
)

seed_settings = Settings(
    email="surabhi.priya@example.com",
    linkedin="https://linkedin.com/in/surabhi-priya",
    github="https://github.com/surabhi-priya",
    leetcode="https://leetcode.com/surabhi-priya"
)