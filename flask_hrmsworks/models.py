from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, DateTime, ForeignKey, create_engine,UniqueConstraint
from sqlalchemy.orm import relationship, sessionmaker, declarative_base, mapped_column, Mapped
from sqlalchemy.sql import func
import logging
from typing import List

Base = declarative_base()

db = SQLAlchemy(model_class=Base)

class Login(db.Model):
    __tablename__ = "login"
    __table_args__=(UniqueConstraint('username','password'),)
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

class Employee(db.Model):
    __tablename__ = "employee"
    __table_args__=(UniqueConstraint('email','phone'),)
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(50))
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    designation_id: Mapped[int] = mapped_column(ForeignKey("designation.id"))
    designation: Mapped["Designation"] = relationship("Designation", back_populates="employee")
    leave:Mapped["Leave"]= relationship("Leave",back_populates="employee",cascade="all,delete-orphan")
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)


class Designation(db.Model):
    __tablename__ = "designation"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    max_casual_leave: Mapped[int] = mapped_column(Integer)
    max_sick_leaves : Mapped[int] = mapped_column(Integer)
    employee:Mapped[List["Employee"]] = relationship("Employee",back_populates="designation",cascade="all,delete-orphan")

class Leave(db.Model):
    __tablename__ = "leave"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employee.id"), nullable=False)
    leaves_taken: Mapped[int] = mapped_column(nullable=False)
    employee: Mapped["Employee"] = relationship("Employee", back_populates="leave")

# def init_db(db_uri="postgresql://flask_user:12345@localhost:5432/flaskdb"):
def init_db(db_uri="postgresql://flask_user:12345@localhost:5432/testhrms"):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session
