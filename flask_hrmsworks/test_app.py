import unittest
from flask import json
from app import db,app,Login,Employee, Designation, Leave,bcrypt
from flask_bcrypt import Bcrypt
import json

class RegisterTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        with app.app_context():
            db.create_all()
        with app.app_context():
            hashed_password = bcrypt.generate_password_hash('existingpassword').decode('utf-8')
            user = Login(username='existinguser', password=hashed_password)
            db.session.add(user)
            db.session.commit()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_register_success(self):
        response = self.app.post('/register', data=json.dumps({
            'username': 'newuser',
            'password': 'newpassword'
        }), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('User registered successfully', response.get_data(as_text=True))
        self.assertIn('newuser', response.get_data(as_text=True))

    def test_register_missing_username(self):
        response = self.app.post('/register', data=json.dumps({
            'password': 'newpassword'
        }), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing username or password', response.get_data(as_text=True))

    def test_register_missing_password(self):
        response = self.app.post('/register', data=json.dumps({
            'username': 'newuser'
        }), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing username or password', response.get_data(as_text=True))

    def test_register_existing_user(self):
        response = self.app.post('/register', data=json.dumps({
            'username': 'existinguser',
            'password': 'newpassword'
        }), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('Username already exists', response.get_data(as_text=True))


class LoginTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.app.testing = True
        db.create_all()
        self.bcrypt = Bcrypt(app)
        self.test_username = 'testuser'
        self.test_password = 'password'
        hashed_password = self.bcrypt.generate_password_hash(self.test_password).decode('utf-8')
        
        test_user = Login(
            username=self.test_username,
            password=hashed_password
        )
        db.session.add(test_user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_login_missing_username(self):
        response = self.client.post('/login', json={'password': self.test_password})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'login': False})

    def test_login_missing_password(self):
        response = self.client.post('/login', json={'username': self.test_username})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'login': False})

    def test_login_invalid_username(self):
        response = self.client.post('/login', json={'username': 'wronguser', 'password': self.test_password})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'login': False})

    def test_login_invalid_password(self):
        response = self.client.post('/login', json={'username': self.test_username, 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'login': False})

    def test_login_success(self):
        response = self.client.post('/login', json={'username': self.test_username, 'password': self.test_password})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'login': True})


class AddEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.app.testing = True
        db.create_all()
        self.test_designation = Designation(
            title='Software Engineer',
            max_casual_leave=10,
            max_sick_leaves=5
        )
        db.session.add(self.test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_add_employee_success(self):
        response = self.client.post('/add_employees', json={
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '1234567890',
            'address': '123 Main St',
            'designation': 'Software Engineer'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': 'Employee added successfully', 'data': {'id': 1}})

    def test_add_employee_missing_designation(self):
        response = self.client.post('/add_employees', json={
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '1234567890',
            'address': '123 Main St',
            'designation': 'Nonexistent Designation'
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'message': 'Designation not found'})

class UpdateEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_update_employee_success(self):
        with self.app.app_context():
            test_designation = Designation(
                title='Developer',
                max_casual_leave=30,
                max_sick_leaves=15
            )
            db.session.add(test_designation)
            db.session.commit()
            test_employee = Employee(
                first_name='John',
                last_name='Doe',
                address='123 Main St',
                phone='1234567890',
                email='johndoe@example.com',
                designation_id=test_designation.id
            )
            db.session.add(test_employee)
            db.session.commit()
            response = self.client.put(
                f'/updateemployee/{test_employee.id}',
                json={
                    'first_name': 'Jane',
                    'last_name': 'Smith',
                    'address': '456 Elm St',
                    'phone': '0987654321',
                    'email': 'janesmith@example.com',
                    'designation': 'Developer'
                }
            )

            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.is_json)
            data = response.get_json()
            self.assertEqual(data['message'], 'Employee updated successfully')
            updated_employee = Employee.query.get(test_employee.id)
            self.assertEqual(updated_employee.first_name, 'Jane')
            self.assertEqual(updated_employee.last_name, 'Smith')
            self.assertEqual(updated_employee.address, '456 Elm St')
            self.assertEqual(updated_employee.phone, '0987654321')
            self.assertEqual(updated_employee.email, 'janesmith@example.com')

class GetEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_employee_success(self):
        with self.app.app_context():
            test_designation = Designation(
                title='Developer',
                max_casual_leave=30,
                max_sick_leaves=15
            )
            db.session.add(test_designation)
            db.session.commit()
            test_employee = Employee(
                first_name='John',
                last_name='Doe',
                address='123 Main St',
                phone='1234567890',
                email='johndoe@example.com',
                designation_id=test_designation.id
            )
            db.session.add(test_employee)
            db.session.commit()
            test_leave = Leave(
                employee_id=test_employee.id,
                leaves_taken=5
            )
            db.session.add(test_leave)
            db.session.commit()
            response = self.client.get('/employee')
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.is_json)
            data = response.get_json()
            self.assertEqual(len(data), 1)
            self.assertEqual(data[0]['first_name'], 'John')
            self.assertEqual(data[0]['last_name'], 'Doe')
            self.assertEqual(data[0]['address'], '123 Main St')
            self.assertEqual(data[0]['phone'], '1234567890')
            self.assertEqual(data[0]['email'], 'johndoe@example.com')
            self.assertEqual(data[0]['designation'], 'Developer')
            self.assertEqual(data[0]['max_casual_leave'], 30)
            self.assertEqual(data[0]['max_sick_leaves'], 15)
            self.assertEqual(data[0]['leaves_taken'], 5)


class GetEmployeeDetailsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_employee_details_success(self):
        with self.app.app_context():
            test_designation = Designation(
                title='Developer',
                max_casual_leave=30,
                max_sick_leaves=15
            )
            db.session.add(test_designation)
            db.session.commit()
            test_employee = Employee(
                first_name='John',
                last_name='Doe',
                address='123 Main St',
                phone='1234567890',
                email='johndoe@example.com',
                designation_id=test_designation.id
            )
            db.session.add(test_employee)
            db.session.commit()
            test_leave = Leave(
                employee_id=test_employee.id,
                leaves_taken=5
            )
            db.session.add(test_leave)
            db.session.commit()
            response = self.client.get(f'/employee/{test_employee.id}')
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.is_json)
            data = response.get_json()
            self.assertEqual(data['first_name'], 'John')
            self.assertEqual(data['last_name'], 'Doe')
            self.assertEqual(data['address'], '123 Main St')
            self.assertEqual(data['phone'], '1234567890')
            self.assertEqual(data['email'], 'johndoe@example.com')
            self.assertEqual(data['designation'], 'Developer')
            self.assertEqual(data['leaves'], 5)

    def test_get_employee_details_not_found(self):
        response = self.client.get('/employee/999')
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Employee not found')

class DeleteEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_delete_employee_success(self):
        with self.app.app_context():
            test_designation = Designation(
                title='Developer',
                max_casual_leave=30,
                max_sick_leaves=15
            )
            db.session.add(test_designation)
            db.session.commit()
            test_employee = Employee(
                first_name='John',
                last_name='Doe',
                address='123 Main St',
                phone='1234567890',
                email='johndoe@example.com',
                designation_id=test_designation.id
            )
            db.session.add(test_employee)
            db.session.commit()

            response = self.client.post(
                '/deleteemployee',
                data=json.dumps({'id': test_employee.id}),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.is_json)
            data = response.get_json()
            self.assertEqual(data['message'], 'Employee deleted successfully')

            deleted_employee = Employee.query.get(test_employee.id)
            self.assertIsNotNone(deleted_employee.deleted_at)

    def test_delete_employee_not_found(self):
        response = self.client.post(
            '/deleteemployee',
            data=json.dumps({'id': 999}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Employee not found')

class AddDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_add_designation_success(self):
        response = self.client.post(
            '/add_designation',
            data=json.dumps({
                'title': 'Manager',
                'max_casual_leave': 20,
                'max_sick_leaves': 10
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation added successfully')

        with self.app.app_context():
            designation = Designation.query.filter_by(title='Manager').first()
            self.assertIsNotNone(designation)
            self.assertEqual(designation.max_casual_leave, 20)
            self.assertEqual(designation.max_sick_leaves, 10)

    def test_add_designation_default_leaves(self):
        response = self.client.post(
            '/add_designation',
            data=json.dumps({
                'title': 'Developer'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation added successfully')

        with self.app.app_context():
            designation = Designation.query.filter_by(title='Developer').first()
            self.assertIsNotNone(designation)
            self.assertEqual(designation.max_casual_leave, 0)
            self.assertEqual(designation.max_sick_leaves, 0)

class GetDesignationsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            designation1 = Designation(title='Manager', max_casual_leave=20, max_sick_leaves=10)
            designation2 = Designation(title='Developer', max_casual_leave=15, max_sick_leaves=5)
            db.session.add_all([designation1, designation2])
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_designations(self):
        response = self.client.get('/designations')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 2)

        designation_titles = [designation['title'] for designation in data]
        self.assertIn('Manager', designation_titles)
        self.assertIn('Developer', designation_titles)

class UpdateDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            test_designation = Designation(title='Manager', max_casual_leave=20, max_sick_leaves=10)
            db.session.add(test_designation)
            db.session.commit()
            self.test_designation_id = test_designation.id  

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_update_designation_success(self):
        response = self.client.put(
            f'/updatedesignations/{self.test_designation_id}',
            json={
                'max_casual_leave': 25,
                'max_sick_leaves': 12
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation updated successfully')
        with self.app.app_context():
            updated_designation = Designation.query.get(self.test_designation_id)
            self.assertEqual(updated_designation.max_casual_leave, 25)
            self.assertEqual(updated_designation.max_sick_leaves, 12)

    def test_update_designation_not_found(self):
        response = self.client.put(
            '/updatedesignations/9999',  
            json={
                'max_casual_leave': 25,
                'max_sick_leaves': 12
            }
        )
        self.assertEqual(response.status_code, 404)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation not found')

class DeleteDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            
            self.test_designation = Designation(title='Manager', max_casual_leave=20, max_sick_leaves=10)
            db.session.add(self.test_designation)
            db.session.commit()
            self.test_designation_id = self.test_designation.id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_delete_designation_success(self):
        response = self.client.post(
            '/deletedesignation',
            json={
                'id': self.test_designation_id
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation deleted successfully')
        with self.app.app_context():
            deleted_designation = Designation.query.get(self.test_designation_id)
            self.assertIsNone(deleted_designation)

    def test_delete_designation_not_found(self):
        response = self.client.post(
            '/deletedesignation',
            json={
                'id': 9999  
            }
        )
        self.assertEqual(response.status_code, 404)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertEqual(data['message'], 'Designation not found')


if __name__ == '__main__':
    unittest.main()
