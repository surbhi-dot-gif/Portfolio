#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Portfolio Application
Tests all endpoints with proper data validation and error handling
"""

import requests
import json
import os
from datetime import datetime
from typing import Dict, Any, List

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    exit(1)

API_BASE = f"{BASE_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.test_results = {
            'profile': {'passed': 0, 'failed': 0, 'tests': []},
            'projects': {'passed': 0, 'failed': 0, 'tests': []},
            'skills': {'passed': 0, 'failed': 0, 'tests': []},
            'about': {'passed': 0, 'failed': 0, 'tests': []},
            'settings': {'passed': 0, 'failed': 0, 'tests': []},
            'contact': {'passed': 0, 'failed': 0, 'tests': []}
        }
        
    def log_test(self, category: str, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        self.test_results[category]['tests'].append({
            'name': test_name,
            'passed': passed,
            'details': details
        })
        if passed:
            self.test_results[category]['passed'] += 1
            print(f"✅ {test_name}")
        else:
            self.test_results[category]['failed'] += 1
            print(f"❌ {test_name}: {details}")
    
    def make_request(self, method: str, endpoint: str, data: Dict = None) -> tuple:
        """Make HTTP request and return response and success status"""
        try:
            url = f"{API_BASE}{endpoint}"
            headers = {'Content-Type': 'application/json'}
            
            if method.upper() == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                return None, False, "Invalid HTTP method"
                
            return response, True, ""
        except requests.exceptions.RequestException as e:
            return None, False, str(e)
    
    def test_profile_api(self):
        """Test Profile API endpoints"""
        print("\n🔍 Testing Profile API...")
        
        # Test GET /api/profile
        response, success, error = self.make_request('GET', '/profile')
        if not success:
            self.log_test('profile', 'GET /api/profile - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                profile_data = response.json()
                
                # Verify required fields
                required_fields = ['name', 'title', 'tagline', 'intro', 'profileImage']
                missing_fields = [field for field in required_fields if field not in profile_data]
                
                if missing_fields:
                    self.log_test('profile', 'GET /api/profile - Required Fields', False, 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test('profile', 'GET /api/profile - Required Fields', True)
                
                # Verify seeded data matches expected values
                expected_name = "Surabhi Priya"
                expected_title = "Data Analyst"
                
                if profile_data.get('name') == expected_name:
                    self.log_test('profile', 'GET /api/profile - Seeded Name', True)
                else:
                    self.log_test('profile', 'GET /api/profile - Seeded Name', False, 
                                f"Expected '{expected_name}', got '{profile_data.get('name')}'")
                
                if profile_data.get('title') == expected_title:
                    self.log_test('profile', 'GET /api/profile - Seeded Title', True)
                else:
                    self.log_test('profile', 'GET /api/profile - Seeded Title', False, 
                                f"Expected '{expected_title}', got '{profile_data.get('title')}'")
                    
            except json.JSONDecodeError:
                self.log_test('profile', 'GET /api/profile - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('profile', 'GET /api/profile - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
    
    def test_projects_api(self):
        """Test Projects API endpoints"""
        print("\n🔍 Testing Projects API...")
        
        # Test GET /api/projects (all projects)
        response, success, error = self.make_request('GET', '/projects')
        if not success:
            self.log_test('projects', 'GET /api/projects - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                projects_data = response.json()
                
                if isinstance(projects_data, list):
                    self.log_test('projects', 'GET /api/projects - Array Response', True)
                    
                    # Verify we have expected number of projects (2 from seed data)
                    if len(projects_data) == 2:
                        self.log_test('projects', 'GET /api/projects - Count', True)
                    else:
                        self.log_test('projects', 'GET /api/projects - Count', False, 
                                    f"Expected 2 projects, got {len(projects_data)}")
                    
                    # Verify project structure
                    if projects_data:
                        project = projects_data[0]
                        required_fields = ['title', 'description', 'tools', 'problem', 'solution', 'impact', 'visual', 'featured', 'order']
                        missing_fields = [field for field in required_fields if field not in project]
                        
                        if missing_fields:
                            self.log_test('projects', 'GET /api/projects - Project Structure', False, 
                                        f"Missing fields: {missing_fields}")
                        else:
                            self.log_test('projects', 'GET /api/projects - Project Structure', True)
                            
                        # Verify tools is an array
                        if isinstance(project.get('tools'), list):
                            self.log_test('projects', 'GET /api/projects - Tools Array', True)
                        else:
                            self.log_test('projects', 'GET /api/projects - Tools Array', False, 
                                        "Tools field should be an array")
                else:
                    self.log_test('projects', 'GET /api/projects - Array Response', False, "Response is not an array")
                    
            except json.JSONDecodeError:
                self.log_test('projects', 'GET /api/projects - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('projects', 'GET /api/projects - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
        
        # Test GET /api/projects?featured=true
        response, success, error = self.make_request('GET', '/projects?featured=true')
        if success and response.status_code == 200:
            try:
                featured_projects = response.json()
                if isinstance(featured_projects, list):
                    # All returned projects should be featured
                    all_featured = all(project.get('featured', False) for project in featured_projects)
                    if all_featured:
                        self.log_test('projects', 'GET /api/projects?featured=true - Filter', True)
                    else:
                        self.log_test('projects', 'GET /api/projects?featured=true - Filter', False, 
                                    "Some returned projects are not featured")
                        
                    # Should have 2 featured projects based on seed data
                    if len(featured_projects) == 2:
                        self.log_test('projects', 'GET /api/projects?featured=true - Count', True)
                    else:
                        self.log_test('projects', 'GET /api/projects?featured=true - Count', False, 
                                    f"Expected 2 featured projects, got {len(featured_projects)}")
            except json.JSONDecodeError:
                self.log_test('projects', 'GET /api/projects?featured=true - JSON', False, "Invalid JSON response")
        else:
            self.log_test('projects', 'GET /api/projects?featured=true - Request', False, 
                        f"Request failed: {error if not success else response.status_code}")
        
        # Test GET /api/projects?featured=true&limit=2
        response, success, error = self.make_request('GET', '/projects?featured=true&limit=2')
        if success and response.status_code == 200:
            try:
                limited_projects = response.json()
                if isinstance(limited_projects, list) and len(limited_projects) <= 2:
                    self.log_test('projects', 'GET /api/projects?featured=true&limit=2 - Limit', True)
                else:
                    self.log_test('projects', 'GET /api/projects?featured=true&limit=2 - Limit', False, 
                                f"Expected max 2 projects, got {len(limited_projects) if isinstance(limited_projects, list) else 'non-array'}")
            except json.JSONDecodeError:
                self.log_test('projects', 'GET /api/projects?featured=true&limit=2 - JSON', False, "Invalid JSON response")
        else:
            self.log_test('projects', 'GET /api/projects?featured=true&limit=2 - Request', False, 
                        f"Request failed: {error if not success else response.status_code}")
    
    def test_skills_api(self):
        """Test Skills API endpoints"""
        print("\n🔍 Testing Skills API...")
        
        # Test GET /api/skills
        response, success, error = self.make_request('GET', '/skills')
        if not success:
            self.log_test('skills', 'GET /api/skills - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                skills_data = response.json()
                
                if isinstance(skills_data, list):
                    self.log_test('skills', 'GET /api/skills - Array Response', True)
                    
                    # Verify we have expected number of skills (6 from seed data)
                    if len(skills_data) == 6:
                        self.log_test('skills', 'GET /api/skills - Count', True)
                    else:
                        self.log_test('skills', 'GET /api/skills - Count', False, 
                                    f"Expected 6 skills, got {len(skills_data)}")
                    
                    # Verify skills are ordered by order field
                    if skills_data:
                        orders = [skill.get('order', 0) for skill in skills_data]
                        if orders == sorted(orders):
                            self.log_test('skills', 'GET /api/skills - Ordering', True)
                        else:
                            self.log_test('skills', 'GET /api/skills - Ordering', False, 
                                        "Skills are not ordered by order field")
                    
                    # Verify skill structure
                    if skills_data:
                        skill = skills_data[0]
                        required_fields = ['name', 'level', 'icon', 'progress', 'order']
                        missing_fields = [field for field in required_fields if field not in skill]
                        
                        if missing_fields:
                            self.log_test('skills', 'GET /api/skills - Skill Structure', False, 
                                        f"Missing fields: {missing_fields}")
                        else:
                            self.log_test('skills', 'GET /api/skills - Skill Structure', True)
                            
                        # Verify progress is a number between 0-100
                        progress = skill.get('progress')
                        if isinstance(progress, int) and 0 <= progress <= 100:
                            self.log_test('skills', 'GET /api/skills - Progress Range', True)
                        else:
                            self.log_test('skills', 'GET /api/skills - Progress Range', False, 
                                        f"Progress should be 0-100, got {progress}")
                else:
                    self.log_test('skills', 'GET /api/skills - Array Response', False, "Response is not an array")
                    
            except json.JSONDecodeError:
                self.log_test('skills', 'GET /api/skills - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('skills', 'GET /api/skills - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
    
    def test_about_api(self):
        """Test About API endpoints"""
        print("\n🔍 Testing About API...")
        
        # Test GET /api/about
        response, success, error = self.make_request('GET', '/about')
        if not success:
            self.log_test('about', 'GET /api/about - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                about_data = response.json()
                
                # Verify required fields
                required_fields = ['summary', 'experience', 'learning', 'passion', 'highlights']
                missing_fields = [field for field in required_fields if field not in about_data]
                
                if missing_fields:
                    self.log_test('about', 'GET /api/about - Required Fields', False, 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test('about', 'GET /api/about - Required Fields', True)
                
                # Verify highlights is an array
                highlights = about_data.get('highlights', [])
                if isinstance(highlights, list):
                    self.log_test('about', 'GET /api/about - Highlights Array', True)
                    
                    # Verify highlights structure
                    if highlights:
                        highlight = highlights[0]
                        highlight_fields = ['title', 'description', 'icon']
                        missing_highlight_fields = [field for field in highlight_fields if field not in highlight]
                        
                        if missing_highlight_fields:
                            self.log_test('about', 'GET /api/about - Highlight Structure', False, 
                                        f"Missing highlight fields: {missing_highlight_fields}")
                        else:
                            self.log_test('about', 'GET /api/about - Highlight Structure', True)
                            
                        # Should have 4 highlights from seed data
                        if len(highlights) == 4:
                            self.log_test('about', 'GET /api/about - Highlights Count', True)
                        else:
                            self.log_test('about', 'GET /api/about - Highlights Count', False, 
                                        f"Expected 4 highlights, got {len(highlights)}")
                else:
                    self.log_test('about', 'GET /api/about - Highlights Array', False, 
                                "Highlights should be an array")
                    
            except json.JSONDecodeError:
                self.log_test('about', 'GET /api/about - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('about', 'GET /api/about - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
    
    def test_settings_api(self):
        """Test Settings API endpoints"""
        print("\n🔍 Testing Settings API...")
        
        # Test GET /api/settings
        response, success, error = self.make_request('GET', '/settings')
        if not success:
            self.log_test('settings', 'GET /api/settings - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                settings_data = response.json()
                
                # Verify required fields
                required_fields = ['email', 'linkedin', 'github', 'leetcode', 'location', 'responseTime']
                missing_fields = [field for field in required_fields if field not in settings_data]
                
                if missing_fields:
                    self.log_test('settings', 'GET /api/settings - Required Fields', False, 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test('settings', 'GET /api/settings - Required Fields', True)
                
                # Verify seeded data
                expected_email = "surabhi.priya@example.com"
                if settings_data.get('email') == expected_email:
                    self.log_test('settings', 'GET /api/settings - Seeded Email', True)
                else:
                    self.log_test('settings', 'GET /api/settings - Seeded Email', False, 
                                f"Expected '{expected_email}', got '{settings_data.get('email')}'")
                    
            except json.JSONDecodeError:
                self.log_test('settings', 'GET /api/settings - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('settings', 'GET /api/settings - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
    
    def test_contact_api(self):
        """Test Contact API endpoints"""
        print("\n🔍 Testing Contact API...")
        
        # Test POST /api/contact
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in discussing potential collaboration opportunities."
        }
        
        response, success, error = self.make_request('POST', '/contact', contact_data)
        if not success:
            self.log_test('contact', 'POST /api/contact - Connection', False, error)
            return
            
        if response.status_code == 200:
            try:
                created_contact = response.json()
                
                # Verify contact was created with correct fields
                required_fields = ['name', 'email', 'subject', 'message', 'status']
                missing_fields = [field for field in required_fields if field not in created_contact]
                
                if missing_fields:
                    self.log_test('contact', 'POST /api/contact - Response Fields', False, 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test('contact', 'POST /api/contact - Response Fields', True)
                
                # Verify data matches what was sent
                if created_contact.get('name') == contact_data['name']:
                    self.log_test('contact', 'POST /api/contact - Name Match', True)
                else:
                    self.log_test('contact', 'POST /api/contact - Name Match', False, 
                                f"Name mismatch: sent '{contact_data['name']}', got '{created_contact.get('name')}'")
                
                if created_contact.get('email') == contact_data['email']:
                    self.log_test('contact', 'POST /api/contact - Email Match', True)
                else:
                    self.log_test('contact', 'POST /api/contact - Email Match', False, 
                                f"Email mismatch: sent '{contact_data['email']}', got '{created_contact.get('email')}'")
                
                # Verify default status is 'new'
                if created_contact.get('status') == 'new':
                    self.log_test('contact', 'POST /api/contact - Default Status', True)
                else:
                    self.log_test('contact', 'POST /api/contact - Default Status', False, 
                                f"Expected status 'new', got '{created_contact.get('status')}'")
                    
            except json.JSONDecodeError:
                self.log_test('contact', 'POST /api/contact - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('contact', 'POST /api/contact - Status Code', False, 
                        f"Expected 200, got {response.status_code}")
        
        # Test GET /api/contact
        response, success, error = self.make_request('GET', '/contact')
        if success and response.status_code == 200:
            try:
                contacts_data = response.json()
                
                if isinstance(contacts_data, list):
                    self.log_test('contact', 'GET /api/contact - Array Response', True)
                    
                    # Should have at least the contact we just created
                    if len(contacts_data) >= 1:
                        self.log_test('contact', 'GET /api/contact - Has Contacts', True)
                        
                        # Verify contact structure
                        contact = contacts_data[0]
                        required_fields = ['name', 'email', 'subject', 'message', 'status']
                        missing_fields = [field for field in required_fields if field not in contact]
                        
                        if missing_fields:
                            self.log_test('contact', 'GET /api/contact - Contact Structure', False, 
                                        f"Missing fields: {missing_fields}")
                        else:
                            self.log_test('contact', 'GET /api/contact - Contact Structure', True)
                    else:
                        self.log_test('contact', 'GET /api/contact - Has Contacts', False, 
                                    "No contacts found after creating one")
                else:
                    self.log_test('contact', 'GET /api/contact - Array Response', False, 
                                "Response is not an array")
                    
            except json.JSONDecodeError:
                self.log_test('contact', 'GET /api/contact - JSON Response', False, "Invalid JSON response")
        else:
            self.log_test('contact', 'GET /api/contact - Request', False, 
                        f"Request failed: {error if not success else response.status_code}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Portfolio Backend API Tests")
        print(f"📍 Backend URL: {BASE_URL}")
        print(f"📍 API Base: {API_BASE}")
        
        # Test all endpoints
        self.test_profile_api()
        self.test_projects_api()
        self.test_skills_api()
        self.test_about_api()
        self.test_settings_api()
        self.test_contact_api()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results['passed']
            failed = results['failed']
            total = passed + failed
            
            total_passed += passed
            total_failed += failed
            
            status = "✅" if failed == 0 else "❌"
            print(f"{status} {category.upper()}: {passed}/{total} passed")
            
            # Show failed tests
            if failed > 0:
                for test in results['tests']:
                    if not test['passed']:
                        print(f"   ❌ {test['name']}: {test['details']}")
        
        print("-" * 60)
        overall_status = "✅ ALL TESTS PASSED" if total_failed == 0 else f"❌ {total_failed} TESTS FAILED"
        print(f"OVERALL: {total_passed}/{total_passed + total_failed} - {overall_status}")
        print("="*60)

if __name__ == "__main__":
    tester = PortfolioAPITester()
    tester.run_all_tests()