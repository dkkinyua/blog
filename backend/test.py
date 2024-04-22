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
    
    # Tears down the content in the test.db after running tests
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.session.commit()


# Runs the test, just like app.run()
if __name__ == "__main__":
    unittest.main()

