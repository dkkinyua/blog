import unittest
from config import TestConfig
from main import create_app
from exts import db

# A class for our TestCase
class AppTestCase(unittest.TestCase):
    # Sets up the test client and the test.db tables in relation to the models in models.py
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    # First test ("posts/hello") OK.
    def test_hello(self):
        hello_response = self.client.get("/posts/hello")
        status_code = hello_response.status_code

        self.assertEqual(status_code, 200)

    # Test on /auth/signup
    def test_signup(self):
        test_user = {
            "username": "testuser2",
            "email": "testcontent2@company.com",
            "password": "password"
        }
        test_response = self.client.post("/auth/signup", json=test_user)
        status_code = test_response.status_code

        self.assertEqual(status_code, 201)
    
    def test_login(self):
        test_user = {
            "username": "testuser2",
            "email": "testcontent2@company.com",
            "password": "password"
        }

        login_response = self.client.post("/auth/login", json={
            "username": "testuser2",
            "password": "password"
        })

        status_code = login_response.status_code

        self.assertEqual(status_code, 200)

    
    # Tears down the content in the test.db after running tests
    def tearDown(self):
        with self.app.app_context():
            db.drop_all()


# Runs the test, just like app.run()
if __name__ == "__main__":
    unittest.main()

