from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from models import (
    Profile, ProfileCreate, ProfileUpdate,
    Project, ProjectCreate, ProjectUpdate,
    Skill, SkillCreate, SkillUpdate,
    About, AboutCreate, AboutUpdate,
    Contact, ContactCreate, ContactUpdate,
    Settings, SettingsCreate, SettingsUpdate
)
from seed_data import seed_profile, seed_projects, seed_skills, seed_about, seed_settings
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Seed database on startup
@app.on_event("startup")
async def seed_database():
    try:
        # Check if data already exists
        profile_exists = await db.profiles.find_one()
        if not profile_exists:
            # Seed profile
            await db.profiles.insert_one(seed_profile.dict())
            
            # Seed projects
            for project in seed_projects:
                await db.projects.insert_one(project.dict())
            
            # Seed skills
            for skill in seed_skills:
                await db.skills.insert_one(skill.dict())
            
            # Seed about
            await db.about.insert_one(seed_about.dict())
            
            # Seed settings
            await db.settings.insert_one(seed_settings.dict())
            
            logging.info("Database seeded successfully")
    except Exception as e:
        logging.error(f"Error seeding database: {e}")

# Profile Endpoints
@api_router.get("/profile", response_model=Profile)
async def get_profile():
    profile = await db.profiles.find_one()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return Profile(**profile)

@api_router.put("/profile", response_model=Profile)
async def update_profile(profile_update: ProfileUpdate):
    existing_profile = await db.profiles.find_one()
    if not existing_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.profiles.update_one(
        {"id": existing_profile["id"]},
        {"$set": update_data}
    )
    
    updated_profile = await db.profiles.find_one({"id": existing_profile["id"]})
    return Profile(**updated_profile)

# Project Endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects(featured: Optional[bool] = None, limit: Optional[int] = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    
    cursor = db.projects.find(query).sort("order", 1)
    if limit:
        cursor = cursor.limit(limit)
    
    projects = await cursor.to_list(1000)
    return [Project(**project) for project in projects]

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**project)

@api_router.post("/projects", response_model=Project)
async def create_project(project_create: ProjectCreate):
    project_dict = project_create.dict()
    project_obj = Project(**project_dict)
    await db.projects.insert_one(project_obj.dict())
    return project_obj

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate):
    existing_project = await db.projects.find_one({"id": project_id})
    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.projects.update_one(
        {"id": project_id},
        {"$set": update_data}
    )
    
    updated_project = await db.projects.find_one({"id": project_id})
    return Project(**updated_project)

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# Skill Endpoints
@api_router.get("/skills", response_model=List[Skill])
async def get_skills():
    skills = await db.skills.find().sort("order", 1).to_list(1000)
    return [Skill(**skill) for skill in skills]

@api_router.post("/skills", response_model=Skill)
async def create_skill(skill_create: SkillCreate):
    skill_dict = skill_create.dict()
    skill_obj = Skill(**skill_dict)
    await db.skills.insert_one(skill_obj.dict())
    return skill_obj

@api_router.put("/skills/{skill_id}", response_model=Skill)
async def update_skill(skill_id: str, skill_update: SkillUpdate):
    existing_skill = await db.skills.find_one({"id": skill_id})
    if not existing_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    update_data = skill_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.skills.update_one(
        {"id": skill_id},
        {"$set": update_data}
    )
    
    updated_skill = await db.skills.find_one({"id": skill_id})
    return Skill(**updated_skill)

@api_router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str):
    result = await db.skills.delete_one({"id": skill_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}

# About Endpoints
@api_router.get("/about", response_model=About)
async def get_about():
    about = await db.about.find_one()
    if not about:
        raise HTTPException(status_code=404, detail="About information not found")
    return About(**about)

@api_router.put("/about", response_model=About)
async def update_about(about_update: AboutUpdate):
    existing_about = await db.about.find_one()
    if not existing_about:
        raise HTTPException(status_code=404, detail="About information not found")
    
    update_data = about_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.about.update_one(
        {"id": existing_about["id"]},
        {"$set": update_data}
    )
    
    updated_about = await db.about.find_one({"id": existing_about["id"]})
    return About(**updated_about)

# Contact Endpoints
@api_router.post("/contact", response_model=Contact)
async def create_contact(contact_create: ContactCreate):
    contact_dict = contact_create.dict()
    contact_obj = Contact(**contact_dict)
    await db.contacts.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contact", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find().sort("createdAt", -1).to_list(1000)
    return [Contact(**contact) for contact in contacts]

@api_router.put("/contact/{contact_id}", response_model=Contact)
async def update_contact_status(contact_id: str, contact_update: ContactUpdate):
    existing_contact = await db.contacts.find_one({"id": contact_id})
    if not existing_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    update_data = contact_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.contacts.update_one(
        {"id": contact_id},
        {"$set": update_data}
    )
    
    updated_contact = await db.contacts.find_one({"id": contact_id})
    return Contact(**updated_contact)

# Settings Endpoints
@api_router.get("/settings", response_model=Settings)
async def get_settings():
    settings = await db.settings.find_one()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return Settings(**settings)

@api_router.put("/settings", response_model=Settings)
async def update_settings(settings_update: SettingsUpdate):
    existing_settings = await db.settings.find_one()
    if not existing_settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    update_data = settings_update.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.settings.update_one(
        {"id": existing_settings["id"]},
        {"$set": update_data}
    )
    
    updated_settings = await db.settings.find_one({"id": existing_settings["id"]})
    return Settings(**updated_settings)

# Legacy endpoint for backward compatibility
@api_router.get("/")
async def root():
    return {"message": "Portfolio Backend API - All systems operational"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()