import flask
from models import *
from sqlalchemy import desc, select
from flask import request,make_response,session
from flask import jsonify
from flask_cors import CORS,cross_origin
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt 

app = flask.Flask(__name__)
CORS(app)

# app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql://flask_user:12345@localhost:5432/flaskdb")
app.config["SQLALCHEMY_DATABASE_URI"] = ("postgresql://flask_user:12345@localhost:5432/testhrms")
db.init_app(app)

bcrypt = Bcrypt(app) 

@app.route("/")
def home():
    return "Welcome to the Home page!!!"

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Missing username or password'}), 400

        username = data['username']
        password = data['password']
        hashed_password = bcrypt.generate_password_hash (password).decode('utf-8') 

        existing_user = Login.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400
        
        new_login = Login(username=username, password=hashed_password)
        db.session.add(new_login)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'username': username}), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'login': False}), 400

    user = db.session.query(Login).filter_by(username=username).first()

    if user is None:
        return jsonify({'login': False}), 401

    is_valid = bcrypt.check_password_hash(user.password, password)

    if is_valid:
        return jsonify({'login': True}), 200
    else:
        return jsonify({'login': False}), 401
        
@app.route('/login/<int:id>', methods=['GET'])
def credential(id):
    details = db.session.query(Login).filter_by(id=id).first()
    return jsonify({
        'id': details.id,
        'username': details.username,
    })                  


@app.route('/add_employees', methods=['POST'])
def add_employee():
    data = request.get_json()
    title = data.get('designation')
    designation = db.session.query(Designation).filter_by(title=title).first()
    if designation==None:
            return jsonify({'message': 'Designation not found'}),400

    designation_id = designation.id
    new_employee = Employee(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        designation_id= designation_id
    )
    db.session.add(new_employee)
    db.session.commit()
    leave = Leave(employee_id = new_employee.id,leaves_taken = 0)
    db.session.add(leave)
    db.session.commit()
    data={
        "id":new_employee.id
    }
    # print(new_employee)
    return jsonify({'message': 'Employee added successfully',"data":data}),200


@app.route('/updateemployee/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.get_json()  
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    employee = Employee.query.get(id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404
    
    designation_name = data.get('designation')
    if designation_name:
        designation = db.session.query(Designation).filter_by(title=designation_name).first()
        if not designation:
            return jsonify({'error': f'Designation {designation_name} not found'}), 404
        employee.designation_id = designation.id
    
    employee.first_name = data.get('first_name', employee.first_name)
    employee.last_name = data.get('last_name', employee.last_name)
    employee.email = data.get('email', employee.email)
    employee.phone = data.get('phone', employee.phone)
    employee.address = data.get('address', employee.address)
    db.session.commit()
    return jsonify({'message': 'Employee updated successfully'}), 200

    
@app.route('/employee')
def get_employee():
    set_query = db.session.query(
        Employee.id, 
        Employee.first_name, 
        Employee.last_name, 
        Employee.address, 
        Employee.phone, 
        Employee.email, 
        Designation.title, 
        Designation.max_casual_leave,
        Designation.max_sick_leaves,
        Leave.leaves_taken
    ).join(
        Designation, Designation.id == Employee.designation_id
    ).outerjoin(
        Leave, Leave.employee_id == Employee.id
    ).filter(
        Employee.deleted_at.is_(None)
    ).order_by(desc(Employee.created_at))
    getemployee = db.session.execute(set_query).fetchall()
    employee_list = []
    for emp in getemployee:
        employee_dict = {
            "id": emp.id,
            "first_name": emp.first_name,
            "last_name": emp.last_name,
            "address": emp.address,
            "phone": emp.phone,
            "email": emp.email,
            "max_casual_leave": emp.max_casual_leave,
            "max_sick_leaves": emp.max_sick_leaves,
            "leaves_taken": emp.leaves_taken,
            "designation": emp.title,
        }
        employee_list.append(employee_dict)

    return jsonify(employee_list), 200



@app.route("/employee/<int:id>", methods=["GET"])
def get_employeedetails(id):
    employee = db.session.query(Employee).filter_by(id=id, deleted_at=None).first()
    if not employee:
        return jsonify({"message": "Employee not found"}), 400
    designation = db.session.query(Designation).filter_by(id=employee.designation_id).first()
    leaves = db.session.query(Leave).filter_by(employee_id=employee.id).first()

    employee_details = {
        "id": employee.id,
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "email": employee.email,
        "phone": employee.phone,
        "address": employee.address,
        "designation": designation.title if designation else "N/A",
        "leaves": leaves.leaves_taken if leaves != None else 0,
        "created_at": employee.created_at,
        "deleted_at": employee.deleted_at,
    }

    return jsonify(employee_details), 200


@app.route('/deleteemployee', methods=['POST'])
def delete_employee():
    data = request.json
    id = data.get("id")
    employee = Employee.query.get(id)
    if employee is None:
        return jsonify({"message": "Employee not found"}), 404
    
    now = datetime.now(timezone.utc).isoformat()
    employee.deleted_at = now
    db.session.commit()
    return jsonify({"message": "Employee deleted successfully"}), 200



@app.route('/add_designation',methods=['POST'])
def add_designation():
    data = request.json
    new_designation = Designation(
        title=data['title'],
        max_casual_leave=data.get('max_casual_leave', 0),
        max_sick_leaves=data.get('max_sick_leaves', 0)
    )
    db.session.add(new_designation)
    db.session.commit()
    return jsonify({'message': 'Designation added successfully'}),200


@app.route('/designations', methods=['GET'])
def get_designations():
    designations = Designation.query.all()
    designations_list = [
        {
            'id': d.id,
            'title': d.title,
            'max_casual_leave': d.max_casual_leave,
            'max_sick_leaves': d.max_sick_leaves
        } for d in designations
    ]
    return jsonify(designations_list), 200


@app.route('/updatedesignations/<int:id>', methods=['PUT'])
def update_designation(id):
    data = request.get_json()
    
    designation = Designation.query.get(id)
    
    if designation is None:
        return jsonify({"message": "Designation not found"}), 404
    
    # title = data.get('title')
    max_casual_leave = data.get('max_casual_leave')
    max_sick_leaves = data.get('max_sick_leaves')
    
    # if title:
    #     designation.title = title
    if max_casual_leave:
        designation.max_casual_leave = max_casual_leave
    if max_sick_leaves:
        designation.max_sick_leaves = max_sick_leaves
    
    db.session.commit()
    
    return jsonify({"message": "Designation updated successfully"}), 200


@app.route('/deletedesignation', methods=['POST'])
def delete_designation():
    data = request.json
    desId = data.get('id')
    designation = db.session.query(Designation).filter_by(id=desId).first()
    if designation is None:
        return jsonify({"message": "Designation not found"}), 404
    db.session.delete(designation)
    db.session.commit()
    return jsonify({"message": "Designation deleted successfully"}), 200


@app.route('/leaves', methods=['PUT'])
def update_leave():
    data = request.json
    leave = Leave.query.filter_by(employee_id=data['employee_id']).first()   
    if leave:
        leave.leaves_taken = data.get('leaves_taken', leave.leaves_taken)
    else:
        leave = Leave(
            employee_id=data['employee_id'],
            leaves_taken=data['leaves_taken']
        )
        db.session.add(leave)
    
    db.session.commit()
    return jsonify({'message': 'Leave updated successfully'}),200


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    init_db()
    app.run(port=5000)