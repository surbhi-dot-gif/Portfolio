from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Profile Models
class Profile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    intro: str
    profileImage: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProfileCreate(BaseModel):
    name: str
    title: str
    tagline: str
    intro: str
    profileImage: str

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    tagline: Optional[str] = None
    intro: Optional[str] = None
    profileImage: Optional[str] = None

# Project Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    tools: List[str]
    problem: str
    solution: str
    impact: str
    visual: str
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: bool = False
    order: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    tools: List[str]
    problem: str
    solution: str
    impact: str
    visual: str
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: bool = False
    order: int = 0

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tools: Optional[List[str]] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    impact: Optional[str] = None
    visual: Optional[str] = None
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: Optional[bool] = None
    order: Optional[int] = None

# Skill Models
class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    level: str  # 'beginner', 'intermediate', 'advanced', 'learning'
    icon: str
    progress: int  # 0-100
    order: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class SkillCreate(BaseModel):
    name: str
    level: str
    icon: str
    progress: int
    order: int = 0

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    level: Optional[str] = None
    icon: Optional[str] = None
    progress: Optional[int] = None
    order: Optional[int] = None

# About Models
class Highlight(BaseModel):
    title: str
    description: str
    icon: str

class About(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    summary: str
    experience: str
    learning: str
    passion: str
    highlights: List[Highlight] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class AboutCreate(BaseModel):
    summary: str
    experience: str
    learning: str
    passion: str
    highlights: List[Highlight] = []

class AboutUpdate(BaseModel):
    summary: Optional[str] = None
    experience: Optional[str] = None
    learning: Optional[str] = None
    passion: Optional[str] = None
    highlights: Optional[List[Highlight]] = None

# Contact Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # 'new', 'read', 'replied'
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactUpdate(BaseModel):
    status: str

# Settings Models
class Settings(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    linkedin: str
    github: str
    leetcode: str
    location: str = "Available for remote work worldwide"
    responseTime: str = "Usually within 24 hours"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class SettingsCreate(BaseModel):
    email: str
    linkedin: str
    github: str
    leetcode: str
    location: str = "Available for remote work worldwide"
    responseTime: str = "Usually within 24 hours"

class SettingsUpdate(BaseModel):
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    leetcode: Optional[str] = None
    location: Optional[str] = None
    responseTime: Optional[str] = None