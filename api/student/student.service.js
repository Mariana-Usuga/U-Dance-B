const Student = require('./student.model');

async function getAllStudents() {
  try {
    const student = await Student.find();
    return student;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createStudent(student) {
  try {
    const newStudent = new Student(student);
    const savedStudent = await newStudent.save();
    return savedStudent;
  } catch (error) {
    throw error;
  }
}

async function getStudentById(id) {
  try {
    const student = await Student.findById(id);
    return student;
  } catch (error) {
    throw error;
  }
}

async function updateStudent(id, student) {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, student, {
      new: true,
    });

    return updatedStudent;
  } catch (error) {
    throw error;
  }
}

async function deleteStudent(id) {
  try {
    const deletedStudent = await Course.findByIdAndDelete(id);
    return deletedStudent;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
